FORCES_SUPPORT_PROMPT = """You are analyzing support tickets to extract Forces of Progress.

Support tickets are a window into Anxiety (confusion, trust issues, complexity fears) and Habit (workarounds, references to old tools, friction tolerance). They also reveal real-world context that never shows up in analytics, and Push signals through urgency language.

MANDATORY: Every signal you identify MUST include at least one verbatim quote — the exact words from the ticket, copied character for character. If you cannot find a verbatim quote to support a signal, do not include that signal.

Analyze the following support ticket data and extract:

SOURCE DATA:
{source_text}

Respond in this exact JSON structure:
{{
  "source_type": "support_ticket",
  "clusters": [
    {{
      "cluster_label": "Short description of this friction/need cluster",
      "push": {{
        "signals": [
          {{
            "signal": "Urgency language, deadline references, frustration with status quo",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the ticket",
                "source_file": "Filename",
                "author": "Ticket author or ID if available",
                "location": "Ticket ID, subject line, or position in data"
              }}
            ],
            "is_inferred": false,
            "inference_note": ""
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "pull": {{
        "signals": [
          {{
            "signal": "Implied desired outcome — what they were trying to accomplish when they hit friction",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the ticket",
                "source_file": "Filename",
                "author": "Ticket author or ID",
                "location": "Ticket ID or position"
              }}
            ],
            "is_inferred": true,
            "inference_note": "Pull in support tickets is usually inferred — explain how the quote implies the desired outcome"
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "anxiety": {{
        "signals": [
          {{
            "signal": "Confusion, repeated errors, trust concerns, integration worries, complexity fears",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the ticket",
                "source_file": "Filename",
                "author": "Ticket author or ID",
                "location": "Ticket ID or position"
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
            "signal": "Workarounds, references to old tools, 'we used to do it this way', 'good enough' language",
            "verbatim_quotes": [
              {{
                "quote": "EXACT words from the ticket",
                "source_file": "Filename",
                "author": "Ticket author or ID",
                "location": "Ticket ID or position"
              }}
            ],
            "is_inferred": false,
            "inference_note": ""
          }}
        ],
        "confidence": "high | medium | low"
      }},
      "frequency": "How often this cluster appeared — repeated issues indicate systemic friction",
      "real_context": "What real-world situation or circumstance this ticket reveals that analytics would miss"
    }}
  ],
  "repeat_patterns": [
    {{
      "pattern": "Description of a repeatedly occurring issue",
      "count_or_frequency": "How often it appears",
      "force_implication": "Which force this pattern most strongly indicates and why",
      "example_quotes": [
        {{
          "quote": "EXACT verbatim quote from one instance",
          "source_file": "Filename",
          "author": "Ticket author or ID",
          "location": "Ticket ID or position"
        }}
      ]
    }}
  ],
  "gaps": ["What this data source does NOT reveal that interviews or other sources would"]
}}"""
