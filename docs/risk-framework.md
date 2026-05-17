# Risk Framework

## Hard constraints

- Accounting/deposit asset must be USDC.
- Chains are limited to Ethereum, Base, and Flare where supported.
- Venues are limited to Morpho, Euler, and Superform/USDT0.
- Manual approval is mandatory.
- Leverage and recursive loops are prohibited.
- Disabled or unapproved routes are ignored.
- Private keys are never stored in repository files.

## Allocation limits

| Bucket | Target | Limit |
| --- | ---: | ---: |
| Morpho | 40% | Max 45% |
| Euler | 30% | Max 35% |
| Superform/USDT0 | 20% | Max 25% |
| Idle | 10% | Min 5% |

Additional concentration limits:

- Maximum single market: 20%.
- Maximum single chain: 50%.
- Maximum Flare exposure: 25%.

## Approval checklist

Before enabling a market in `config/approved_markets.json`, verify:

1. The market accepts USDC exposure consistent with vault accounting.
2. The market and chain are supported by the relevant IPOR Fusion fuse.
3. The fuse address is governance-approved for the target Plasma Vault.
4. The route does not borrow, lever, recurse, bridge through unapproved paths, or depend on unreviewed swaps.
5. APY data source and timestamp are recorded outside this scaffold.
