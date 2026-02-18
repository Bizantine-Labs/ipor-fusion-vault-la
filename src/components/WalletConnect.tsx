import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Wallet, SignOut, Copy, CheckCircle } from '@phosphor-icons/react'
import { connectWallet, checkWalletConnection, shortenAddress, type WalletInfo } from '@/lib/web3'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    checkWalletConnection().then(info => {
      if (info) {
        setWallet(info)
      }
    })

    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWallet(null)
          toast.info('Wallet disconnected')
        } else {
          checkWalletConnection().then(info => {
            setWallet(info)
            toast.success('Wallet connected', {
              description: `Connected to ${shortenAddress(accounts[0])}`
            })
          })
        }
      }

      const handleChainChanged = () => {
        checkWalletConnection().then(info => setWallet(info))
      }

      window.ethereum?.on('accountsChanged', handleAccountsChanged)
      window.ethereum?.on('chainChanged', handleChainChanged)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  const handleConnect = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      toast.error('No wallet detected', {
        description: 'Please install MetaMask or another Web3 wallet'
      })
      return
    }

    setConnecting(true)
    try {
      const walletInfo = await connectWallet()
      if (!walletInfo) {
        throw new Error('Failed to retrieve wallet information')
      }
      setWallet(walletInfo)
      toast.success('Wallet connected', {
        description: `Connected to ${shortenAddress(walletInfo.address)}`
      })
    } catch (error: any) {
      toast.error('Connection failed', {
        description: error.message || 'Failed to connect wallet'
      })
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

  if (!wallet) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        variant="outline"
        className="gap-2 border-primary/30 hover:bg-primary/10"
      >
        <Wallet size={20} weight="duotone" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 border-accent/30 hover:bg-accent/10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-accent"
          />
          <span className="hidden sm:inline font-mono text-sm">
            {shortenAddress(wallet.address)}
          </span>
          <span className="sm:hidden font-mono text-sm">
            {shortenAddress(wallet.address, 3)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Connected Wallet</p>
            <div className="flex items-center justify-between">
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                {shortenAddress(wallet.address, 6)}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={handleCopyAddress}
              >
                {copied ? (
                  <CheckCircle size={14} className="text-accent" weight="fill" />
                ) : (
                  <Copy size={14} />
                )}
              </Button>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Network</span>
            <Badge variant="outline" className="text-xs capitalize">
              {wallet.chainName}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Balance</span>
            <span className="text-xs font-mono font-medium">
              {parseFloat(wallet.balance).toFixed(4)} ETH
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="gap-2 text-destructive focus:text-destructive">
          <SignOut size={16} />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
