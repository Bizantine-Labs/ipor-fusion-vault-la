import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, encodeFunctionData, type Address, type Hash } from 'viem'
import { mainnet, sepolia, arbitrum, polygon } from 'viem/chains'
import { VaultConfig } from './types'

  mainnet,
  arbitrum
} as const
export type
export int
  chainId:

}

  asset: string
  performanceFee: 
  isPublic: boole
}
const IPOR_FUSION
    type: 'function',
 

      { name: 'managementFee', type
      { name: 
    ],
  }

  mainnet: '0x0000000000000000000000000000000000000000',
  arbitrum: '0x0000
}
c

    arbitrum: '0xaf88d065e77c8cC2
  }
    mainnet: '0xdAC17
    arbitrum: '0xFd086bC
  },
    mainnet: 
    arbitrum: '0xDA10009cBd5D07dd0CeCc6
  }

  return SUPPORTED_CHAINS[chainName]

  if (typeof window === 'undefined' || !windo
  }
  try {
   



      method: 'eth_chainId' 

      method: 'eth_getBalance',
    }) as string
 


      add
      chainName,
      isConnected: true
  } catch (error) {
    return null
}
export as
    throw new Error('No Web3 wallet detected. Please insta
    sepolia: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
    arbitrum: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  DAI: {
    mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    sepolia: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
    arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
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
            },
        })

    } else {
    }
}

  chainName: SupportedChain,
): Promise<{ vaultAddress: A
    throw new Er


    chain,
  })
  const publicCl



    throw new Error('No account connected')


  }
  const managementFeeBps = 

    encodeFuncti
        type: 'function',
        inputs: [
     
        outputs: []
      functionName: 'encodeStr
    })

    address: FACTORY_ADDRESSES[chainName],
   
 

      config.isPublic,
    ],
  })
  c

  if (!vaultAddress) {
  }

    tra
}
export function getExplorerUrl(
  type: 'tx' | 'address',
): str
  const baseUrl = chain.
}
export func
}
declare global {
    ethereum?: {
      on: (ev
    }
}




































































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

  const vaultAddress = receipt.logs[0]?.address as Address
  
  if (!vaultAddress) {
    throw new Error('Failed to retrieve vault address from transaction')
  }

  return {
    vaultAddress,
    transactionHash: hash
  }
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

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
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
