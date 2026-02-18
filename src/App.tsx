import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Plus, Vault as VaultIcon, ChartLine, Wallet, Robot } from '@phosphor-icons/react'
import { VaultCard } from '@/components/VaultCard'
import { CreateVaultDialog } from '@/components/CreateVaultDialog'
import { DeployVaultDialog } from '@/components/DeployVaultDialog'
import { AlphaBot } from '@/components/AlphaBot'
import { IPORInfo } from '@/components/IPORInfo'
import { DeveloperTools } from '@/components/DeveloperTools'
import { WalletConnect } from '@/components/WalletConnect'
import { VaultConfig, Vault } from '@/lib/types'
import { calculateVaultRisk, calculateExpectedAPY } from '@/lib/strategies'
import { Toaster } from '@/components/ui/sonner'
import { motion } from 'framer-motion'

function App() {
  const [vaults, setVaults] = useKV<Vault[]>('ipor-vaults', [])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [deployVault, setDeployVault] = useState<Vault | null>(null)
  const [alphaBotOpen, setAlphaBotOpen] = useState(false)

  const vaultsList = vaults || []

  const handleVaultCreate = (config: VaultConfig) => {
    const newVault: Vault = {
      ...config,
      id: `vault-${Date.now()}`,
      tvl: Math.random() * 10000000 + 1000000,
      apy: calculateExpectedAPY(config.strategies),
      createdAt: Date.now(),
      performance24h: (Math.random() - 0.5) * 5,
      riskScore: calculateVaultRisk(config.strategies),
      deploymentStatus: 'mock'
    }

    setVaults((currentVaults) => [...(currentVaults || []), newVault])
  }

  const handleDeploySuccess = (vaultId: string, vaultAddress: string, txHash: string, network: string) => {
    setVaults((currentVaults) => 
      (currentVaults || []).map(v => 
        v.id === vaultId 
          ? { ...v, deploymentStatus: 'deployed' as const, vaultAddress, transactionHash: txHash, network }
          : v
      )
    )
    setDeployVault(null)
  }

  const totalTVL = vaultsList.reduce((sum, v) => sum + v.tvl, 0)
  const averageAPY = vaultsList.length > 0 
    ? vaultsList.reduce((sum, v) => sum + v.apy, 0) / vaultsList.length 
    : 0

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              oklch(0.45 0.12 210 / 0.03) 2px,
              oklch(0.45 0.12 210 / 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              oklch(0.45 0.12 210 / 0.03) 2px,
              oklch(0.45 0.12 210 / 0.03) 4px
            )
          `
        }}
      />

      <div className="relative">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <VaultIcon className="text-primary" size={28} weight="duotone" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">IPOR Fusion</h1>
                  <p className="text-sm text-muted-foreground">Vault Management Platform</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DeveloperTools />
                <IPORInfo />
                <WalletConnect />
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(69, 133, 162, 0)",
                      "0 0 0 8px rgba(69, 133, 162, 0)",
                    ]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <Button 
                    onClick={() => setAlphaBotOpen(true)}
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <Robot size={20} weight="duotone" />
                    </motion.div>
                    <span className="hidden sm:inline">Ask Alpha Bot</span>
                    <span className="sm:hidden">Alpha Bot</span>
                  </Button>
                </motion.div>
                <Button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                >
                  <Plus size={20} weight="bold" />
                  <span className="hidden sm:inline">Create Vault</span>
                  <span className="sm:hidden">Create</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          {vaultsList.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg flex-shrink-0">
                  <Robot className="text-primary-foreground" size={24} weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">Meet Alpha Bot - Your IPOR Strategy Expert</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Get AI-powered recommendations for IPOR interest rate swaps, optimal vault configurations, and multi-strategy yield optimization. Ask about rate hedging, risk analysis, or the best DeFi protocols to combine.
                  </p>
                  <Button
                    onClick={() => setAlphaBotOpen(true)}
                    size="sm"
                    variant="outline"
                    className="mt-3 border-primary/30 hover:bg-primary/10"
                  >
                    Try Alpha Bot
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <ChartLine className="text-primary" size={24} />
                <h3 className="text-sm font-medium text-muted-foreground">Total Value Locked</h3>
              </div>
              <p className="text-3xl font-mono font-bold">
                ${(totalTVL / 1000000).toFixed(2)}M
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <VaultIcon className="text-accent" size={24} />
                <h3 className="text-sm font-medium text-muted-foreground">Active Vaults</h3>
              </div>
              <p className="text-3xl font-mono font-bold">{vaultsList.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="text-accent" size={24} />
                <h3 className="text-sm font-medium text-muted-foreground">Average APY</h3>
              </div>
              <p className="text-3xl font-mono font-bold text-accent">
                {averageAPY.toFixed(2)}%
              </p>
            </motion.div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Your Vaults</h2>
            <p className="text-muted-foreground">
              Manage and monitor your deployed vaults
            </p>
          </div>

          {vaultsList.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center"
            >
              <VaultIcon className="mx-auto text-muted-foreground mb-4" size={64} weight="duotone" />
              <h3 className="text-xl font-semibold mb-2">No vaults yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first IPOR Fusion vault to start generating yield with advanced strategies, or ask Alpha Bot for personalized recommendations
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => setCreateDialogOpen(true)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                >
                  <Plus size={20} weight="bold" />
                  Create Your First Vault
                </Button>
                <Button 
                  onClick={() => setAlphaBotOpen(true)}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 gap-2"
                >
                  <Robot size={20} weight="duotone" />
                  Get AI Recommendations
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultsList.map((vault, index) => (
                <motion.div
                  key={vault.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <VaultCard 
                    vault={vault} 
                    onClick={() => setSelectedVault(vault)}
                    onDeploy={vault.deploymentStatus === 'mock' ? () => setDeployVault(vault) : undefined}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>

        <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/20 rounded">
                  <VaultIcon className="text-primary" size={20} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm font-semibold">IPOR Fusion</p>
                  <p className="text-xs text-muted-foreground">Advanced DeFi Vault Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <a 
                  href="https://docs.ipor.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Documentation
                </a>
                <a 
                  href="https://github.com/IPOR-Labs/ipor-fusion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://app.ipor.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  IPOR App
                </a>
              </div>
            </div>
          </div>
        </footer>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="fixed bottom-6 right-6 md:hidden z-40"
        >
          <Button
            onClick={() => setAlphaBotOpen(true)}
            size="lg"
            className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-transform"
          >
            <Robot size={28} weight="duotone" className="text-primary-foreground" />
          </Button>
        </motion.div>
      </div>

      <CreateVaultDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onVaultCreate={handleVaultCreate}
      />

      {deployVault && (
        <DeployVaultDialog
          open={!!deployVault}
          onOpenChange={(open) => !open && setDeployVault(null)}
          vault={deployVault}
          onDeploySuccess={(vaultAddress, txHash, network) => 
            handleDeploySuccess(deployVault.id, vaultAddress, txHash, network)
          }
        />
      )}

      <AlphaBot
        isOpen={alphaBotOpen}
        onClose={() => setAlphaBotOpen(false)}
        vaults={vaultsList}
      />

      <Toaster />
    </div>
  )
}

export default App