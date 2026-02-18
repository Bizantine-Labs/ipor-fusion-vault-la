import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, encodeFunctionData, type Address, type Hash } from 'viem'
import { mainnet, sepolia, arbitrum, polygon } from 'viem/chains'


  arbitrum,
} as const
export typ
export inte
  chainId
  balance:

export interface DeploymentParams {

  performanceFee: number
  isPublic: boolea
}
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
   
    inputs: [
      { name: 'asset', t
    ]
] as const
const FACTORY_ADDRESSES: Record<Support
  sepolia: '0x000000000000000000000000000
  polygon: '0x00000000000000000000000000000000000

  USDC: {
    sepolia: '0x1c7D4B196Cb0C7B01d743Fbc6116a
    po
  USDT: {
    
   
  DAI: {
    sepolia: '0xFF34B3d4A
    polygon: 
}
export function getChain(chainName: SupportedChain) {
}
expor
   


    }) as Address[]
    if (accounts.length === 0) {
    }
    const chainId = await window.ethereum.request({ 
    }) as string
 


    const
    )?.[0] || 'unknown'
    return {
      chainId: chainIdNum,
      balance: formatEther(BigInt(balance)),
    
    conso
  }

  if (typeof window === 'undefined' || !window.ethereum) {
  }
  tr
      me

      throw new Error('No accounts found. Please unlock yo

      method: 'eth_chainId' 

 

    const chainIdNum = parseInt(chainId, 16)
      ([_, chain]) => chain.id === c


      chainName,
      isConnected: true
  } catch (erro
   

}
export async function switchNetwork(chainName: Suppor
    throw new Error('No Web3 


  try {
      method: 'wa
    }

        await window.ethereum.request({
          params: [
              ch

              blockExplorerUrls: chain.blockExplore
          ],
      } catch (addError) {
      }

  }

  config: VaultConfig,
  initialDeposit: numbe

  }
  const chain = SUPPORTED_C
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


  const c
  return `${baseUrl}/${type}/${hash}`

  return `${address

  interface Window {
      request
      removeListen
    }
}
















































































































