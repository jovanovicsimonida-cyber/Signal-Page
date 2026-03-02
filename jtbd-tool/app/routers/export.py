import csv
import io
import json
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.result import Result

router = APIRouter(prefix="/api/projects", tags=["export"])


@router.get("/{project_id}/export/json")
def export_json(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    results = _load_results(project_id, db)
    payload = {"project": {"id": project.id, "name": project.name}, "results": results}
    content = json.dumps(payload, indent=2, ensure_ascii=False)

    return Response(
        content=content,
        media_type="application/json",
        headers={"Content-Disposition": f'attachment; filename="jtbd-{project.name}.json"'},
    )


@router.get("/{project_id}/export/markdown")
def export_markdown(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    results = _load_results(project_id, db)
    md = _render_markdown(project.name, results)

    return Response(
        content=md,
        media_type="text/markdown",
        headers={"Content-Disposition": f'attachment; filename="jtbd-{project.name}.md"'},
    )


@router.get("/{project_id}/export/csv")
def export_csv(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    results = _load_results(project_id, db)
    csv_content = _render_csv(results)

    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="jtbd-{project.name}.csv"'},
    )


# ── Helpers ───────────────────────────────────────────────────────────────────

def _load_results(project_id: int, db: Session) -> dict:
    rows = db.query(Result).filter(Result.project_id == project_id).all()
    results = {}
    for row in rows:
        try:
            results[row.analysis_type] = json.loads(row.parsed_json)
        except Exception:
            results[row.analysis_type] = {"raw": row.raw_llm_output}
    return results


def _render_markdown(project_name: str, results: dict) -> str:
    lines = [f"# JTBD Analysis: {project_name}", ""]

    synthesis = results.get("synthesis", {})
    unified = synthesis.get("unified_forces_map", {})
    clusters = unified.get("job_clusters", [])

    if clusters:
        lines.append("## Forces Map")
        lines.append("")
        for cluster in clusters:
            lines.append(f"### {cluster.get('cluster_label', 'Cluster')}")
            lines.append(f"> {cluster.get('core_job_statement', '')}")
            lines.append("")
            for force in ("push", "pull", "anxiety", "habit"):
                force_data = cluster.get(force, {})
                signals = force_data.get("signals", [])
                if signals:
                    lines.append(f"**{force.upper()}** (confidence: {force_data.get('confidence', '?')})")
                    for sig in signals:
                        lines.append(f"- {sig.get('signal', '')}")
                        for q in sig.get("verbatim_quotes", []):
                            lines.append(f"  > \"{q.get('quote', '')}\"")
                            lines.append(f"  — {q.get('speaker_or_author', q.get('speaker', 'unknown'))}, {q.get('source_file', '')}")
                    lines.append("")

    job_stories = results.get("job_stories", {}).get("job_stories", [])
    if job_stories:
        lines.append("## Job Stories")
        lines.append("")
        for story in job_stories:
            s = story.get("story", {})
            lines.append(f"### {story.get('cluster', 'Story')}")
            lines.append(f"**When** {s.get('when', '')}")
            lines.append(f"**I want to** {s.get('i_want_to', '')}")
            lines.append(f"**So I can** {s.get('so_i_can', '')}")
            lines.append("")
            for ev in story.get("verbatim_evidence", []):
                lines.append(f"> \"{ev.get('quote', '')}\"")
                lines.append(f"— {ev.get('speaker_or_author', 'unknown')}, {ev.get('source_file', '')}")
            lines.append("")

    blind_spots = synthesis.get("blind_spots", [])
    if blind_spots:
        lines.append("## Blind Spots")
        for bs in blind_spots:
            lines.append(f"- {bs}")
        lines.append("")

    return "\n".join(lines)


def _render_csv(results: dict) -> str:
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(["type", "cluster", "force", "signal", "confidence", "quote", "source_file", "speaker", "location"])

    synthesis = results.get("synthesis", {})
    for cluster in synthesis.get("unified_forces_map", {}).get("job_clusters", []):
        label = cluster.get("cluster_label", "")
        for force in ("push", "pull", "anxiety", "habit"):
            force_data = cluster.get(force, {})
            conf = force_data.get("confidence", "")
            for sig in force_data.get("signals", []):
                for q in sig.get("verbatim_quotes", []):
                    writer.writerow([
                        "forces_map", label, force,
                        sig.get("signal", ""), conf,
                        q.get("quote", ""),
                        q.get("source_file", ""),
                        q.get("speaker_or_author", q.get("speaker", "")),
                        q.get("location", ""),
                    ])

    for story in results.get("job_stories", {}).get("job_stories", []):
        s = story.get("story", {})
        story_text = f"When {s.get('when','')} | I want to {s.get('i_want_to','')} | So I can {s.get('so_i_can','')}"
        for ev in story.get("verbatim_evidence", []):
            writer.writerow([
                "job_story", story.get("cluster", ""), story.get("force_context", {}).get("primary_force", ""),
                story_text, story.get("confidence", ""),
                ev.get("quote", ""), ev.get("source_file", ""),
                ev.get("speaker_or_author", ""), "",
            ])

    return output.getvalue()
