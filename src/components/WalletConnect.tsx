import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Wallet, Copy, SignOut, CheckCircle, Warning } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void
      isMetaMask?: boolean
    }
  }
}

interface WalletInfo {
  address: string
  chainId: number
  balance: string
}

function getNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: 'Ethereum',
    10: 'Optimism',
    42161: 'Arbitrum',
    8453: 'Base',
    11155111: 'Sepolia',
  }
  return networks[chainId] ?? `Chain ${chainId}`
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  // Listen for account / chain changes
  useEffect(() => {
    const ethereum = window.ethereum
    if (!ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        setWallet(null)
        toast.info('Wallet disconnected')
      } else if (wallet) {
        setWallet(prev => prev ? { ...prev, address: accs[0] } : null)
      }
    }

    const handleChainChanged = (chainIdHex: unknown) => {
      const chainId = parseInt(chainIdHex as string, 16)
      setWallet(prev => prev ? { ...prev, chainId } : null)
      toast.info(`Switched to ${getNetworkName(chainId)}`)
    }

    ethereum.on('accountsChanged', handleAccountsChanged)
    ethereum.on('chainChanged', handleChainChanged)

    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged)
      ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [wallet])

  const handleConnect = async () => {
    if (!window.ethereum) {
      toast.error('No wallet detected', {
        description: 'Please install MetaMask or another Web3 wallet to continue.',
      })
      return
    }

    setConnecting(true)
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[]

      const chainIdHex = await window.ethereum.request({
        method: 'eth_chainId',
      }) as string
      const chainId = parseInt(chainIdHex, 16)

      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }) as string
      const balanceWei = parseInt(balanceHex, 16)
      const balanceEth = (balanceWei / 1e18).toFixed(4)

      const walletInfo: WalletInfo = {
        address: accounts[0],
        chainId,
        balance: balanceEth,
      }

      setWallet(walletInfo)
      toast.success('Wallet connected', {
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (err: unknown) {
      const error = err as { code?: number; message?: string }
      if (error.code === 4001) {
        toast.error('Connection rejected', {
          description: 'You rejected the wallet connection request.',
        })
      } else {
        toast.error('Connection failed', {
          description: error.message ?? 'Something went wrong.',
        })
      }
    } finally {
      setConnecting(false)
    }
  }

  const handleCopyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      toast.success('Address copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDisconnect = () => {
    setWallet(null)
    toast.info('Wallet disconnected')
  }

  const shortenAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

  if (!wallet) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button
          onClick={handleConnect}
          disabled={connecting}
          variant="outline"
          className="border-primary/30 hover:bg-primary/10 gap-2"
        >
          <Wallet size={18} weight="duotone" />
          <span className="hidden sm:inline">
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </span>
          <span className="sm:hidden">
            {connecting ? 'Connecting...' : 'Connect'}
          </span>
        </Button>
      </motion.div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-primary/30 hover:bg-primary/10 gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="hidden sm:inline font-mono text-xs">
            {shortenAddress(wallet.address)}
          </span>
          <span className="sm:hidden">Wallet</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Connected wallet</p>
            <p className="font-mono text-sm font-medium">
              {shortenAddress(wallet.address)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress} className="gap-2 cursor-pointer">
          {copied ? (
            <CheckCircle size={16} className="text-green-500" weight="duotone" />
          ) : (
            <Copy size={16} weight="duotone" />
          )}
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Balance</span>
            <span className="font-mono">{wallet.balance} ETH</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Network</span>
            <Badge variant="outline" className="text-xs px-1 py-0">
              {getNetworkName(wallet.chainId)}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDisconnect}
          className="gap-2 cursor-pointer text-destructive focus:text-destructive"
        >
          <SignOut size={16} weight="duotone" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
