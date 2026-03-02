import logging
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import init_db, get_db
from app.routers import projects, upload, analyze, export
from app import config as app_config
from app.services.llm_client import test_connection

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="JTBD Mapping Tool", version="1.0.0")

# Init DB on startup
@app.on_event("startup")
def on_startup():
    init_db()

# Mount routers
app.include_router(projects.router)
app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(export.router)

templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# ── Settings API ──────────────────────────────────────────────────────────────

class SettingsPayload(BaseModel):
    provider: str
    model: str
    api_key: str
    ollama_base_url: str = ""


@app.get("/api/settings")
def get_settings():
    s = app_config.get_current_settings()
    masked = dict(s)
    if masked.get("api_key"):
        masked["api_key"] = masked["api_key"][:4] + "***" if len(masked["api_key"]) > 4 else "***"
    return masked


@app.post("/api/settings")
def save_settings(body: SettingsPayload):
    app_config.update_settings(body.provider, body.model, body.api_key, body.ollama_base_url)
    return {"ok": True}


@app.post("/api/settings/test")
async def test_settings():
    result = await test_connection()
    return result
