from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.project import Project
from app.models.source import Source
from app.services.file_parser import parse_file

router = APIRouter(prefix="/api/projects", tags=["upload"])

VALID_SOURCE_TYPES = {"interview", "sales_call", "support_ticket", "product_usage"}


class SourceResponse(BaseModel):
    id: int
    project_id: int
    filename: str
    source_type: str
    char_count: int

    model_config = {"from_attributes": True}


@router.post("/{project_id}/sources", response_model=SourceResponse, status_code=201)
async def upload_source(
    project_id: int,
    file: UploadFile = File(...),
    source_type: str = Form(...),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if source_type not in VALID_SOURCE_TYPES:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid source_type. Must be one of: {', '.join(sorted(VALID_SOURCE_TYPES))}",
        )

    content = await file.read()
    raw_text = parse_file(file.filename or "upload", content)

    if not raw_text.strip():
        raise HTTPException(status_code=422, detail="Could not extract text from file")

    source = Source(
        project_id=project_id,
        filename=file.filename or "upload",
        source_type=source_type,
        raw_text=raw_text,
    )
    db.add(source)
    db.commit()
    db.refresh(source)

    return SourceResponse(
        id=source.id,
        project_id=source.project_id,
        filename=source.filename,
        source_type=source.source_type,
        char_count=len(source.raw_text),
    )


@router.get("/{project_id}/sources", response_model=list[SourceResponse])
def list_sources(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    sources = db.query(Source).filter(Source.project_id == project_id).all()
    return [
        SourceResponse(
            id=s.id,
            project_id=s.project_id,
            filename=s.filename,
            source_type=s.source_type,
            char_count=len(s.raw_text),
        )
        for s in sources
    ]


@router.delete("/{project_id}/sources/{source_id}", status_code=204)
def delete_source(project_id: int, source_id: int, db: Session = Depends(get_db)):
    source = (
        db.query(Source)
        .filter(Source.id == source_id, Source.project_id == project_id)
        .first()
    )
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    db.delete(source)
    db.commit()


@router.patch("/{project_id}/sources/{source_id}", response_model=SourceResponse)
def update_source_type(
    project_id: int,
    source_id: int,
    source_type: str = Form(...),
    db: Session = Depends(get_db),
):
    if source_type not in VALID_SOURCE_TYPES:
        raise HTTPException(status_code=422, detail="Invalid source_type")
    source = (
        db.query(Source)
        .filter(Source.id == source_id, Source.project_id == project_id)
        .first()
    )
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    source.source_type = source_type
    db.commit()
    db.refresh(source)
    return SourceResponse(
        id=source.id,
        project_id=source.project_id,
        filename=source.filename,
        source_type=source.source_type,
        char_count=len(source.raw_text),
    )
