# Operations Runbook

## Setup

1. Create a Python 3.10+ virtual environment.
2. Install dependencies with `pip install -r requirements.txt`.
3. Copy `.env.example` to `.env` locally and populate RPC URLs.
4. Update `config/vaults.json` with the real Plasma Vault address.
5. Update `config/fuses.json` with governance-approved fuse addresses.
6. Update `config/approved_markets.json` with approved market addresses, APYs, and SDK action parameters; set `enabled` to `true` only after approval.

## Read-only checks

- `python scripts/report_allocations.py`
- `python scripts/propose_rebalance.py --offline`
- `python scripts/vault_info.py`
- `python scripts/propose_rebalance.py`

## Execution procedure

1. Generate a recommendation with `python scripts/propose_rebalance.py --json`.
2. Review market approvals, fuse addresses, amounts, chain exposure, and risk violations.
3. Record manual approval using the team's normal governance or multisig process.
4. Export `OPERATOR_PRIVATE_KEY` locally for the approved operator account.
5. Run `python scripts/execute_rebalance.py --execute` only after approval.
6. Save the transaction receipt and compare post-trade allocations.

## Safety defaults

The execution script is dry-run unless `--execute` is present. Placeholder zero addresses fail before live action creation. Private keys are read only from the environment and must not be committed.
