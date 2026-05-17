#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from bot.context import create_web3_context, load_plasma_vault, load_vault_config
from bot.rebalance import recommend_rebalance
from bot.report import format_rebalance_report, to_json
from bot.risk import load_policy
from bot.vault_state import fetch_vault_info
from bot.yields import load_approved_markets


def main() -> None:
    parser = argparse.ArgumentParser(description="Produce a dry-run rebalance recommendation.")
    parser.add_argument("--vault", help="Vault key from config/vaults.json")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON")
    parser.add_argument("--offline", action="store_true", help="Skip RPC and use configured allocations only")
    args = parser.parse_args()
    config = load_vault_config(args.vault)
    policy = load_policy()
    total_assets = None
    if not args.offline:
        ctx = create_web3_context(config, execute=False)
        vault = load_plasma_vault(ctx, config)
        total_assets = fetch_vault_info(vault, address=config.address, chain=config.chain, accounting_asset=config.accounting_asset).total_assets
    plan = recommend_rebalance(
        current_allocations_bps=config.current_allocations_bps,
        policy=policy,
        approved_markets=load_approved_markets(),
        total_assets=total_assets,
    )
    print(to_json(plan) if args.json else format_rebalance_report(plan))


if __name__ == "__main__":
    main()
