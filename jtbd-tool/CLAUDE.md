# JTBD Mapping Tool

## What it does
Local web app that analyzes labeled qualitative/quantitative data and outputs JTBD forces maps + job stories. Primary framework: Forces of Progress (Moesta/Spiek). Two modes: with and without customer interviews.

## Tech
- FastAPI backend, vanilla HTML/JS/Tailwind frontend
- LiteLLM for provider-agnostic LLM calls
- SQLite via SQLAlchemy for local persistence
- No auth needed (local use only)

## Key design rules
- Every uploaded file gets a source_type label: interview, sales_call, support_ticket, product_usage
- Each source type has its own extraction prompt (different signals from different sources)
- Results are synthesized cross-source into a unified forces map
- All LLM responses are requested as JSON and parsed before storage
- Save both raw LLM output and parsed structured output for every analysis
- Frontend is a single HTML file, uses fetch() for all API calls, no page reloads
- **MANDATORY SOURCING: Every claim, signal, and finding must include verbatim quotes from the raw source data. No quote = no claim. This rule is enforced in every prompt and must be validated in the UI by displaying quotes alongside every finding.**
- The tool never fabricates data. If evidence is weak, it flags it as low-confidence.

## Framework hierarchy
1. Forces of Progress (primary analysis lens — always used)
2. Switch Interviews (used when interview data is present)
3. Job Stories (output/execution layer — always generated)
4. ODI-lite scoring (optional prioritization layer)

## File conventions
- All prompts in app/prompts/ as Python files exporting string constants
- All models in app/models/ using SQLAlchemy
- All routes in app/routers/ using FastAPI APIRouter
- All business logic in app/services/
