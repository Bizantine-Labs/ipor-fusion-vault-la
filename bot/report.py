"""Human-readable reporting."""
from __future__ import annotations

import json
from typing import Any


def to_json(data: Any) -> str:
    return json.dumps(data, indent=2, sort_keys=True, default=str)


def format_rebalance_report(plan: dict[str, Any]) -> str:
    lines = ["# Rebalance Recommendation", "", "Manual approval required: yes", "Execute by default: no", ""]
    lines.append("## Actions")
    if not plan.get("actions"):
        lines.append("- No executable approved-market actions recommended.")
    for action in plan.get("actions", []):
        amount = action.get("amount_usdc")
        amount_text = "unknown amount" if amount is None else f"{amount:,.2f} USDC"
        lines.append(
            f"- {action['venue']} on {action['chain']} via {action['market_id']}: "
            f"{amount_text}, target delta {action['target_bps']} bps, APY {action['net_apy']}%."
        )
    if plan.get("warnings"):
        lines.extend(["", "## Warnings"])
        lines.extend(f"- {warning}" for warning in plan["warnings"])
    if not plan.get("risk_check", {}).get("ok", False):
        lines.extend(["", "## Risk Violations"])
        lines.extend(f"- {item}" for item in plan.get("risk_check", {}).get("violations", []))
    return "\n".join(lines)
