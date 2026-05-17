"""Risk-policy loading and validation."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from bot.context import ConfigurationError, read_json


@dataclass(frozen=True)
class RiskCheckResult:
    ok: bool
    violations: list[str]


def load_policy(path: str = "config/allocation_policy.json") -> dict[str, Any]:
    policy = read_json(path)
    if policy.get("asset") != "USDC":
        raise ConfigurationError("Allocation policy asset must be USDC.")
    rules = policy.get("rules", {})
    for key in ("no_leverage", "no_recursive_loops", "no_unapproved_routes"):
        if rules.get(key) is not True:
            raise ConfigurationError(f"Safety rule '{key}' must be true.")
    if policy.get("manual_approval_required") is not True:
        raise ConfigurationError("Manual approval must remain enabled for this automation repo.")
    return policy


def validate_allocations(allocations_bps: dict[str, int], policy: dict[str, Any]) -> RiskCheckResult:
    violations: list[str] = []
    venues = policy["venues"]
    total = sum(allocations_bps.values())
    if total != 10_000:
        violations.append(f"Allocation total must be 10000 bps, got {total}.")
    for venue, cfg in venues.items():
        value = allocations_bps.get(venue, 0)
        if "max_bps" in cfg and value > int(cfg["max_bps"]):
            violations.append(f"{venue} allocation {value} bps exceeds max {cfg['max_bps']} bps.")
        if "min_bps" in cfg and value < int(cfg["min_bps"]):
            violations.append(f"{venue} allocation {value} bps is below min {cfg['min_bps']} bps.")
    return RiskCheckResult(ok=not violations, violations=violations)


def validate_recommendation(plan: dict[str, Any], policy: dict[str, Any]) -> RiskCheckResult:
    violations: list[str] = []
    limits = policy["limits"]
    chain_totals: dict[str, int] = {}
    venue_totals: dict[str, int] = {}
    for action in plan.get("actions", []):
        bps = int(action.get("target_bps", 0))
        chain = str(action.get("chain", ""))
        venue = str(action.get("venue", ""))
        market_id = str(action.get("market_id", ""))
        if bps > int(limits["max_single_market_bps"]):
            violations.append(f"Market {market_id} exceeds max single market bps: {bps}.")
        chain_totals[chain] = chain_totals.get(chain, 0) + bps
        venue_totals[venue] = venue_totals.get(venue, 0) + bps
    for chain, bps in chain_totals.items():
        if bps > int(limits["max_single_chain_bps"]):
            violations.append(f"Chain {chain} exceeds max single chain bps: {bps}.")
        if chain == "flare" and bps > int(limits["max_flare_bps"]):
            violations.append(f"Flare exceeds max bps: {bps}.")
    for venue, bps in venue_totals.items():
        max_bps = policy["venues"].get(venue, {}).get("max_bps")
        if max_bps is not None and bps > int(max_bps):
            violations.append(f"Venue {venue} exceeds max bps: {bps}.")
    return RiskCheckResult(ok=not violations, violations=violations)
