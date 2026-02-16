export interface Strategy {
  id: string
  name: string
  protocol: string
  type: 'lending' | 'liquidity' | 'derivatives' | 'staking'
  estimatedAPY: number
  riskScore: number
  description: string
  icon: string
}

export interface StrategyAllocation {
  strategyId: string
  allocation: number
}

export interface VaultConfig {
  name: string
  description: string
  asset: string
  managementFee: number
  performanceFee: number
  isPublic: boolean
  strategies: StrategyAllocation[]
}

export interface Vault extends VaultConfig {
  id: string
  tvl: number
  apy: number
  createdAt: number
  performance24h: number
  riskScore: number
}

export interface Transaction {
  id: string
  vaultId: string
  type: 'deposit' | 'withdraw' | 'rebalance' | 'fee'
  amount: number
  timestamp: number
  txHash: string
  status: 'pending' | 'confirmed' | 'failed'
}
