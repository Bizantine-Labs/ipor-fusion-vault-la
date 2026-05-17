#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from bot.context import create_web3_context, load_plasma_vault, load_vault_config
from bot.execute import execute_plan
from bot.rebalance import recommend_rebalance
from bot.report import to_json
from bot.risk import load_policy
from bot.vault_state import fetch_vault_info
from bot.yields import load_approved_markets


def main() -> None:
    parser = argparse.ArgumentParser(description="Execute a manually approved rebalance plan. Defaults to dry run.")
    parser.add_argument("--vault", help="Vault key from config/vaults.json")
    parser.add_argument("--execute", action="store_true", help="Send live transactions. Requires OPERATOR_PRIVATE_KEY.")
    args = parser.parse_args()
    config = load_vault_config(args.vault)
    ctx = create_web3_context(config, execute=args.execute)
    vault = load_plasma_vault(ctx, config)
    info = fetch_vault_info(vault, address=config.address, chain=config.chain, accounting_asset=config.accounting_asset)
    plan = recommend_rebalance(
        current_allocations_bps=config.current_allocations_bps,
        policy=load_policy(),
        approved_markets=load_approved_markets(),
        total_assets=info.total_assets,
    )
    result = execute_plan(vault, plan, chain=config.chain, execute=args.execute)
    print(to_json({"plan": plan, "result": result}))


if __name__ == "__main__":
    main()
