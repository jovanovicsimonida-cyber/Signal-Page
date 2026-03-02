SYNTHESIS_PROMPT = """You are synthesizing JTBD analysis results from multiple data sources into a unified Forces of Progress map.

You have already analyzed each source separately. Now combine the findings to build a complete picture. Where multiple sources corroborate a finding, mark it as high-confidence. Where only one source supports it, mark it as low-confidence and note what would validate it.

MANDATORY: The unified map must carry forward the verbatim quotes from the individual source analyses. Every signal in the unified map MUST include the original verbatim quotes that support it. Do not summarize or paraphrase the quotes — carry them through exactly as they appeared in the source analyses. Claims without verbatim evidence from the source data must be dropped.

ANALYSIS RESULTS FROM INDIVIDUAL SOURCES:
{all_source_results}

DATA SOURCES AVAILABLE IN THIS PROJECT:
{source_types_list}

Respond in this exact JSON structure:
{{
  "unified_forces_map": {{
    "job_clusters": [
      {{
        "cluster_label": "Short name for this job/need cluster",
        "core_job_statement": "What the person is trying to accomplish, in their language (verb + object + context)",
        "push": {{
          "signals": [
            {{
              "signal": "Unified push signal",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words carried from source analysis",
                  "source_type": "sales_call | support_ticket | product_usage | interview",
                  "source_file": "Original filename",
                  "speaker_or_author": "Who said/wrote it",
                  "location": "Where in the original source"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "sources_that_support": ["Which data source types corroborate this"],
          "confidence": "high | medium | low"
        }},
        "pull": {{
          "signals": [
            {{
              "signal": "Unified pull signal",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words carried from source analysis",
                  "source_type": "sales_call | support_ticket | product_usage | interview",
                  "source_file": "Original filename",
                  "speaker_or_author": "Who said/wrote it",
                  "location": "Where in the original source"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "sources_that_support": ["Which data source types corroborate this"],
          "confidence": "high | medium | low"
        }},
        "anxiety": {{
          "signals": [
            {{
              "signal": "Unified anxiety signal",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words carried from source analysis",
                  "source_type": "sales_call | support_ticket | product_usage | interview",
                  "source_file": "Original filename",
                  "speaker_or_author": "Who said/wrote it",
                  "location": "Where in the original source"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "sources_that_support": ["Which data source types corroborate this"],
          "confidence": "high | medium | low"
        }},
        "habit": {{
          "signals": [
            {{
              "signal": "Unified habit signal",
              "verbatim_quotes": [
                {{
                  "quote": "EXACT words carried from source analysis",
                  "source_type": "sales_call | support_ticket | product_usage | interview",
                  "source_file": "Original filename",
                  "speaker_or_author": "Who said/wrote it",
                  "location": "Where in the original source"
                }}
              ],
              "is_inferred": false,
              "inference_note": ""
            }}
          ],
          "sources_that_support": ["Which data source types corroborate this"],
          "confidence": "high | medium | low"
        }},
        "net_force_assessment": "Is the combined Push+Pull strong enough to overcome Anxiety+Habit? What is the weakest link?",
        "priority": "high | medium | low — based on frequency, evidence strength, and conversion impact"
      }}
    ]
  }},
  "conversion_stalls": [
    {{
      "stall_description": "Where and why people get stuck in the trial-to-paid journey",
      "dominant_blocking_force": "anxiety | habit — which force most blocks conversion here",
      "verbatim_evidence": [
        {{
          "quote": "EXACT words from the original source data",
          "source_type": "Which source type",
          "source_file": "Filename"
        }}
      ],
      "sources_that_support": ["Which data source types"],
      "recommended_intervention_type": "What kind of action would address this"
    }}
  ],
  "data_conflicts": ["Any findings where different sources contradict each other — include the conflicting quotes from each source"],
  "blind_spots": ["What this combined analysis still cannot answer — what data is missing"]
}}"""
