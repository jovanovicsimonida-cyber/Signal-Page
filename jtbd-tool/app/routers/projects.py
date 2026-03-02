from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.source import Source
from app.models.result import Result

router = APIRouter(prefix="/api/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    name: str
    analysis_mode: str  # 'without_interviews' | 'with_interviews'


class ProjectResponse(BaseModel):
    id: int
    name: str
    analysis_mode: str
    created_at: datetime
    status: str
    source_count: int = 0

    model_config = {"from_attributes": True}


@router.get("", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    result = []
    for p in projects:
        count = db.query(Source).filter(Source.project_id == p.id).count()
        r = ProjectResponse(
            id=p.id,
            name=p.name,
            analysis_mode=p.analysis_mode,
            created_at=p.created_at,
            status=p.status,
            source_count=count,
        )
        result.append(r)
    return result


@router.post("", response_model=ProjectResponse, status_code=201)
def create_project(body: ProjectCreate, db: Session = Depends(get_db)):
    if body.analysis_mode not in ("without_interviews", "with_interviews"):
        raise HTTPException(status_code=422, detail="Invalid analysis_mode")
    project = Project(name=body.name, analysis_mode=body.analysis_mode)
    db.add(project)
    db.commit()
    db.refresh(project)
    return ProjectResponse(
        id=project.id,
        name=project.name,
        analysis_mode=project.analysis_mode,
        created_at=project.created_at,
        status=project.status,
        source_count=0,
    )


@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
