FORCES_PRODUCT_USAGE_PROMPT = """You are analyzing product usage data to extract behavioral signals of Forces of Progress.

Product usage data is a window into behavioral Pull (actions that indicate progress and buying intent) and behavioral Habit (patterns that indicate inertia). Unlike language-based sources, this data shows what people DO rather than what they SAY.

MANDATORY SOURCING RULES FOR USAGE DATA:
- Usage data often contains metrics, events, and patterns rather than human language. For each signal, you MUST cite the specific data point, metric, event name, or pattern from the source data that supports it.
- If the source contains any user-generated text (e.g., search queries, error messages, feature requests), quote it verbatim.
- For numerical/behavioral evidence, cite the exact figure, event name, or pattern as it appears in the data.
- Every signal must have a "data_evidence" entry. If you cannot point to specific data, do not include the signal.

Analyze the following product usage data and extract:

SOURCE DATA:
{source_text}

Respond in this exact JSON structure:
{{
  "source_type": "product_usage",
  "pull_signals": {{
    "progress_behaviors": [
      {{
        "behavior": "Description of the pull behavior",
        "data_evidence": [
          {{
            "evidence": "EXACT data point, metric, event name, or verbatim user text from the source",
            "source_file": "Filename",
            "location": "Where in the data — row number, section, user ID, or time period"
          }}
        ],
        "is_inferred": false,
        "inference_note": ""
      }}
    ],
    "conversion_predictors": [
      {{
        "predictor": "Which specific behavior predicts conversion",
        "data_evidence": [
          {{
            "evidence": "EXACT data point or pattern from the source",
            "source_file": "Filename",
            "location": "Where in the data"
          }}
        ]
      }}
    ]
  }},
  "anxiety_signals": {{
    "friction_behaviors": [
      {{
        "behavior": "Description of the friction behavior",
        "data_evidence": [
          {{
            "evidence": "EXACT data point, metric, error message, or pattern from the source",
            "source_file": "Filename",
            "location": "Where in the data"
          }}
        ],
        "is_inferred": false,
        "inference_note": ""
      }}
    ],
    "drop_off_points": [
      {{
        "point": "Where in the flow users stop or abandon",
        "data_evidence": [
          {{
            "evidence": "EXACT data point or pattern",
            "source_file": "Filename",
            "location": "Where in the data"
          }}
        ]
      }}
    ]
  }},
  "habit_signals": {{
    "inertia_behaviors": [
      {{
        "behavior": "Description of the inertia behavior",
        "data_evidence": [
          {{
            "evidence": "EXACT data point or pattern from the source",
            "source_file": "Filename",
            "location": "Where in the data"
          }}
        ],
        "is_inferred": false,
        "inference_note": ""
      }}
    ]
  }},
  "push_signals": {{
    "urgency_behaviors": [
      {{
        "behavior": "Description of the urgency behavior",
        "data_evidence": [
          {{
            "evidence": "EXACT data point or pattern from the source",
            "source_file": "Filename",
            "location": "Where in the data"
          }}
        ],
        "is_inferred": false,
        "inference_note": ""
      }}
    ]
  }},
  "conversion_moments": [
    {{
      "moment": "Description of a make-or-break moment in the user journey",
      "what_predicts_success": {{
        "description": "Behaviors that indicate this moment went well",
        "data_evidence": ["EXACT data points from the source"]
      }},
      "what_predicts_failure": {{
        "description": "Behaviors that indicate this moment went poorly",
        "data_evidence": ["EXACT data points from the source"]
      }},
      "force_at_play": "Which force is most dominant at this moment"
    }}
  ],
  "gaps": ["What this behavioral data does NOT reveal that language-based sources or interviews would"]
}}"""
