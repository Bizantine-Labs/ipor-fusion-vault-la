import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code, Terminal, Package, BookOpen, Copy, CheckCircle, GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeveloperTools() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(label)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    installation: 'pip install ipor-fusion',
    
    basicSetup: `from ipor_fusion import IporFusionSDK
from ipor_fusion.PlasmaVault import PlasmaVault

sdk = IporFusionSDK(
    network="mainnet",
    private_key="your_private_key"
)

vault = PlasmaVault(sdk, vault_address="0x...")`,

    createVault: `from ipor_fusion import IporFusionSDK
from ipor_fusion.strategies import AaveV3Strategy, IPORSwapStrategy

sdk = IporFusionSDK(network="mainnet")

vault_config = {
    "name": "My DeFi Vault",
    "asset": "USDC",
    "strategies": [
        AaveV3Strategy(allocation=0.6),
        IPORSwapStrategy(
            allocation=0.4,
            swap_type="pay_fixed",
            notional=100000
        )
    ]
}

vault = sdk.create_vault(vault_config)
print(f"Vault created: {'{'}vault.address{'}'}")`,

    manageStrategies: `vault = sdk.get_vault("0xVaultAddress...")

vault.add_strategy(
    IPORSwapStrategy(
        allocation=0.3,
        swap_type="receive_fixed",
        notional=50000
    )
)

vault.rebalance()

performance = vault.get_performance()
print(f"APY: {'{'}performance.apy{'}'}%")
print(f"TVL: ${'{'}performance.tvl:,.2f{'}'}")`,

    monitorVault: `vault = sdk.get_vault("0xVaultAddress...")

metrics = vault.get_metrics()
print(f"Total Value Locked: ${'{'}metrics.tvl:,.2f{'}'}")
print(f"Current APY: {'{'}metrics.apy{'}'}%")
print(f"Risk Score: {'{'}metrics.risk_score{'}'}/5")

transactions = vault.get_transaction_history(limit=10)
for tx in transactions:
    print(f"{'{'}tx.type{'}'}: {'{'}tx.amount{'}'} {'{'}tx.asset{'}'}")
    
positions = vault.get_positions()
for position in positions:
    print(f"{'{'}position.protocol{'}'}: {'{'}position.allocation{'}'}%")`,

    iporSwaps: `from ipor_fusion.strategies import IPORSwapStrategy

pay_fixed = IPORSwapStrategy(
    allocation=0.4,
    swap_type="pay_fixed",
    asset="USDC",
    notional=100000,
    maturity_days=90
)

receive_fixed = IPORSwapStrategy(
    allocation=0.3,
    swap_type="receive_fixed",
    asset="USDT",
    notional=75000,
    maturity_days=180
)

vault.add_strategy(pay_fixed)
vault.add_strategy(receive_fixed)

swap_positions = vault.get_ipor_positions()
for swap in swap_positions:
    print(f"Swap: {'{'}swap.type{'}'} | Rate: {'{'}swap.fixed_rate{'}'}%")`,

    advancedStrategy: `from ipor_fusion.strategies import (
    AaveV3Strategy,
    CompoundV3Strategy,
    UniswapV3Strategy,
    IPORSwapStrategy
)

vault = sdk.create_vault({
    "name": "Multi-Strategy Vault",
    "asset": "USDC",
    "management_fee": 0.02,
    "performance_fee": 0.20,
    "strategies": [
        AaveV3Strategy(allocation=0.30),
        CompoundV3Strategy(allocation=0.25),
        UniswapV3Strategy(
            allocation=0.20,
            pool="USDC/ETH",
            fee_tier=0.003
        ),
        IPORSwapStrategy(
            allocation=0.25,
            swap_type="pay_fixed",
            notional=200000
        )
    ]
})

vault.enable_auto_rebalance(
    frequency_hours=24,
    threshold_percent=5
)

print(f"Vault deployed at: {'{'}vault.address{'}'}")
print(f"Expected APY: {'{'}vault.calculate_expected_apy(){'}'}%")`
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-accent/30 hover:bg-accent/10">
          <Code size={18} weight="duotone" />
          <span className="hidden sm:inline">Developer Tools</span>
          <span className="sm:hidden">Dev Tools</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Terminal className="text-accent" size={28} />
            IPOR Fusion Python SDK
          </DialogTitle>
          <DialogDescription>
            Build, deploy, and manage vaults programmatically with the official Python SDK
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quickstart" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="ipor">IPOR Swaps</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="quickstart" className="space-y-4 mt-4">
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Package className="text-accent" size={24} />
                  <CardTitle>Installation</CardTitle>
                </div>
                <CardDescription>
                  Install the IPOR Fusion Python SDK via pip
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code>{codeExamples.installation}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.installation, 'installation')}
                  >
                    {copiedCode === 'installation' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
                <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <Package className="text-primary mt-0.5" size={18} />
                  <div className="text-xs">
                    <p className="font-medium">Requirements</p>
                    <p className="text-muted-foreground">Python 3.8+, web3.py, and an Ethereum RPC endpoint</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="text-primary" size={24} />
                  <CardTitle>Basic Setup</CardTitle>
                </div>
                <CardDescription>
                  Initialize the SDK and connect to a vault
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code>{codeExamples.basicSetup}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.basicSetup, 'basicSetup')}
                  >
                    {copiedCode === 'basicSetup' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="text-accent" size={24} />
                  <CardTitle>Create Your First Vault</CardTitle>
                </div>
                <CardDescription>
                  Deploy a new Fusion vault with multiple strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-80">
                    <code>{codeExamples.createVault}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.createVault, 'createVault')}
                  >
                    {copiedCode === 'createVault' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 mt-4">
            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="text-primary" size={24} />
                  <CardTitle>Managing Strategies</CardTitle>
                </div>
                <CardDescription>
                  Add strategies and rebalance your vault
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-80">
                    <code>{codeExamples.manageStrategies}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.manageStrategies, 'manageStrategies')}
                  >
                    {copiedCode === 'manageStrategies' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="text-accent" size={24} />
                  <CardTitle>Monitoring & Analytics</CardTitle>
                </div>
                <CardDescription>
                  Track vault performance and positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-80">
                    <code>{codeExamples.monitorVault}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.monitorVault, 'monitorVault')}
                  >
                    {copiedCode === 'monitorVault' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="text-primary" size={24} />
                  <CardTitle>Advanced Multi-Strategy Vault</CardTitle>
                </div>
                <CardDescription>
                  Complex vault with auto-rebalancing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-80">
                    <code>{codeExamples.advancedStrategy}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.advancedStrategy, 'advancedStrategy')}
                  >
                    {copiedCode === 'advancedStrategy' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ipor" className="space-y-4 mt-4">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="text-primary" size={24} />
                  <CardTitle>IPOR Interest Rate Swaps</CardTitle>
                </div>
                <CardDescription>
                  Hedge interest rate risk with IPOR derivatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-96">
                    <code>{codeExamples.iporSwaps}</code>
                  </pre>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(codeExamples.iporSwaps, 'iporSwaps')}
                  >
                    {copiedCode === 'iporSwaps' ? (
                      <CheckCircle className="text-accent" size={18} weight="fill" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                    <p className="font-medium text-sm mb-1">Pay Fixed Swap</p>
                    <p className="text-xs text-muted-foreground">
                      Lock in borrowing costs. Benefits from rising rates. Protects against rate increases.
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="font-medium text-sm mb-1">Receive Fixed Swap</p>
                    <p className="text-xs text-muted-foreground">
                      Guarantee yield income. Protected from rate drops. Stable returns regardless of volatility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="text-base">Key Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium">swap_type</p>
                    <p className="text-xs text-muted-foreground">"pay_fixed" or "receive_fixed"</p>
                  </div>
                  <div>
                    <p className="font-medium">asset</p>
                    <p className="text-xs text-muted-foreground">USDC, USDT, or DAI</p>
                  </div>
                  <div>
                    <p className="font-medium">notional</p>
                    <p className="text-xs text-muted-foreground">Swap size in asset units</p>
                  </div>
                  <div>
                    <p className="font-medium">maturity_days</p>
                    <p className="text-xs text-muted-foreground">Duration: 30, 60, 90, 180, 365</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary/30 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GithubLogo className="text-primary" size={24} />
                    <CardTitle className="text-base">GitHub Repository</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Access the open-source Python SDK, view examples, and contribute to development
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-primary/30 hover:bg-primary/10 gap-2"
                  >
                    <a 
                      href="https://github.com/IPOR-Labs/ipor-fusion.py" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                      <ArrowSquareOut size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/30 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-accent" size={24} />
                    <CardTitle className="text-base">Documentation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Complete API reference, guides, and tutorials for building with IPOR Fusion
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-accent/30 hover:bg-accent/10 gap-2"
                  >
                    <a 
                      href="https://docs.ipor.io/build-on-fusion/developer-guide/open-source-repository" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read Docs
                      <ArrowSquareOut size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/30 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="text-primary" size={24} />
                    <CardTitle className="text-base">Developer Guide</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guides for building vaults and integrating with IPOR protocols
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-primary/30 hover:bg-primary/10 gap-2"
                  >
                    <a 
                      href="https://docs.ipor.io/build-on-fusion/developer-guide" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Developer Guide
                      <ArrowSquareOut size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-accent/30 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Terminal className="text-accent" size={24} />
                    <CardTitle className="text-base">Fusion Overview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Learn about IPOR Fusion architecture, capabilities, and use cases
                  </p>
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-accent/30 hover:bg-accent/10 gap-2"
                  >
                    <a 
                      href="https://docs.ipor.io/build-on-fusion" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Learn More
                      <ArrowSquareOut size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-base">SDK Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">Vault Management</p>
                      <p className="text-xs text-muted-foreground">Create, configure, and monitor vaults</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">Strategy Integration</p>
                      <p className="text-xs text-muted-foreground">Connect to 20+ DeFi protocols</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">IPOR Swaps</p>
                      <p className="text-xs text-muted-foreground">Interest rate derivatives integration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-xs text-muted-foreground">Performance tracking and reporting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">Auto-Rebalancing</p>
                      <p className="text-xs text-muted-foreground">Automated strategy optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5 bg-accent">✓</Badge>
                    <div>
                      <p className="font-medium">Type Safety</p>
                      <p className="text-xs text-muted-foreground">Full Python type hints support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            SDK Version 1.0.0 | Python 3.8+
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              Open Source
            </Badge>
            <Badge variant="outline" className="text-xs bg-accent/10 border-accent/30">
              MIT License
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
