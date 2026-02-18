import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Vault } from '@/lib/types'
import { 
  checkWalletConnection, 
  connectWallet, 
  switchNetwork, 
  deployVaultOnChain, 
  getBlockExplorerUrl, 
  shortenAddress,
  type SupportedChain 
} from '@/lib/web3'
import { CheckCircle, Warning, Rocket, Wallet as WalletIcon, Link as LinkIcon, Spinner } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface DeployVaultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vault: Vault
  onDeploySuccess: (vaultAddress: string, txHash: string, network: string) => void
}

export function DeployVaultDialog({ open, onOpenChange, vault, onDeploySuccess }: DeployVaultDialogProps) {
  const [network, setNetwork] = useState<SupportedChain>('sepolia')
  const [initialDeposit, setInitialDeposit] = useState('0')
  const [deploying, setDeploying] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [connecting, setConnecting] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<{
    success: boolean
    vaultAddress?: string
    transactionHash?: string
    error?: string
  } | null>(null)
  const [gasEstimate, setGasEstimate] = useState<{ gasLimit: string; estimatedCost: string } | null>(null)

  useEffect(() => {
    if (open) {
      checkWalletConnection().then(info => {
        if (info) {
          setWalletConnected(true)
          setWalletAddress(info.address)
        } else {
          setWalletConnected(false)
        }
      })
    }
  }, [open])

  const handleConnectWallet = async () => {
    setConnecting(true)
    try {
      const walletInfo = await connectWallet()
      setWalletConnected(true)
      setWalletAddress(walletInfo.address)
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

  const handleDeploy = async () => {
    if (!walletConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    setDeploying(true)
    setDeploymentResult(null)

    try {
      const walletInfo = await checkWalletConnection()
      if (!walletInfo) {
        throw new Error('Wallet not connected')
      }

      if (walletInfo.chainName !== network) {
        toast.info(`Switching to ${network}...`)
        await switchNetwork(network)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      toast.info('Deploying vault to blockchain...', {
        description: 'Please confirm the transaction in your wallet'
      })

      const result = await deployVaultOnChain(
        vault, 
        network, 
        parseFloat(initialDeposit) || 0
      )

      setDeploymentResult({
        success: true,
        vaultAddress: result.vaultAddress,
        transactionHash: result.transactionHash
      })

      toast.success('Vault deployed successfully!', {
        description: `Address: ${shortenAddress(result.vaultAddress)}`
      })
      
      onDeploySuccess(result.vaultAddress, result.transactionHash, network)
    } catch (error: any) {
      const errorMessage = error.message || 'Deployment failed'
      setDeploymentResult({
        success: false,
        error: errorMessage
      })
      toast.error('Deployment failed', {
        description: errorMessage
      })
    } finally {
      setDeploying(false)
    }
  }

  const resetDialog = () => {
    setDeploymentResult(null)
    setGasEstimate(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={resetDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Rocket size={28} weight="duotone" className="text-accent" />
            Deploy Vault to Blockchain
          </DialogTitle>
          <DialogDescription>
            Deploy {vault.name} to the IPOR Fusion protocol
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {!walletConnected && (
            <Alert className="border-accent/30 bg-accent/5">
              <WalletIcon size={20} className="text-accent" />
              <AlertDescription className="flex items-center justify-between gap-4">
                <span className="text-sm">
                  Connect your Web3 wallet to deploy vaults on-chain
                </span>
                <Button 
                  onClick={handleConnectWallet} 
                  disabled={connecting}
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {walletConnected && (
            <Alert className="border-accent/30 bg-accent/5">
              <CheckCircle size={20} className="text-accent" weight="fill" />
              <AlertDescription className="text-sm">
                <strong>Wallet Connected:</strong> {shortenAddress(walletAddress)}
              </AlertDescription>
            </Alert>
          )}

          <Alert className="border-primary/30 bg-primary/5">
            <Warning size={20} className="text-primary" />
            <AlertDescription className="text-sm">
              <strong>Note:</strong> This will deploy a real smart contract to the blockchain. Make sure you have sufficient funds for gas fees. For testnets, use faucets to obtain test tokens.
            </AlertDescription>
          </Alert>

          <AnimatePresence mode="wait">
            {!deploymentResult ? (
              <motion.div
                key="deployment-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="border border-border rounded-lg p-4 bg-card/50 space-y-3">
                  <h3 className="font-semibold text-sm">Vault Configuration</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{vault.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Asset:</span>
                      <p className="font-medium">{vault.asset}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strategies:</span>
                      <p className="font-medium">{vault.strategies.length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected APY:</span>
                      <p className="font-medium text-accent">{vault.apy.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="network">Target Network</Label>
                  <Select value={network} onValueChange={(value: any) => setNetwork(value)}>
                    <SelectTrigger id="network">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mainnet">
                        <div className="flex items-center gap-2">
                          <span>Ethereum Mainnet</span>
                          <Badge variant="outline" className="text-xs">Production</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="sepolia">
                        <div className="flex items-center gap-2">
                          <span>Sepolia Testnet</span>
                          <Badge variant="secondary" className="text-xs">Recommended</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="arbitrum">Arbitrum One</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Select the blockchain network for deployment
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="initial-deposit">Initial Deposit (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="initial-deposit"
                      type="number"
                      min="0"
                      step="0.01"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      placeholder="0.00"
                    />
                    <div className="flex items-center px-3 border border-border rounded-lg bg-muted">
                      <span className="text-sm font-mono font-medium">{vault.asset}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Optionally deposit initial capital during vault creation
                  </p>
                </div>

                {gasEstimate && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-accent/30 bg-accent/5 rounded-lg p-4 space-y-2"
                  >
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" />
                      Gas Estimate
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Gas Limit:</span>
                        <p className="font-mono font-medium">{gasEstimate.gasLimit}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estimated Cost:</span>
                        <p className="font-mono font-medium">{gasEstimate.estimatedCost} ETH</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleDeploy}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    disabled={deploying || !walletConnected}
                  >
                    {deploying ? (
                      <>
                        <Spinner size={20} className="animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Rocket size={20} weight="bold" />
                        Deploy Vault
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="deployment-result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {deploymentResult.success ? (
                  <>
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center"
                      >
                        <CheckCircle size={40} weight="fill" className="text-accent" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-1">Vault Deployed Successfully!</h3>
                        <p className="text-sm text-muted-foreground">
                          Your vault has been deployed to {network}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div>
                          <Label className="text-xs text-muted-foreground">Vault Address</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded">
                              {deploymentResult.vaultAddress}
                            </code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText(deploymentResult.vaultAddress!)
                                toast.success('Address copied to clipboard')
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-muted-foreground">Transaction Hash</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="flex-1 text-sm font-mono bg-muted px-3 py-2 rounded truncate">
                              {deploymentResult.transactionHash}
                            </code>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const url = getBlockExplorerUrl(network, 'tx', deploymentResult.transactionHash!)
                                window.open(url, '_blank')
                              }}
                            >
                              <LinkIcon size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Alert className="border-accent/30 bg-accent/5">
                        <CheckCircle size={18} className="text-accent" />
                        <AlertDescription className="text-sm">
                          Your vault is now live on {network}. You can start accepting deposits and the strategies will begin generating yield automatically.
                        </AlertDescription>
                      </Alert>
                    </div>

                    <Button onClick={resetDialog} className="w-full">
                      Close
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                        <Warning size={40} weight="fill" className="text-destructive" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-1">Deployment Failed</h3>
                        <p className="text-sm text-muted-foreground">
                          {deploymentResult.error || 'An unknown error occurred'}
                        </p>
                      </div>
                    </div>

                    <Alert className="border-destructive/30 bg-destructive/5">
                      <Warning size={18} className="text-destructive" />
                      <AlertDescription className="text-sm">
                        Please check your wallet connection, network settings, and try again. Make sure you have sufficient funds for gas fees.
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={resetDialog} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={() => setDeploymentResult(null)} className="flex-1">
                        Try Again
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
