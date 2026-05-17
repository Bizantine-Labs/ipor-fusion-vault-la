"""Fuse action builders and guarded execution."""
from __future__ import annotations

from typing import Any

from bot.context import ConfigurationError, ZERO_ADDRESS, read_json


def _fuse_address(fuse_name: str, chain: str) -> str:
    fuses = read_json("config/fuses.json").get("fuses", {})
    fuse = fuses.get(fuse_name)
    if not fuse:
        raise ConfigurationError(f"Fuse '{fuse_name}' is not configured.")
    address = str(fuse.get("chain_addresses", {}).get(chain, ZERO_ADDRESS))
    if address.lower() == ZERO_ADDRESS.lower():
        raise ConfigurationError(f"Fuse '{fuse_name}' on {chain} has a placeholder address.")
    return address


def build_morpho_supply_action(action: dict[str, Any], *, chain: str) -> Any:
    """Build a MorphoSupplyFuse supply action with the official SDK.

    Market-specific SDK parameters vary by Morpho market type. Operators should
    place approved values in approved_markets.json action_params. If omitted, the
    scaffold falls back to a common asset/amount/market_address shape.
    """
    if action.get("venue") != "morpho":
        raise ConfigurationError("build_morpho_supply_action only accepts Morpho actions.")
    if action.get("amount_units") is None:
        raise ConfigurationError("Cannot build live Morpho action without amount_units from on-chain total_assets.")
    from ipor_fusion import MorphoSupplyFuse
    from web3 import Web3

    fuse = MorphoSupplyFuse(Web3.to_checksum_address(_fuse_address(str(action["fuse"]), chain)))
    params = dict(action.get("action_params") or {})
    params.setdefault("asset", Web3.to_checksum_address(action.get("asset", "0x0000000000000000000000000000000000000000")))
    params.setdefault("amount", int(action["amount_units"]))
    params.setdefault("market", Web3.to_checksum_address(str(action["market_address"])))
    params.setdefault("market_address", Web3.to_checksum_address(str(action["market_address"])))
    try:
        return fuse.supply(**params)
    except TypeError:
        # Keep the scaffold explicit rather than guessing a live calldata shape.
        minimal = {k: v for k, v in params.items() if k in {"asset", "amount"}}
        return fuse.supply(**minimal)


def build_action(action: dict[str, Any], *, chain: str) -> Any:
    venue = action.get("venue")
    if venue == "morpho":
        return build_morpho_supply_action(action, chain=chain)
    if venue == "euler":
        raise NotImplementedError("TODO: implement Euler supply fuse action creation after approved ABI/SDK mapping.")
    if venue == "superform_usdt0":
        raise NotImplementedError("TODO: implement Superform/USDT0 fuse action creation after approved ABI/SDK mapping.")
    raise ConfigurationError(f"Unsupported venue: {venue}")


def execute_plan(plasma_vault: Any, plan: dict[str, Any], *, chain: str, execute: bool = False) -> dict[str, Any]:
    if not execute:
        return {"executed": False, "reason": "Dry run only. Re-run with --execute after manual approval."}
    if plan.get("manual_approval_required") is not True:
        raise ConfigurationError("Refusing live execution unless manual_approval_required is present.")
    risk = plan.get("risk_check", {})
    if risk.get("ok") is not True:
        raise ConfigurationError(f"Refusing live execution because risk check failed: {risk.get('violations')}")
    actions = [build_action(action, chain=chain) for action in plan.get("actions", [])]
    if not actions:
        return {"executed": False, "reason": "No executable actions in plan."}
    receipt = plasma_vault.execute(actions)
    return {"executed": True, "receipt": str(receipt)}
