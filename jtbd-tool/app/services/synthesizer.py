import json
import logging
from typing import Any

from sqlalchemy.orm import Session

from app.models.result import Result
from app.services import llm_client
from app.prompts.system import SYSTEM_PROMPT
from app.prompts.synthesis import SYNTHESIS_PROMPT
from app.prompts.job_stories import JOB_STORIES_PROMPT
from app.prompts.odi_scoring import ODI_SCORING_PROMPT

logger = logging.getLogger(__name__)


def run_synthesis(
    project_id: int,
    per_source_results: list[dict[str, Any]],
    db: Session,
) -> dict[str, Any]:
    """Synthesize per-source results into a unified forces map."""
    source_types_list = [r["source_type"] for r in per_source_results]
    all_source_json = json.dumps([r["data"] for r in per_source_results], indent=2)

    user_prompt = SYNTHESIS_PROMPT.format(
        all_source_results=all_source_json,
        source_types_list=", ".join(source_types_list),
    )

    logger.info("Running synthesis for project %d", project_id)
    raw, parsed = llm_client.call_llm(user_prompt, SYSTEM_PROMPT)

    result = Result(
        project_id=project_id,
        analysis_type="synthesis",
        raw_llm_output=raw,
        parsed_json=json.dumps(parsed),
    )
    db.add(result)
    db.flush()
    db.commit()

    return parsed


def run_job_stories(
    project_id: int,
    synthesis_result: dict[str, Any],
    db: Session,
) -> dict[str, Any]:
    """Generate Job Stories from the unified forces map."""
    user_prompt = JOB_STORIES_PROMPT.format(
        synthesis_result=json.dumps(synthesis_result, indent=2)
    )

    logger.info("Generating job stories for project %d", project_id)
    raw, parsed = llm_client.call_llm(user_prompt, SYSTEM_PROMPT)

    result = Result(
        project_id=project_id,
        analysis_type="job_stories",
        raw_llm_output=raw,
        parsed_json=json.dumps(parsed),
    )
    db.add(result)
    db.flush()
    db.commit()

    return parsed


def run_odi_scoring(
    project_id: int,
    synthesis_result: dict[str, Any],
    per_source_results: list[dict[str, Any]],
    db: Session,
) -> dict[str, Any]:
    """Run optional ODI-lite opportunity scoring."""
    user_prompt = ODI_SCORING_PROMPT.format(
        synthesis_result=json.dumps(synthesis_result, indent=2),
        all_source_results=json.dumps([r["data"] for r in per_source_results], indent=2),
    )

    logger.info("Running ODI scoring for project %d", project_id)
    raw, parsed = llm_client.call_llm(user_prompt, SYSTEM_PROMPT)

    result = Result(
        project_id=project_id,
        analysis_type="odi_scoring",
        raw_llm_output=raw,
        parsed_json=json.dumps(parsed),
    )
    db.add(result)
    db.flush()
    db.commit()

    return parsed
