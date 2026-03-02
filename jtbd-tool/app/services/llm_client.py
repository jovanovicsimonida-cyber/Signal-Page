import json
import re
import time
import logging
from typing import Any

import litellm

from app import config

logger = logging.getLogger(__name__)

MAX_RETRIES = 3
RETRY_DELAYS = [2, 4, 8]  # seconds


def call_llm(user_prompt: str, system_prompt: str) -> tuple[str, dict]:
    """Send a prompt to the configured LLM and return (raw_text, parsed_json).

    Retries up to MAX_RETRIES times on transient errors.
    Raises ValueError if the response cannot be parsed as JSON after all retries.
    """
    model = config.get_litellm_model()
    api_key = config.get_api_key()

    kwargs: dict[str, Any] = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.2,
    }

    if api_key:
        kwargs["api_key"] = api_key

    provider = config.get_current_settings()["provider"]
    if provider == "ollama":
        kwargs["api_base"] = config.get_ollama_base_url()

    last_error: Exception | None = None

    for attempt in range(MAX_RETRIES + 1):
        try:
            response = litellm.completion(**kwargs)
            raw = response.choices[0].message.content or ""
            parsed = _extract_json(raw)
            return raw, parsed
        except (ValueError, json.JSONDecodeError) as e:
            # Bad JSON — don't retry, surface immediately
            raise ValueError(f"LLM returned non-JSON response: {e}\n\nRaw output:\n{raw}") from e
        except Exception as e:
            last_error = e
            if attempt < MAX_RETRIES:
                delay = RETRY_DELAYS[attempt]
                logger.warning("LLM call failed (attempt %d/%d): %s. Retrying in %ds...",
                               attempt + 1, MAX_RETRIES, e, delay)
                time.sleep(delay)
            else:
                raise RuntimeError(f"LLM call failed after {MAX_RETRIES} retries: {last_error}") from last_error

    raise RuntimeError("Unexpected exit from retry loop")


def _extract_json(text: str) -> dict:
    """Strip markdown fences and parse JSON from LLM response."""
    # Remove ```json ... ``` or ``` ... ``` wrappers
    cleaned = re.sub(r"^```(?:json)?\s*", "", text.strip(), flags=re.MULTILINE)
    cleaned = re.sub(r"\s*```$", "", cleaned.strip(), flags=re.MULTILINE)
    return json.loads(cleaned.strip())


async def test_connection() -> dict:
    """Quick connectivity test — returns {ok: bool, message: str}."""
    try:
        _, parsed = call_llm(
            user_prompt='Respond with exactly: {"status": "ok"}',
            system_prompt="You are a connectivity test. Return only valid JSON.",
        )
        return {"ok": True, "message": "Connection successful"}
    except Exception as e:
        return {"ok": False, "message": str(e)}
