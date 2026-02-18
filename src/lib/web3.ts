import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther, encodeFunctionData, type Address, type Hash } from 'viem'
import { mainnet, sepolia, arbitrum, polygon } from 'viem/chains'


export const SUPPORTED_CHAINS = {
  mainnet,
  sepolia,
  arbitrum,
export ty
export int

  balance: string

export interface DeploymentPa
  chainName: Suppo
}
const IPOR_FUSION_F
    type: 'functi
    stateMutability: '
 

      { name: 'isPublic', type: 'bo
    ],
  }

 

}
con
    mainnet: '0xA0b86
    arbitrum: '0xaf88d06
  },
    mainnet: 
    arbitrum: '0xFd086bC7CD5C481DCC9C85
  },
    mainnet: '0x6B175474E89094C44Da98b954EedeAC49
    arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c
  }

  retu

  i
  }

      method: 'eth_accounts' 

      return null

      method: 'eth_chainId' 


    }) as string
    const
      ([_, chain]) => chain.id === chainIdNum

      address: accounts[0],
      chainName,
    
  } catch
    return null
}
export async function connectWallet(): Promise<WalletInfo> 
    throw new Error('No Web3 wallet detected. Please inst

    cons
    }) as Address[]
    const chainId = await window.ethereum.request({ 
    }) as string
    const balance = await window.ethereum.request({
   


    )?.[0] || 'unknown'
    return {
 

    }
    console.error('Error connecting wallet:', error)
  }


  }
  const chain = SUPPORTED_CHAINS[chainName]

    await window.et

  } catch (error: any) {
      await windo
     

          rpcUrls: [chain.rpcUrls.default.http[0]],
        }]
    } else {

}
export async function deployVau
  chainName: SupportedChain,
): Promise<{ vau


  
    chain,
    transport: custom(w

    chain,
  })
  const assetAddress = ASS
    throw new Er

    throw new Error('No

  const performance
  const strategiesData = encodeFunctionData({
      {
   
 

    args: [config.strategies.map(s => s.strategyId)]

    address: FACTORY_ADDRESSES[chainName],
   

      B
      config.isPublic,
    ],



    throw new Error('Failed 


  }

  config: VaultConfig,
  account: Addre


  chainName: SupportedChain,
  hash: string
  const chain = SUPPORT


  return `${address.slice(0

  interface Wind
      request: (args: { method: string; para
      removeListener: (
  }








































































































