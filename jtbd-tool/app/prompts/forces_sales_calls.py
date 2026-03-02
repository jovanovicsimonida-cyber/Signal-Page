FORCES_SALES_CALLS_PROMPT = """You are analyzing sales call transcripts to extract Forces of Progress.

Sales calls are a window into Pull (desired outcomes, what progress they want) and Anxiety (objections, risks, concerns about switching). They also reveal Push (what pain drove them to take the call) and Decision Criteria.

MANDATORY: Every signal you identify MUST include at least one verbatim quote — the exact words from the transcript, copied character for character. If you cannot find a verbatim quote to support a signal, do not include that signal.

Analyze the following sales call data and extract:

SOURCE DATA:
{source_text}

Respond in this exact JSON structure:
{{
  "source_type": "sales_call",
  "clusters": [
    {{
      "cluster_label": "Short description of this job/need cluster",
      "push": {{
        "signals": [
          {{
            "signal": "Description of the push signal",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the source, copied character for character",
                "source_file": "Filename this quote comes from",
                "speaker": "Who said it (if identifiable, otherwise 'unknown')",
                "location": "Where in the source — timestamp, line number, or position description"
              }}
            ],
            "is_inferred": false,
            "inference_note": "Only include if is_inferred is true — explain the gap between quote and claim"
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "pull": {{
        "signals": [
          {{
            "signal": "Description of the pull signal",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the source",
                "source_file": "Filename",
                "speaker": "Who said it",
                "location": "Where in the source"
              }}
            ],
            "is_inferred": false,
            "inference_note": ""
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "anxiety": {{
        "signals": [
          {{
            "signal": "Description of the anxiety signal",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the source",
                "source_file": "Filename",
                "speaker": "Who said it",
                "location": "Where in the source"
              }}
            ],
            "is_inferred": false,
            "inference_note": ""
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "habit": {{
        "signals": [
          {{
            "signal": "Description of the habit signal",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the source",
                "source_file": "Filename",
                "speaker": "Who said it",
                "location": "Where in the source"
              }}
            ],
            "is_inferred": false,
            "inference_note": ""
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "decision_criteria": ["What they said they compare or evaluate on"],
      "frequency": "How often this cluster appeared across the data"
    }}
  ],
  "raw_quotes_of_interest": [
    {{
      "quote": "EXACT verbatim quote",
      "source_file": "Filename",
      "speaker": "Who said it",
      "location": "Where in the source",
      "force": "push | pull | anxiety | habit",
      "context": "Brief context of when/why this was said"
    }}
  ],
  "gaps": ["What this data source does NOT reveal that interviews or other sources would"]
}}"""
