# Bizantine IPOR Fusion Alpha Strategy

This repository scaffolds an off-chain Alpha-style operator bot for an existing USDC IPOR Fusion Plasma Vault. It intentionally does not deploy or customize a vault contract; all execution is expected to route through governance-approved Plasma Vault fuses.

## Objective

Allocate USDC across approved lending opportunities using the official `ipor-fusion` Python SDK:

- Morpho target: 40%, maximum 45%
- Euler target: 30%, maximum 35%
- Superform/USDT0 target: 20%, maximum 25%
- Idle USDC target: 10%, minimum 5%

The bot is conservative by default. It produces recommendations first, requires manual approval, and only sends transactions when an operator explicitly passes `--execute`.

## Scope

Supported chains are Ethereum, Base, and Flare where IPOR Fusion and the target venue are supported. Supported venues are Morpho, Euler, and Superform/USDT0. The current implementation scaffolds Morpho supply action creation and leaves Euler plus Superform/USDT0 as TODO action builders pending approved ABI/SDK mappings.

## Non-goals

- No custom vault contract.
- No leverage.
- No recursive supply/borrow loops.
- No unapproved markets or routes.
- No automatic execution without a CLI execution flag and environment private key.
