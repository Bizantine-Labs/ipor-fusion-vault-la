"""Configuration and IPOR Fusion SDK context helpers."""
from __future__ import annotations

import json
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Mapping

ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
PROJECT_ROOT = Path(__file__).resolve().parents[1]


class ConfigurationError(RuntimeError):
    """Raised when operator configuration is missing or unsafe."""


@dataclass(frozen=True)
class VaultConfig:
    name: str
    accounting_asset: str
    accounting_asset_decimals: int
    chain: str
    chain_id: int
    address: str
    rpc_env: str
    current_allocations_bps: dict[str, int]



def load_env_file(path: str | Path = ".env") -> None:
    """Load simple KEY=VALUE pairs without overriding existing environment values."""
    resolved = Path(path)
    if not resolved.is_absolute():
        resolved = PROJECT_ROOT / resolved
    if not resolved.exists():
        return
    for line in resolved.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))

def read_json(path: str | Path) -> dict[str, Any]:
    resolved = Path(path)
    if not resolved.is_absolute():
        resolved = PROJECT_ROOT / resolved
    if not resolved.exists():
        raise ConfigurationError(f"Missing configuration file: {resolved}")
    with resolved.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_vault_config(vault_name: str | None = None, path: str | Path = "config/vaults.json") -> VaultConfig:
    data = read_json(path)
    selected = vault_name or data.get("default_vault")
    if not selected:
        raise ConfigurationError("No vault selected and config/vaults.json has no default_vault.")
    vaults: Mapping[str, Any] = data.get("vaults", {})
    if selected not in vaults:
        raise ConfigurationError(f"Vault '{selected}' is not defined in {path}.")
    raw = vaults[selected]
    if raw.get("accounting_asset") != "USDC":
        raise ConfigurationError("This bot is restricted to USDC accounting/deposit assets.")
    chain = raw.get("chain")
    chain_data = data.get("chains", {}).get(chain, {})
    if chain not in {"ethereum", "base", "flare"}:
        raise ConfigurationError(f"Unsupported chain '{chain}'. Allowed: ethereum, base, flare where supported.")
    if chain_data.get("supported") is False:
        raise ConfigurationError(f"Chain '{chain}' is marked unsupported in config/vaults.json.")
    return VaultConfig(
        name=str(raw["name"]),
        accounting_asset=str(raw["accounting_asset"]),
        accounting_asset_decimals=int(raw.get("accounting_asset_decimals", 6)),
        chain=str(chain),
        chain_id=int(raw.get("chain_id") or chain_data.get("chain_id")),
        address=str(raw["address"]),
        rpc_env=str(raw.get("rpc_env") or chain_data.get("rpc_env")),
        current_allocations_bps={k: int(v) for k, v in raw.get("current_allocations_bps", {}).items()},
    )


def require_real_address(address: str, label: str) -> None:
    if not address or address.lower() == ZERO_ADDRESS.lower():
        raise ConfigurationError(f"{label} must be configured with a real on-chain address before this operation.")


def create_web3_context(vault: VaultConfig, *, execute: bool = False) -> Any:
    """Create an official ipor-fusion Web3Context with safe private-key handling.

    Read-only flows require only the chain RPC URL. Live execution requires
    OPERATOR_PRIVATE_KEY in the environment; keys must never be committed.
    """
    load_env_file()
    rpc_url = os.getenv(vault.rpc_env)
    if not rpc_url:
        raise ConfigurationError(f"Set {vault.rpc_env} to an RPC URL for {vault.chain}.")
    private_key = os.getenv("OPERATOR_PRIVATE_KEY")
    if execute and not private_key:
        raise ConfigurationError("Live execution requires OPERATOR_PRIVATE_KEY in the environment.")
    from ipor_fusion import Web3Context
    if private_key:
        return Web3Context.from_url(url=rpc_url, private_key=private_key)
    try:
        return Web3Context.from_url(url=rpc_url)
    except TypeError:
        return Web3Context.from_url(url=rpc_url, private_key=None)


def load_plasma_vault(ctx: Any, vault: VaultConfig) -> Any:
    """Load a PlasmaVault wrapper from the official IPOR Fusion SDK."""
    require_real_address(vault.address, "Vault address")
    from ipor_fusion import PlasmaVault
    from web3 import Web3
    return PlasmaVault(ctx, Web3.to_checksum_address(vault.address))
