import { VaultConfig } from './types'

export interface DeploymentConfig {
  vault: VaultConfig
  network: 'mainnet' | 'sepolia' | 'arbitrum' | 'polygon'
  initialDeposit?: number
}

export interface DeploymentResult {
  success: boolean
  vaultAddress?: string
  transactionHash?: string
  error?: string
  timestamp: number
}

export interface WalletInfo {
  address: string
  network: string
  balance: string
}

export async function connectWallet(): Promise<WalletInfo | null> {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('No Web3 wallet detected. Please install MetaMask or another Web3 wallet.')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    })
    
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    })

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    })

    const networks: Record<string, string> = {
      '0x1': 'mainnet',
      '0xaa36a7': 'sepolia',
      '0xa4b1': 'arbitrum',
      '0x89': 'polygon'
    }

    const balanceInEth = parseInt(balance, 16) / 1e18

    return {
      address: accounts[0],
      network: networks[chainId] || 'unknown',
      balance: balanceInEth.toFixed(4)
    }
  } catch (error) {
    console.error('Wallet connection error:', error)
    return null
  }
}

export async function deployVault(config: DeploymentConfig): Promise<DeploymentResult> {
  try {
    const walletInfo = await connectWallet()
    
    if (!walletInfo) {
      return {
        success: false,
        error: 'Wallet not connected',
        timestamp: Date.now()
      }
    }

    if (walletInfo.network !== config.network) {
      return {
        success: false,
        error: `Please switch to ${config.network} network. Currently on ${walletInfo.network}.`,
        timestamp: Date.now()
      }
    }

    const deploymentParams = {
      name: config.vault.name,
      asset: config.vault.asset,
      managementFee: config.vault.managementFee,
      performanceFee: config.vault.performanceFee,
      strategies: config.vault.strategies,
      isPublic: config.vault.isPublic,
      allowlist: config.vault.allowlist || [], // Legacy support
      accessControl: config.vault.accessControl || { owner: [], atomist: [], alpha: [], guardian: [] },
      initialDeposit: config.initialDeposit || 0
    }

    const mockVaultAddress = `0x${Math.random().toString(16).slice(2, 42).padEnd(40, '0')}`
    const mockTxHash = `0x${Math.random().toString(16).slice(2).padEnd(64, '0')}`

    await new Promise(resolve => setTimeout(resolve, 2000))

    return {
      success: true,
      vaultAddress: mockVaultAddress,
      transactionHash: mockTxHash,
      timestamp: Date.now()
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Deployment failed',
      timestamp: Date.now()
    }
  }
}

export async function estimateGasCost(config: VaultConfig): Promise<{
  gasLimit: string
  estimatedCost: string
}> {
  const baseGas = 500000
  const strategyGas = config.strategies.length * 100000
  const totalGas = baseGas + strategyGas

  const gasPrice = 30

  const estimatedCostGwei = totalGas * gasPrice
  const estimatedCostEth = estimatedCostGwei / 1e9

  return {
    gasLimit: totalGas.toLocaleString(),
    estimatedCost: estimatedCostEth.toFixed(6)
  }
}

export function getBlockExplorerUrl(network: string, txHash: string): string {
  const explorers: Record<string, string> = {
    mainnet: 'https://etherscan.io/tx/',
    sepolia: 'https://sepolia.etherscan.io/tx/',
    arbitrum: 'https://arbiscan.io/tx/',
    polygon: 'https://polygonscan.com/tx/'
  }

  return `${explorers[network] || explorers.mainnet}${txHash}`
}

export function getVaultExplorerUrl(network: string, vaultAddress: string): string {
  const explorers: Record<string, string> = {
    mainnet: 'https://etherscan.io/address/',
    sepolia: 'https://sepolia.etherscan.io/address/',
    arbitrum: 'https://arbiscan.io/address/',
    polygon: 'https://polygonscan.com/address/'
  }

  return `${explorers[network] || explorers.mainnet}${vaultAddress}`
}
