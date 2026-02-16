import { Strategy } from './types'

export const AVAILABLE_STRATEGIES: Strategy[] = [
  {
    id: 'ipor-usdc-pay-fixed',
    name: 'IPOR Pay Fixed USDC',
    protocol: 'IPOR',
    type: 'derivatives',
    estimatedAPY: 5.4,
    riskScore: 3,
    description: 'Pay fixed rate, receive floating rate on USDC interest rate swaps',
    icon: 'derivatives'
  },
  {
    id: 'ipor-usdt-receive-fixed',
    name: 'IPOR Receive Fixed USDT',
    protocol: 'IPOR',
    type: 'derivatives',
    estimatedAPY: 6.2,
    riskScore: 3,
    description: 'Receive fixed rate, pay floating rate on USDT interest rate swaps',
    icon: 'derivatives'
  },
  {
    id: 'ipor-dai-swap',
    name: 'IPOR DAI Rate Swap',
    protocol: 'IPOR',
    type: 'derivatives',
    estimatedAPY: 5.8,
    riskScore: 3,
    description: 'Interest rate swap strategy on DAI with dynamic rate optimization',
    icon: 'derivatives'
  },
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
    id: 'compound-usdc',
    name: 'Compound USDC',
    protocol: 'Compound',
    type: 'lending',
    estimatedAPY: 2.9,
    riskScore: 2,
    description: 'Supply USDC to Compound for steady yields',
    icon: 'lending'
  },
  {
    id: 'morpho-aave-usdc',
    name: 'Morpho-Aave USDC',
    protocol: 'Morpho',
    type: 'lending',
    estimatedAPY: 4.1,
    riskScore: 2,
    description: 'Enhanced Aave lending with P2P matching for better rates',
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
    id: 'balancer-weighted',
    name: 'Balancer Weighted Pool',
    protocol: 'Balancer',
    type: 'liquidity',
    estimatedAPY: 8.3,
    riskScore: 3,
    description: 'Customizable weighted liquidity pool with trading fees',
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
    id: 'gearbox-leverage',
    name: 'Gearbox Leverage Farming',
    protocol: 'Gearbox',
    type: 'derivatives',
    estimatedAPY: 16.7,
    riskScore: 5,
    description: 'Leveraged yield farming with managed risk parameters',
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
  },
  {
    id: 'frax-sfrxeth',
    name: 'Frax sfrxETH',
    protocol: 'Frax',
    type: 'staking',
    estimatedAPY: 4.2,
    riskScore: 3,
    description: 'Staked Frax ETH with competitive validator yields',
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
