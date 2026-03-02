import json
import logging
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.result import Result
from app.models.source import Source
from app.services.analyzer import run_per_source_analysis
from app.services.synthesizer import run_synthesis, run_job_stories, run_odi_scoring
from app import config as app_config

router = APIRouter(prefix="/api/projects", tags=["analyze"])
logger = logging.getLogger(__name__)


class AnalysisStatusResponse(BaseModel):
    project_id: int
    status: str
    message: str


class ResultsResponse(BaseModel):
    project_id: int
    results: dict


@router.post("/{project_id}/analyze", response_model=AnalysisStatusResponse)
def trigger_analysis(
    project_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    source_count = db.query(Source).filter(Source.project_id == project_id).count()
    if source_count == 0:
        raise HTTPException(status_code=422, detail="No sources uploaded. Upload at least one file first.")

    if project.status == "analyzing":
        raise HTTPException(status_code=409, detail="Analysis already in progress")

    project.status = "analyzing"
    db.commit()

    background_tasks.add_task(_run_analysis_pipeline, project_id)

    return AnalysisStatusResponse(
        project_id=project_id,
        status="analyzing",
        message="Analysis started. Poll /status for progress.",
    )


@router.post("/{project_id}/odi", response_model=AnalysisStatusResponse)
def trigger_odi(
    project_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.status != "complete":
        raise HTTPException(status_code=422, detail="Run full analysis first")

    background_tasks.add_task(_run_odi_pipeline, project_id)

    return AnalysisStatusResponse(
        project_id=project_id,
        status="analyzing",
        message="ODI scoring started.",
    )


@router.get("/{project_id}/status", response_model=AnalysisStatusResponse)
def get_status(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return AnalysisStatusResponse(
        project_id=project_id,
        status=project.status,
        message=f"Project is {project.status}",
    )


@router.get("/{project_id}/results", response_model=ResultsResponse)
def get_results(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    results_rows = db.query(Result).filter(Result.project_id == project_id).all()
    results: dict = {}
    for row in results_rows:
        try:
            results[row.analysis_type] = json.loads(row.parsed_json)
        except json.JSONDecodeError:
            results[row.analysis_type] = {"raw": row.raw_llm_output}

    return ResultsResponse(project_id=project_id, results=results)


# Settings endpoints
class SettingsUpdate(BaseModel):
    provider: str
    model: str
    api_key: str
    ollama_base_url: str = ""


@router.get("/settings", tags=["settings"])
def get_settings():
    s = app_config.get_current_settings()
    # Mask API key
    masked = dict(s)
    if masked.get("api_key"):
        masked["api_key"] = masked["api_key"][:4] + "***"
    return masked


def _apply_settings(body):
    app_config.update_settings(body.provider, body.model, body.api_key, body.ollama_base_url)


# Note: settings endpoints are on /api/settings (mounted in main.py)


# ── Background pipeline functions ─────────────────────────────────────────────

def _run_analysis_pipeline(project_id: int):
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return

        logger.info("Starting analysis pipeline for project %d", project_id)

        per_source = run_per_source_analysis(project_id, project.analysis_mode, db)
        synthesis = run_synthesis(project_id, per_source, db)
        run_job_stories(project_id, synthesis, db)

        project.status = "complete"
        db.commit()
        logger.info("Analysis complete for project %d", project_id)

    except Exception as e:
        logger.exception("Analysis failed for project %d: %s", project_id, e)
        project = db.query(Project).filter(Project.id == project_id).first()
        if project:
            project.status = "error"
            db.commit()
    finally:
        db.close()


def _run_odi_pipeline(project_id: int):
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        synthesis_row = (
            db.query(Result)
            .filter(Result.project_id == project_id, Result.analysis_type == "synthesis")
            .order_by(Result.created_at.desc())
            .first()
        )
        if not synthesis_row:
            return

        synthesis = json.loads(synthesis_row.parsed_json)

        # Reconstruct per_source from DB
        rows = (
            db.query(Result)
            .filter(Result.project_id == project_id)
            .all()
        )
        per_source = []
        for row in rows:
            if row.analysis_type not in ("synthesis", "job_stories", "odi_scoring"):
                per_source.append({
                    "source_type": row.analysis_type,
                    "analysis_type": row.analysis_type,
                    "data": json.loads(row.parsed_json),
                })

        run_odi_scoring(project_id, synthesis, per_source, db)
        logger.info("ODI scoring complete for project %d", project_id)
    except Exception as e:
        logger.exception("ODI scoring failed for project %d: %s", project_id, e)
    finally:
        db.close()
