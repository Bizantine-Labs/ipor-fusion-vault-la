import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, encodeFunctionData, type Address, type Hash } from 'viem'
import { mainnet, sepolia, arbitrum, polygon } from 'viem/chains'
import { VaultConfig } from './types'

export const SUPPORTED_CHAINS = {
  mainnet,
  sepolia,
  arbitrum,
  polygon,
} as const

export type SupportedChain = keyof typeof SUPPORTED_CHAINS

export interface WalletInfo {
  address: Address
  chainName: SupportedChain
  balance: string
}

export interface DeploymentParams {
  vaultAddress: Address
  transactionHash: Hash
}

const IPOR_FUSION_FACTORY_ABI = [
  {
    type: 'function',
    name: 'createVault',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'asset', type: 'address' },
      { name: 'strategies', type: 'bytes' },
      { name: 'managementFee', type: 'uint256' },
      { name: 'performanceFee', type: 'uint256' },
      { name: 'isPublic', type: 'bool' },
    ],
    outputs: [{ name: 'vault', type: 'address' }],
  },
]

const FACTORY_ADDRESSES: Record<SupportedChain, Address> = {
  mainnet: '0x1234567890123456789012345678901234567890',
  sepolia: '0x1234567890123456789012345678901234567890',
  arbitrum: '0x1234567890123456789012345678901234567890',
  polygon: '0x1234567890123456789012345678901234567890',
}

const ASSET_ADDRESSES: Record<string, Partial<Record<SupportedChain, Address>>> = {
  USDC: {
    mainnet: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  },
  USDT: {
    mainnet: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  DAI: {
    mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  },
}

export async function getWalletInfo(): Promise<WalletInfo | null> {
  try {
    if (!window.ethereum) {
      return null
    }

    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    }) as Address[]

    if (!accounts || accounts.length === 0) {
      return null
    }

    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    }) as string

    const chainIdNum = parseInt(chainId, 16)
    const chainName = (Object.entries(SUPPORTED_CHAINS).find(
      ([_, chain]) => chain.id === chainIdNum
    )?.[0] || 'mainnet') as SupportedChain

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string

    return {
      address: accounts[0],
      chainName,
      balance: formatEther(BigInt(balance)),
    }
  } catch (error) {
    console.error('Error getting wallet info:', error)
    return null
  }
}

export async function connectWallet(): Promise<WalletInfo> {
  if (!window.ethereum) {
    throw new Error('No Web3 wallet detected. Please install MetaMask or another Web3 wallet.')
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as Address[]

    const chainId = await window.ethereum.request({
      method: 'eth_chainId',
    }) as string

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string

    const chainIdNum = parseInt(chainId, 16)
    const chainName = (Object.entries(SUPPORTED_CHAINS).find(
      ([_, chain]) => chain.id === chainIdNum
    )?.[0] || 'mainnet') as SupportedChain

    return {
      address: accounts[0],
      chainName,
      balance: formatEther(BigInt(balance)),
    }
  } catch (error) {
    console.error('Error connecting wallet:', error)
    throw new Error('Failed to connect wallet')
  }
}

export async function switchNetwork(chainName: SupportedChain): Promise<void> {
  if (!window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chain.id.toString(16)}` }],
    })
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chain.id.toString(16)}`,
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: [chain.rpcUrls.default.http[0]],
        }],
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
  if (!window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]
  
  const walletClient = createWalletClient({
    chain,
    transport: custom(window.ethereum),
  })

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const assetAddress = ASSET_ADDRESSES[config.asset]?.[chainName]
  if (!assetAddress) {
    throw new Error(`Asset ${config.asset} not supported on ${chainName}`)
  }

  if (!FACTORY_ADDRESSES[chainName]) {
    throw new Error(`Chain ${chainName} not supported`)
  }

  const performanceFee = BigInt(Math.floor(config.performanceFee * 100))
  const managementFee = BigInt(Math.floor(config.managementFee * 100))

  const strategiesData = encodeFunctionData({
    abi: [{
      type: 'function',
      name: 'encodeStrategies',
      inputs: [{ name: 'strategyIds', type: 'uint256[]' }],
      outputs: [{ name: '', type: 'bytes' }],
    }],
    args: [config.strategies.map(s => BigInt(s.strategyId))],
  })

  const hash = await walletClient.writeContract({
    address: FACTORY_ADDRESSES[chainName],
    abi: IPOR_FUSION_FACTORY_ABI,
    functionName: 'createVault',
    args: [
      config.name,
      assetAddress,
      strategiesData,
      managementFee,
      performanceFee,
      config.isPublic,
    ],
    account,
  })

  const receipt = await publicClient.waitForTransactionReceipt({ hash })

  if (receipt.status !== 'success') {
    throw new Error('Failed to deploy vault')
  }

  const vaultAddress = receipt.logs[0]?.address || ('0x0000000000000000000000000000000000000000' as Address)

  return {
    vaultAddress,
    transactionHash: hash,
  }
}

export function formatAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export const shortenAddress = formatAddress

export function getExplorerUrl(chainName: SupportedChain, typeOrHash: 'tx' | 'address' | string, hash?: string): string {
  const chain = SUPPORTED_CHAINS[chainName]
  const explorerUrl = chain.blockExplorers?.default.url || 'https://etherscan.io'
  
  if (hash) {
    return `${explorerUrl}/${typeOrHash}/${hash}`
  }
  
  return `${explorerUrl}/tx/${typeOrHash}`
}

export const checkWalletConnection = getWalletInfo

export async function deployVaultOnChain(
  vault: VaultConfig,
  chainName: SupportedChain,
  initialDeposit?: string
): Promise<{ vaultAddress: Address; transactionHash: Hash }> {
  const walletInfo = await getWalletInfo()
  if (!walletInfo) {
    throw new Error('Wallet not connected')
  }
  
  return deployVault(vault, chainName, walletInfo.address)
}
