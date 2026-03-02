import os
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "openai")
LLM_MODEL_NAME = os.getenv("LLM_MODEL", "gpt-4o-mini")
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# In-memory override (from settings panel, takes precedence over .env)
_runtime_overrides: dict = {}


def get_litellm_model() -> str:
    provider = _runtime_overrides.get("provider", LLM_PROVIDER)
    model = _runtime_overrides.get("model", LLM_MODEL_NAME)
    if provider == "anthropic":
        return f"anthropic/{model}"
    if provider == "gemini":
        return f"gemini/{model}"
    if provider == "ollama":
        return f"ollama/{model}"
    return model  # openai — no prefix needed


def get_api_key() -> str:
    return _runtime_overrides.get("api_key", LLM_API_KEY)


def get_ollama_base_url() -> str:
    return _runtime_overrides.get("ollama_base_url", OLLAMA_BASE_URL)


def update_settings(provider: str, model: str, api_key: str, ollama_base_url: str = ""):
    _runtime_overrides["provider"] = provider
    _runtime_overrides["model"] = model
    _runtime_overrides["api_key"] = api_key
    if ollama_base_url:
        _runtime_overrides["ollama_base_url"] = ollama_base_url


def get_current_settings() -> dict:
    return {
        "provider": _runtime_overrides.get("provider", LLM_PROVIDER),
        "model": _runtime_overrides.get("model", LLM_MODEL_NAME),
        "api_key": _runtime_overrides.get("api_key", LLM_API_KEY),
        "ollama_base_url": _runtime_overrides.get("ollama_base_url", OLLAMA_BASE_URL),
    }
