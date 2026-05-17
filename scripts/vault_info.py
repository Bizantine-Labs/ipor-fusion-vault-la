#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from bot.context import create_web3_context, load_plasma_vault, load_vault_config
from bot.report import to_json
from bot.vault_state import fetch_vault_info


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch read-only IPOR Fusion Plasma Vault info.")
    parser.add_argument("--vault", help="Vault key from config/vaults.json")
    args = parser.parse_args()
    config = load_vault_config(args.vault)
    ctx = create_web3_context(config, execute=False)
    vault = load_plasma_vault(ctx, config)
    info = fetch_vault_info(vault, address=config.address, chain=config.chain, accounting_asset=config.accounting_asset)
    print(to_json(info.to_dict()))


if __name__ == "__main__":
    main()
