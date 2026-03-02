ODI_SCORING_PROMPT = """You are applying an ODI-lite opportunity scoring method to prioritize JTBD clusters WITHOUT a formal customer survey.

Use proxy signals from the available data to approximate Ulwick's opportunity score:
- Importance proxy: how frequently a job/need appears across data sources + how often it precedes pricing intent or conversion signals
- Satisfaction proxy: success rate observable in data (completion rates, time-to-complete, drop-off points, resolution rates)
- Opportunity = high importance + low satisfaction = under-served need worth fixing

UNIFIED FORCES MAP:
{synthesis_result}

ALL SOURCE ANALYSIS RESULTS:
{all_source_results}

Respond in this exact JSON structure:
{{
  "scored_opportunities": [
    {{
      "cluster_label": "Job cluster name",
      "importance_score": 1,
      "importance_reasoning": "Why this score — what frequency/intensity data supports it",
      "satisfaction_score": 1,
      "satisfaction_reasoning": "Why this score — what success/failure data supports it",
      "opportunity_score": "Calculated: importance + max(importance - satisfaction, 0)",
      "conversion_impact": "high | medium | low — how directly this affects trial-to-paid",
      "confidence_in_scoring": "high | medium | low — how reliable the proxy data is"
    }}
  ],
  "fix_order": ["Clusters listed in recommended fix order — highest opportunity + highest conversion impact + highest confidence first"],
  "scoring_caveats": ["Explicit limitations of this proxy-based scoring vs. a real ODI survey"]
}}"""
