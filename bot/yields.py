"""Approved-market and yield helpers."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from bot.context import ConfigurationError, ZERO_ADDRESS, read_json

ALLOWED_VENUES = {"morpho", "euler", "superform_usdt0"}
ALLOWED_CHAINS = {"ethereum", "base", "flare"}


@dataclass(frozen=True)
class MarketOpportunity:
    id: str
    venue: str
    chain: str
    asset: str
    market_address: str
    fuse: str
    net_apy: float
    action_params: dict[str, Any]


def load_approved_markets(path: str = "config/approved_markets.json", *, include_disabled: bool = False) -> list[MarketOpportunity]:
    data = read_json(path)
    markets: list[MarketOpportunity] = []
    for raw in data.get("markets", []):
        if raw.get("enabled") is not True and not include_disabled:
            continue
        venue = str(raw.get("venue"))
        chain = str(raw.get("chain"))
        if venue not in ALLOWED_VENUES:
            raise ConfigurationError(f"Unapproved venue in approved markets: {venue}")
        if chain not in ALLOWED_CHAINS:
            raise ConfigurationError(f"Unsupported chain in approved markets: {chain}")
        if raw.get("asset") != "USDC":
            raise ConfigurationError(f"Market {raw.get('id')} is not USDC-denominated.")
        if raw.get("enabled") is True and str(raw.get("market_address", "")).lower() == ZERO_ADDRESS.lower():
            raise ConfigurationError(f"Enabled market {raw.get('id')} has a placeholder address.")
        markets.append(
            MarketOpportunity(
                id=str(raw["id"]),
                venue=venue,
                chain=chain,
                asset=str(raw["asset"]),
                market_address=str(raw["market_address"]),
                fuse=str(raw["fuse"]),
                net_apy=float(raw.get("net_apy", 0.0)),
                action_params=dict(raw.get("action_params", {})),
            )
        )
    return sorted(markets, key=lambda item: item.net_apy, reverse=True)


def best_market_by_venue(markets: list[MarketOpportunity]) -> dict[str, MarketOpportunity]:
    best: dict[str, MarketOpportunity] = {}
    for market in markets:
        if market.venue not in best:
            best[market.venue] = market
    return best
