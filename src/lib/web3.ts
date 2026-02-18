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
  name: string
  asset: string
  managementFee: number
  performanceFee: number
  strategies: Array<{ strategyId: string; allocation: number }>
  isPublic: boolean
  initialDeposit: bigint
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
      { name: 'strategies', type: 'bytes[]' }
    ],
    outputs: [{ name: 'vault', type: 'address' }]
  },
  {
    type: 'event',
    name: 'VaultCreated',
    inputs: [
      { name: 'vault', type: 'address', indexed: true },
      { name: 'asset', type: 'address', indexed: true },
      { name: 'creator', type: 'address', indexed: true }
    ]
  }
] as const

const FACTORY_ADDRESSES: Record<SupportedChain, Address> = {
  mainnet: '0x0000000000000000000000000000000000000000',
  sepolia: '0x0000000000000000000000000000000000000000', 
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
    return null
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

    if (accounts.length === 0) {
      throw new Error('No accounts found. Please unlock your wallet.')
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
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('Connection request rejected. Please approve the connection in your wallet.')
    }
    throw new Error(error.message || 'Failed to connect wallet')
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
      params: [{ chainId: chainIdHex }],
    })
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdHex,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: [chain.rpcUrls.default.http[0]],
              blockExplorerUrls: chain.blockExplorers?.default ? [chain.blockExplorers.default.url] : undefined,
            },
          ],
        })
      } catch (addError) {
        throw new Error('Failed to add network to wallet')
      }
    } else {
      throw new Error(error.message || 'Failed to switch network')
    }
  }
}

export async function deployVaultOnChain(
  config: VaultConfig,
  chainName: SupportedChain,
  initialDeposit: number = 0
): Promise<{ vaultAddress: Address; transactionHash: Hash }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]
  const walletClient = createWalletClient({
    chain,
    transport: custom(window.ethereum)
  })

  const publicClient = createPublicClient({
    chain,
    transport: http()
  })

  const [account] = await walletClient.getAddresses()
  
  if (!account) {
    throw new Error('No account connected')
  }

  const assetAddress = ASSET_ADDRESSES[config.asset]?.[chainName]
  if (!assetAddress) {
    throw new Error(`Asset ${config.asset} not supported on ${chainName}`)
  }

  const factoryAddress = FACTORY_ADDRESSES[chainName]

  const managementFeeBps = Math.floor(config.managementFee * 10000)
  const performanceFeeBps = Math.floor(config.performanceFee * 10000)

  const strategiesData = config.strategies.map(s => 
    encodeFunctionData({
      abi: [{
        type: 'function',
        name: 'encodeStrategy',
        inputs: [
          { name: 'strategyId', type: 'bytes32' },
          { name: 'allocation', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bytes' }]
      }],
      functionName: 'encodeStrategy',
      args: [s.strategyId as `0x${string}`, BigInt(Math.floor(s.allocation * 10000))]
    })
  )

  const hash = await walletClient.writeContract({
    address: factoryAddress,
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
    account
  })

  const receipt = await publicClient.waitForTransactionReceipt({ hash })

  const vaultCreatedLog = receipt.logs.find(log => {
    try {
      const decoded = publicClient.parseEventLogs({
        abi: IPOR_FUSION_FACTORY_ABI,
        logs: [log]
      })
      return decoded[0]?.eventName === 'VaultCreated'
    } catch {
      return false
    }
  })

  let vaultAddress: Address

  if (vaultCreatedLog && vaultCreatedLog.topics[1]) {
    vaultAddress = `0x${vaultCreatedLog.topics[1].slice(-40)}` as Address
  } else {
    throw new Error('Failed to retrieve vault address from transaction')
  }

  return {
    vaultAddress,
    transactionHash: hash
  }
}

export async function estimateDeploymentGas(
  config: VaultConfig,
  chainName: SupportedChain
): Promise<{ gasLimit: bigint; gasCost: bigint; gasCostEth: string }> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet detected')
  }

  const chain = SUPPORTED_CHAINS[chainName]
  const publicClient = createPublicClient({
    chain,
    transport: http()
  })

  const walletClient = createWalletClient({
    chain,
    transport: custom(window.ethereum)
  })

  const [account] = await walletClient.getAddresses()
  
  if (!account) {
    throw new Error('No account connected')
  }

  const assetAddress = ASSET_ADDRESSES[config.asset]?.[chainName]
  if (!assetAddress) {
    throw new Error(`Asset ${config.asset} not supported on ${chainName}`)
  }

  const factoryAddress = FACTORY_ADDRESSES[chainName]

  const managementFeeBps = Math.floor(config.managementFee * 10000)
  const performanceFeeBps = Math.floor(config.performanceFee * 10000)

  const strategiesData = config.strategies.map(s => 
    encodeFunctionData({
      abi: [{
        type: 'function',
        name: 'encodeStrategy',
        inputs: [
          { name: 'strategyId', type: 'bytes32' },
          { name: 'allocation', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bytes' }]
      }],
      functionName: 'encodeStrategy',
      args: [s.strategyId as `0x${string}`, BigInt(Math.floor(s.allocation * 10000))]
    })
  )

  const gasLimit = await publicClient.estimateContractGas({
    address: factoryAddress,
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
    account
  })

  const gasPrice = await publicClient.getGasPrice()
  const gasCost = gasLimit * gasPrice
  const gasCostEth = formatEther(gasCost)

  return {
    gasLimit,
    gasCost,
    gasCostEth
  }
}

export function getBlockExplorerUrl(chainName: SupportedChain, type: 'tx' | 'address', hash: string): string {
  const chain = SUPPORTED_CHAINS[chainName]
  const baseUrl = chain.blockExplorers?.default?.url || 'https://etherscan.io'
  return `${baseUrl}/${type}/${hash}`
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on?: (event: string, callback: (...args: any[]) => void) => void
      removeListener?: (event: string, callback: (...args: any[]) => void) => void
      isMetaMask?: boolean
    }
  }
}
