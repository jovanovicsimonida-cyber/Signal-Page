from datetime import datetime
from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    analysis_mode: Mapped[str] = mapped_column(
        String, nullable=False  # 'without_interviews' | 'with_interviews'
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(
        String, default="draft"  # 'draft' | 'analyzing' | 'complete' | 'error'
    )
