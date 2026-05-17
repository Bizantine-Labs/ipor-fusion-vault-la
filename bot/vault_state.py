"""Read-only vault-state helpers."""
from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any


@dataclass(frozen=True)
class VaultInfo:
    address: str
    chain: str
    accounting_asset: str
    total_assets: int | None
    total_supply: int | None
    name: str | None = None
    symbol: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def _call_optional(obj: Any, *names: str) -> Any | None:
    for name in names:
        candidate = getattr(obj, name, None)
        if candidate is None:
            continue
        try:
            return candidate() if callable(candidate) else candidate
        except Exception:
            continue
    return None


def fetch_vault_info(plasma_vault: Any, *, address: str, chain: str, accounting_asset: str) -> VaultInfo:
    """Fetch basic Plasma Vault info without mutating chain state.

    The SDK has evolved over time, so this helper accepts either Pythonic
    methods or web3 contract-function wrappers exposed by PlasmaVault.
    """
    contract = getattr(plasma_vault, "contract", None)
    functions = getattr(contract, "functions", None)

    def contract_call(name: str) -> Any | None:
        fn = getattr(functions, name, None) if functions is not None else None
        if fn is None:
            return None
        try:
            return fn().call()
        except Exception:
            return None

    return VaultInfo(
        address=address,
        chain=chain,
        accounting_asset=accounting_asset,
        total_assets=_call_optional(plasma_vault, "total_assets", "totalAssets") or contract_call("totalAssets"),
        total_supply=_call_optional(plasma_vault, "total_supply", "totalSupply") or contract_call("totalSupply"),
        name=_call_optional(plasma_vault, "name") or contract_call("name"),
        symbol=_call_optional(plasma_vault, "symbol") or contract_call("symbol"),
    )
