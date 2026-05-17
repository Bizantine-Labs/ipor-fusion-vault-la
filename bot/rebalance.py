"""Rebalance recommendation engine."""
from __future__ import annotations

from dataclasses import asdict
from typing import Any

from bot.risk import validate_allocations, validate_recommendation
from bot.yields import MarketOpportunity, best_market_by_venue


def _targets(policy: dict[str, Any]) -> dict[str, int]:
    return {venue: int(cfg["target_bps"]) for venue, cfg in policy["venues"].items() if "target_bps" in cfg}


def recommend_rebalance(
    *,
    current_allocations_bps: dict[str, int],
    policy: dict[str, Any],
    approved_markets: list[MarketOpportunity],
    total_assets: int | None,
) -> dict[str, Any]:
    """Produce a manual-approval rebalance recommendation; never executes."""
    allocation_check = validate_allocations(current_allocations_bps, policy)
    targets = _targets(policy)
    markets = best_market_by_venue(approved_markets)
    actions: list[dict[str, Any]] = []
    warnings: list[str] = []
    min_trade_usdc = float(policy.get("rebalance", {}).get("min_trade_usdc", 0))
    decimals = 6

    for venue, target_bps in targets.items():
        if venue == "idle":
            continue
        current_bps = int(current_allocations_bps.get(venue, 0))
        drift_bps = target_bps - current_bps
        if abs(drift_bps) < int(policy.get("rebalance", {}).get("drift_threshold_bps", 0)):
            continue
        if drift_bps <= 0:
            warnings.append(f"{venue} is at/above target; withdrawal action builders are not scaffolded yet.")
            continue
        market = markets.get(venue)
        if market is None:
            warnings.append(f"No enabled approved {venue} market; leaving target allocation idle until approval.")
            continue
        amount_units = None
        amount_usdc = None
        if total_assets is not None:
            amount_units = total_assets * drift_bps // 10_000
            amount_usdc = amount_units / (10**decimals)
            if amount_usdc < min_trade_usdc:
                warnings.append(f"Skipping {market.id}; computed amount {amount_usdc:.2f} USDC is below min_trade_usdc.")
                continue
        actions.append(
            {
                "type": "supply",
                "venue": venue,
                "chain": market.chain,
                "market_id": market.id,
                "market_address": market.market_address,
                "asset": market.asset,
                "fuse": market.fuse,
                "target_bps": min(drift_bps, int(policy["limits"]["max_single_market_bps"])),
                "amount_units": amount_units,
                "amount_usdc": amount_usdc,
                "net_apy": market.net_apy,
                "status": "manual_approval_required",
                "action_params": asdict(market).get("action_params", {}),
            }
        )

    plan = {
        "execute_by_default": False,
        "manual_approval_required": True,
        "current_allocations_bps": current_allocations_bps,
        "target_allocations_bps": targets,
        "actions": actions,
        "warnings": warnings,
        "allocation_check": allocation_check.__dict__,
    }
    recommendation_check = validate_recommendation(plan, policy)
    plan["risk_check"] = recommendation_check.__dict__
    return plan
