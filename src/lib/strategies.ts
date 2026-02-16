import { Strategy } from './types'

export const AVAILABLE_STRATEGIES: Strategy[] = [
  {
    id: 'aave-usdc',
    name: 'Aave USDC Lending',
    protocol: 'Aave',
    type: 'lending',
    estimatedAPY: 3.2,
    riskScore: 2,
    description: 'Low-risk lending strategy on Aave protocol with stable returns',
    icon: 'lending'
  },
  {
    id: 'compound-eth',
    name: 'Compound ETH',
    protocol: 'Compound',
    type: 'lending',
    estimatedAPY: 2.8,
    riskScore: 2,
    description: 'Supply ETH to Compound for steady yields',
    icon: 'lending'
  },
  {
    id: 'uniswap-v3-eth-usdc',
    name: 'Uniswap V3 ETH/USDC',
    protocol: 'Uniswap',
    type: 'liquidity',
    estimatedAPY: 12.5,
    riskScore: 4,
    description: 'Concentrated liquidity provision with higher yields and IL risk',
    icon: 'liquidity'
  },
  {
    id: 'curve-3pool',
    name: 'Curve 3Pool',
    protocol: 'Curve',
    type: 'liquidity',
    estimatedAPY: 4.7,
    riskScore: 2,
    description: 'Stable coin liquidity pool with low impermanent loss',
    icon: 'liquidity'
  },
  {
    id: 'gmx-glp',
    name: 'GMX GLP',
    protocol: 'GMX',
    type: 'liquidity',
    estimatedAPY: 18.3,
    riskScore: 5,
    description: 'High-yield liquidity provision with exposure to perpetual trading fees',
    icon: 'liquidity'
  },
  {
    id: 'pendle-pt-usdc',
    name: 'Pendle PT-USDC',
    protocol: 'Pendle',
    type: 'derivatives',
    estimatedAPY: 8.9,
    riskScore: 4,
    description: 'Yield trading through principal tokens for enhanced returns',
    icon: 'derivatives'
  },
  {
    id: 'ribbon-eth-covered-call',
    name: 'Ribbon ETH Covered Call',
    protocol: 'Ribbon',
    type: 'derivatives',
    estimatedAPY: 15.2,
    riskScore: 5,
    description: 'Automated options strategy selling covered calls on ETH',
    icon: 'derivatives'
  },
  {
    id: 'lido-steth',
    name: 'Lido Staked ETH',
    protocol: 'Lido',
    type: 'staking',
    estimatedAPY: 3.8,
    riskScore: 2,
    description: 'Liquid staking with instant liquidity and minimal risk',
    icon: 'staking'
  },
  {
    id: 'rocket-pool-reth',
    name: 'Rocket Pool rETH',
    protocol: 'Rocket Pool',
    type: 'staking',
    estimatedAPY: 3.5,
    riskScore: 2,
    description: 'Decentralized ETH staking with validator diversity',
    icon: 'staking'
  }
]

export const ASSET_OPTIONS = [
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
  { value: 'DAI', label: 'DAI' },
  { value: 'ETH', label: 'ETH' },
  { value: 'WETH', label: 'WETH' },
  { value: 'WBTC', label: 'WBTC' }
]

export function calculateVaultRisk(strategies: { strategyId: string; allocation: number }[]): number {
  if (strategies.length === 0) return 0
  
  let weightedRisk = 0
  strategies.forEach(({ strategyId, allocation }) => {
    const strategy = AVAILABLE_STRATEGIES.find(s => s.id === strategyId)
    if (strategy) {
      weightedRisk += (strategy.riskScore * allocation) / 100
    }
  })
  
  return Math.round(weightedRisk * 10) / 10
}

export function calculateExpectedAPY(strategies: { strategyId: string; allocation: number }[]): number {
  if (strategies.length === 0) return 0
  
  let weightedAPY = 0
  strategies.forEach(({ strategyId, allocation }) => {
    const strategy = AVAILABLE_STRATEGIES.find(s => s.id === strategyId)
    if (strategy) {
      weightedAPY += (strategy.estimatedAPY * allocation) / 100
    }
  })
  
  return Math.round(weightedAPY * 100) / 100
}
