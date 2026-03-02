SWITCH_INTERVIEW_PROMPT = """You are analyzing customer interview transcripts using the Switch Interview method (Moesta/Spiek).

These interviews reconstruct the decision timeline — from first thought through active evaluation to final decision. Your goal is to map the full journey and extract the four forces at each stage.

MANDATORY: Every finding MUST include verbatim quotes — the EXACT words the interviewee used, copied character for character from the transcript. If you cannot find a verbatim quote to support a finding, do not include that finding. The exact language people use is strategically critical — it becomes conversion copy, objection-handling scripts, and onboarding triggers.

Analyze the following interview data and extract:

SOURCE DATA:
{source_text}

Respond in this exact JSON structure:
{{
  "source_type": "interview",
  "interviewees": [
    {{
      "id": "Interviewee identifier (name, number, or label from the transcript)",
      "timeline": {{
        "first_thought": {{
          "description": "When and how they first realized they needed a change",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Timestamp, line number, or position"
            }}
          ]
        }},
        "passive_looking": {{
          "description": "How they started exploring alternatives",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }},
        "active_looking": {{
          "description": "What triggered serious evaluation",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }},
        "decision_moment": {{
          "description": "What specifically tipped the final decision (or blocked it)",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }},
        "first_value": {{
          "description": "When they first felt confident the new solution was working",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }}
      }},
      "forces": {{
        "push": {{
          "signals": [
            {{
              "signal": "What made the old way unacceptable",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words from the transcript",
                  "source_file": "Filename",
                  "location": "Position in transcript"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "strength": "strong | moderate | weak"
        }},
        "pull": {{
          "signals": [
            {{
              "signal": "What outcome they wanted badly enough to change",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words from the transcript",
                  "source_file": "Filename",
                  "location": "Position in transcript"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "strength": "strong | moderate | weak"
        }},
        "anxiety": {{
          "signals": [
            {{
              "signal": "What could have made them regret the decision",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words from the transcript",
                  "source_file": "Filename",
                  "location": "Position in transcript"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "strength": "strong | moderate | weak"
        }},
        "habit": {{
          "signals": [
            {{
              "signal": "What kept them doing it the old way",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words from the transcript",
                  "source_file": "Filename",
                  "location": "Position in transcript"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "strength": "strong | moderate | weak"
        }}
      }},
      "emotional_forces": [
        {{
          "force": "Identity, fear, perception, how they wanted to feel or be seen",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }}
      ],
      "social_forces": [
        {{
          "force": "Stakeholder dynamics, team perception, internal politics",
          "verbatim_quotes": [
            {{
              "quote": "EXACT words from the transcript",
              "source_file": "Filename",
              "location": "Position in transcript"
            }}
          ]
        }}
      ],
      "why_now_context": {{
        "description": "What external circumstance made this the moment to act",
        "verbatim_quotes": [
          {{
            "quote": "EXACT words from the transcript",
            "source_file": "Filename",
            "location": "Position in transcript"
          }}
        ]
      }}
    }}
  ],
  "cross_interview_patterns": {{
    "common_push_triggers": [
      {{
        "pattern": "Push signal that appeared across multiple interviews",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ],
    "common_pull_outcomes": [
      {{
        "pattern": "Pull signal that appeared across multiple interviews",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ],
    "common_anxieties": [
      {{
        "pattern": "Anxiety that appeared across multiple interviews",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ],
    "common_habits": [
      {{
        "pattern": "Habit that appeared across multiple interviews",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ],
    "confidence_moments": [
      {{
        "pattern": "Moment that consistently created confidence in the decision",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ],
    "deal_breakers": [
      {{
        "pattern": "Factor that consistently blocked or delayed the decision",
        "supporting_quotes": [
          {{
            "quote": "EXACT words",
            "interviewee_id": "Which interviewee",
            "source_file": "Filename"
          }}
        ]
      }}
    ]
  }},
  "gaps": ["What the interviews did NOT reveal that other data sources might"]
}}"""
