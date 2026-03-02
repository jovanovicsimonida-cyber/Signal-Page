JOB_STORIES_PROMPT = """You are generating actionable Job Stories from a unified JTBD forces map.

Job Stories use the format: When ___, I want to ___, So I can ___
They are the execution layer — each one should be specific enough to build an onboarding step, trigger an email, write a piece of copy, or design an in-app prompt.

MANDATORY: Every Job Story must be directly traceable to verbatim evidence from the source data. Include the verbatim quotes that justify this story's existence. If you cannot trace a Job Story back to real quotes from the data, do not include it.

For each Job Story, also define the operational triggers that make it actionable.

UNIFIED FORCES MAP:
{synthesis_result}

Respond in this exact JSON structure:
{{
  "job_stories": [
    {{
      "cluster": "Which job cluster this belongs to",
      "story": {{
        "when": "A specific circumstance the user is in (time pressure, missing data, stakeholder review, first login, etc.)",
        "i_want_to": "The progress they want to make",
        "so_i_can": "The outcome (proof, confidence, speed, risk reduction, looking good to boss, etc.)"
      }},
      "verbatim_evidence": [
        {{
          "quote": "EXACT words from the original source data that this Job Story is built on",
          "source_type": "sales_call | support_ticket | product_usage | interview",
          "source_file": "Original filename",
          "speaker_or_author": "Who said/wrote it",
          "why_it_supports_this_story": "Brief explanation of how this quote connects to the When/I want to/So I can"
        }}
      ],
      "force_context": {{
        "primary_force": "Which force this story primarily addresses (push | pull | anxiety | habit)",
        "how_it_addresses_it": "How acting on this story reduces anxiety, breaks a habit, amplifies pull, or leverages push"
      }},
      "operational_triggers": {{
        "entry_trigger": "The specific user behavior that reveals they are in this circumstance right now",
        "micro_win": "The smallest proof of value you can deliver within 24 hours of detecting the trigger",
        "exit_condition": "What behavior means they got the value and you should stop nudging",
        "channel": "Best channel to act on this: in-app prompt | email | sales assist | onboarding step | help doc"
      }},
      "confidence": "high | medium | low — based on strength of underlying verbatim evidence",
      "evidence_sources": ["Which data source types support this story"]
    }}
  ],
  "priority_order": ["List of story indices in recommended implementation order — highest impact + highest confidence first"],
  "quick_wins": ["Stories that could be implemented fastest with existing product/tooling"],
  "requires_product_changes": ["Stories that require actual product or feature development"]
}}"""
