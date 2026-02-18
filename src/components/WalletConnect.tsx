import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
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
import { Wallet, Copy, SignOut, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface WalletInfo {
  address: string
  chainId: number
  balance: string
}

function generateMockAddress(): string {
  const chars = '0123456789abcdef'
  let address = '0x'
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)]
  }
  return address
}

export function WalletConnect() {
  const [wallet, setWallet] = useKV<WalletInfo | null>('connected-wallet', null)
  const [connecting, setConnecting] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const mockWallet: WalletInfo = {
      address: generateMockAddress(),
      chainId: 1,
      balance: (Math.random() * 5 + 0.5).toFixed(4),
    }
    
    setWallet(mockWallet)
    toast.success('Wallet connected', {
      description: `Connected to ${mockWallet.address.slice(0, 6)}...${mockWallet.address.slice(-4)}`
    })
    
    setConnecting(false)
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
    setWallet((current) => null)
    toast.info('Wallet disconnected')
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!wallet) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        variant="outline"
        className="gap-2 border-primary/30 hover:bg-primary/10"
      >
        <Wallet size={18} weight="duotone" />
        <span className="hidden sm:inline">{connecting ? 'Connecting...' : 'Connect Wallet'}</span>
        <span className="sm:hidden">{connecting ? 'Connecting...' : 'Connect'}</span>
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
          <span className="font-mono text-sm">{shortenAddress(wallet.address)}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs">{shortenAddress(wallet.address)}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleCopyAddress}
              >
                {copied ? (
                  <CheckCircle className="text-accent" size={14} weight="fill" />
                ) : (
                  <Copy size={14} />
                )}
              </Button>
            </div>
            <div className="px-2 py-1.5 bg-muted rounded-md">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-mono font-medium">{wallet.balance} ETH</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-muted-foreground">Network</span>
                <Badge variant="outline" className="text-xs h-5">
                  {wallet.chainId === 1 ? 'Mainnet' : 
                   wallet.chainId === 11155111 ? 'Sepolia' : 
                   wallet.chainId === 42161 ? 'Arbitrum' :
                   wallet.chainId === 10 ? 'Optimism' :
                   `Chain ${wallet.chainId}`}
                </Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDisconnect}>
          <SignOut size={16} className="mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
