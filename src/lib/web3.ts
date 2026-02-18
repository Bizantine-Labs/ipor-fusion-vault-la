import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, encodeFunctionData, type Address, type Hash } from 'viem'
import { mainnet, sepolia, arbitrum, polygon } from 'viem/chains'
import { VaultConfig } from './types'

export const SUPPORTED_CHAINS = {
  mainnet,
  sepolia,
  arbitrum,
  polygon
} as const

export type SupportedChain = keyof typeof SUPPORTED_CHAINS

export interface WalletInfo {
  address: Address
  chainId: number
  chainName: string
  balance: string
  isConnected: boolean
}

export interface DeploymentParams {
  config: VaultConfig
  chainName: SupportedChain
  account: Address
}

const IPOR_FUSION_FACTORY_ABI = [
  {
    type: 'function',
    name: 'createVault',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'asset', type: 'address' },
      { name: 'managementFee', type: 'uint256' },
      { name: 'performanceFee', type: 'uint256' },
      { name: 'isPublic', type: 'bool' },
      { name: 'strategies', type: 'bytes' }
    ],
    outputs: [{ name: 'vault', type: 'address' }]
  }
] as const

const FACTORY_ADDRESSES: Record<SupportedChain, Address> = {
  mainnet: '0x0000000000000000000000000000000000000000',
  sepolia: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
  arbitrum: '0x0000000000000000000000000000000000000000',
  polygon: '0x0000000000000000000000000000000000000000'
}

const ASSET_ADDRESSES: Record<string, Record<SupportedChain, Address>> = {
  USDC: {
    mainnet: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    sepolia: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    polygon: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
  },
  USDT: {
    mainnet: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    sepolia: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
    arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
  },
  DAI: {
    mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    sepolia: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
    arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
  }
}

export function getChain(chainName: SupportedChain) {
  return SUPPORTED_CHAINS[chainName]
}

export async function checkWalletConnection(): Promise<WalletInfo | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    }) as Address[]

    if (accounts.length === 0) {
      return null
    }

    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    }) as string

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    }) as string

    const chainIdNum = parseInt(chainId, 16)
    const chainName = Object.entries(SUPPORTED_CHAINS).find(
      ([_, chain]) => chain.id === chainIdNum
    )?.[0] || 'unknown'

    return {
      address: accounts[0],
      chainId: chainIdNum,
      chainName,
      balance: formatEther(BigInt(balance)),
      isConnected: true
    }
  } catch (error) {
    console.error('Error checking wallet connection:', error)
    return null
  }
}

export async function connectWallet(): Promise<WalletInfo> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected. Please install MetaMask or another Web3 wallet.')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as Address[]

    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    }) as string

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    }) as string

    const chainIdNum = parseInt(chainId, 16)
    const chainName = Object.entries(SUPPORTED_CHAINS).find(
      ([_, chain]) => chain.id === chainIdNum
    )?.[0] || 'unknown'

    return {
      address: accounts[0],
      chainId: chainIdNum,
      chainName,
      balance: formatEther(BigInt(balance)),
      isConnected: true
    }
  } catch (error) {
    console.error('Error connecting wallet:', error)
    throw new Error('Failed to connect wallet')
  }
}

export async function switchNetwork(chainName: SupportedChain): Promise<void> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]
  const chainIdHex = `0x${chain.id.toString(16)}`

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }]
    })
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainIdHex,
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: [chain.rpcUrls.default.http[0]],
          blockExplorerUrls: chain.blockExplorers ? [chain.blockExplorers.default.url] : undefined
        }]
      })
    } else {
      throw error
    }
  }
}

export async function deployVault(
  config: VaultConfig,
  chainName: SupportedChain,
  account: Address
): Promise<{ vaultAddress: Address; transactionHash: Hash }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]
  
  const walletClient = createWalletClient({
    chain,
    account,
    transport: custom(window.ethereum)
  })

  const publicClient = createPublicClient({
    chain,
    transport: http()
  })

  const assetAddress = ASSET_ADDRESSES[config.asset]?.[chainName]
  if (!assetAddress) {
    throw new Error(`Asset ${config.asset} not supported on ${chainName}`)
  }

  if (!account) {
    throw new Error('No account connected')
  }

  const managementFeeBps = Math.floor(config.managementFee * 100)
  const performanceFeeBps = Math.floor(config.performanceFee * 100)

  const strategiesData = encodeFunctionData({
    abi: [
      {
        name: 'encodeStrategies',
        type: 'function',
        inputs: [{ name: 'strategies', type: 'string[]' }],
        outputs: [{ name: '', type: 'bytes' }]
      }
    ],
    functionName: 'encodeStrategies',
    args: [config.strategies.map(s => s.strategyId)]
  })

  const hash = await walletClient.writeContract({
    address: FACTORY_ADDRESSES[chainName],
    abi: IPOR_FUSION_FACTORY_ABI,
    functionName: 'createVault',
    args: [
      config.name,
      assetAddress,
      BigInt(managementFeeBps),
      BigInt(performanceFeeBps),
      config.isPublic,
      strategiesData
    ],
  })

  const receipt = await publicClient.waitForTransactionReceipt({ hash })

  const vaultAddress = receipt.logs[0]?.address as Address

  if (!vaultAddress) {
    throw new Error('Failed to retrieve vault address from transaction')
  }

  return {
    vaultAddress,
    transactionHash: hash
  }
}

export async function deployVaultOnChain(
  config: VaultConfig,
  chainName: SupportedChain,
  account: Address
): Promise<{ vaultAddress: Address; transactionHash: Hash }> {
  return deployVault(config, chainName, account)
}

export function getExplorerUrl(
  chainName: SupportedChain,
  type: 'tx' | 'address',
  hash: string
): string {
  const chain = SUPPORTED_CHAINS[chainName]
  const baseUrl = chain.blockExplorers?.default?.url || 'https://etherscan.io'
  return `${baseUrl}/${type}/${hash}`
}

export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (...args: any[]) => void) => void
      removeListener: (event: string, handler: (...args: any[]) => void) => void
    }
  }
}
