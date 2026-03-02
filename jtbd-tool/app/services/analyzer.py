import json
import logging
from typing import Any

from sqlalchemy.orm import Session

from app.models.source import Source
from app.models.result import Result
from app.services import chunker, llm_client
from app.prompts.system import SYSTEM_PROMPT
from app.prompts.forces_sales_calls import FORCES_SALES_CALLS_PROMPT
from app.prompts.forces_support import FORCES_SUPPORT_PROMPT
from app.prompts.forces_product_usage import FORCES_PRODUCT_USAGE_PROMPT
from app.prompts.switch_interviews import SWITCH_INTERVIEW_PROMPT

logger = logging.getLogger(__name__)

SOURCE_TYPE_PROMPT_MAP = {
    "sales_call": ("forces_sales_call", FORCES_SALES_CALLS_PROMPT),
    "support_ticket": ("forces_support", FORCES_SUPPORT_PROMPT),
    "product_usage": ("forces_product_usage", FORCES_PRODUCT_USAGE_PROMPT),
    "interview": ("switch_interview", SWITCH_INTERVIEW_PROMPT),
}


def run_per_source_analysis(
    project_id: int,
    analysis_mode: str,
    db: Session,
) -> list[dict[str, Any]]:
    """Run source-specific extraction prompts for all sources in the project.

    Returns a list of parsed result dicts (one per source type group).
    Skips interview sources if mode is 'without_interviews'.
    """
    sources: list[Source] = (
        db.query(Source).filter(Source.project_id == project_id).all()
    )

    # Group sources by type
    grouped: dict[str, list[Source]] = {}
    for source in sources:
        if analysis_mode == "without_interviews" and source.source_type == "interview":
            continue
        grouped.setdefault(source.source_type, []).append(source)

    per_source_results: list[dict[str, Any]] = []

    for source_type, source_list in grouped.items():
        if source_type not in SOURCE_TYPE_PROMPT_MAP:
            logger.warning("Unknown source_type '%s', skipping.", source_type)
            continue

        analysis_type, prompt_template = SOURCE_TYPE_PROMPT_MAP[source_type]

        # Concatenate all sources of this type
        combined_text = "\n\n---\n\n".join(
            f"[FILE: {s.filename}]\n{s.raw_text}" for s in source_list
        )

        # Chunk if needed and run per chunk, then merge
        chunks = chunker.chunk_text(combined_text)
        chunk_results: list[dict] = []

        for i, chunk in enumerate(chunks):
            logger.info(
                "Analyzing %s chunk %d/%d for project %d",
                source_type, i + 1, len(chunks), project_id,
            )
            user_prompt = prompt_template.format(source_text=chunk)
            raw, parsed = llm_client.call_llm(user_prompt, SYSTEM_PROMPT)
            chunk_results.append(parsed)

        merged = _merge_chunk_results(chunk_results) if len(chunk_results) > 1 else chunk_results[0]

        # Persist to DB
        result = Result(
            project_id=project_id,
            analysis_type=analysis_type,
            raw_llm_output=json.dumps(chunk_results),
            parsed_json=json.dumps(merged),
        )
        db.add(result)
        db.flush()

        per_source_results.append({"source_type": source_type, "analysis_type": analysis_type, "data": merged})

    db.commit()
    return per_source_results


def _merge_chunk_results(results: list[dict]) -> dict:
    """Naively merge chunked results by concatenating list fields.

    For the synthesis step the LLM will de-duplicate and unify anyway.
    """
    if not results:
        return {}

    merged = dict(results[0])

    for r in results[1:]:
        for key, val in r.items():
            if key in merged:
                if isinstance(val, list) and isinstance(merged[key], list):
                    merged[key] = merged[key] + val
                elif isinstance(val, dict) and isinstance(merged[key], dict):
                    # Recurse one level for dict merging
                    for sub_key, sub_val in val.items():
                        if sub_key in merged[key] and isinstance(sub_val, list):
                            merged[key][sub_key] = merged[key][sub_key] + sub_val
                        else:
                            merged[key][sub_key] = sub_val
            else:
                merged[key] = val

    return merged
