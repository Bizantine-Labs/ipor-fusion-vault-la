#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from bot.context import load_vault_config
from bot.report import to_json
from bot.risk import load_policy, validate_allocations


def main() -> None:
    parser = argparse.ArgumentParser(description="Report configured vault allocations against policy.")
    parser.add_argument("--vault", help="Vault key from config/vaults.json")
    args = parser.parse_args()
    config = load_vault_config(args.vault)
    policy = load_policy()
    check = validate_allocations(config.current_allocations_bps, policy)
    print(to_json({"vault": config.name, "allocations_bps": config.current_allocations_bps, "check": check.__dict__}))


if __name__ == "__main__":
    main()
