import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Info, ChartLine, ShieldCheck, Lightning, TrendUp, ArrowsClockwise } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

export function IPORInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
          <Info size={18} weight="duotone" />
          About IPOR Fusion
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">IPOR Fusion Protocol</DialogTitle>
          <DialogDescription>
            Build sophisticated yield strategies with interest rate derivatives and multi-protocol integrations
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ChartLine className="text-primary" size={24} />
                  <CardTitle>What is IPOR Fusion?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  IPOR Fusion is a protocol that enables the creation of advanced DeFi vaults combining multiple yield strategies across different protocols. At its core, IPOR provides decentralized interest rate derivatives that allow users to hedge or speculate on rate movements.
                </p>
                <p>
                  <strong>Key Components:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Interest Rate Swaps:</strong> Trade fixed for floating rates (or vice versa) on stablecoins</li>
                  <li><strong>Fusion Vaults:</strong> Combine multiple DeFi strategies in a single vault</li>
                  <li><strong>Rate Oracle:</strong> Real-time decentralized interest rate data</li>
                  <li><strong>Smart Rebalancing:</strong> Automated optimization of strategy allocations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightning className="text-accent" size={24} />
                  <CardTitle>How It Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">1</Badge>
                    <div>
                      <p className="font-medium">Create Your Vault</p>
                      <p className="text-muted-foreground text-xs">Configure parameters, select assets, and define access controls</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">2</Badge>
                    <div>
                      <p className="font-medium">Select Strategies</p>
                      <p className="text-muted-foreground text-xs">Choose from lending, liquidity provision, derivatives, and staking across multiple protocols</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">3</Badge>
                    <div>
                      <p className="font-medium">Allocate Capital</p>
                      <p className="text-muted-foreground text-xs">Set percentage allocations for each strategy with real-time risk assessment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="mt-0.5">4</Badge>
                    <div>
                      <p className="font-medium">Deploy & Monitor</p>
                      <p className="text-muted-foreground text-xs">Launch your vault and track performance with detailed analytics</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ArrowsClockwise className="text-primary" size={20} />
                    <CardTitle className="text-base">Interest Rate Swaps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Trade fixed for floating interest rates on stablecoins like USDC, USDT, and DAI.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Pay Fixed: Lock in borrowing costs, gain from rising rates</li>
                    <li>Receive Fixed: Stable income, protected from rate drops</li>
                    <li>Typical APY: 5-7%</li>
                    <li>Risk Level: Medium</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ChartLine className="text-accent" size={20} />
                    <CardTitle className="text-base">Lending Protocols</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Supply assets to lending protocols like Aave, Compound, and Morpho.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Stable yields from borrower interest</li>
                    <li>High liquidity and low risk</li>
                    <li>Typical APY: 2-4%</li>
                    <li>Risk Level: Low-Medium</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-accent/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendUp className="text-accent" size={20} />
                    <CardTitle className="text-base">Liquidity Provision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Provide liquidity to DEXs like Uniswap, Curve, and Balancer.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Earn trading fees from swaps</li>
                    <li>Impermanent loss risk</li>
                    <li>Typical APY: 5-15%</li>
                    <li>Risk Level: Medium-High</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightning className="text-primary" size={20} />
                    <CardTitle className="text-base">Staking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Stake ETH through protocols like Lido, Rocket Pool, and Frax.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Earn validator rewards</li>
                    <li>Liquid staking tokens for composability</li>
                    <li>Typical APY: 3-4%</li>
                    <li>Risk Level: Low-Medium</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="text-accent" size={20} />
                    Diversification & Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Spread capital across multiple strategies and protocols to reduce risk. IPOR's interest rate swaps provide built-in hedging against rate volatility.
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendUp className="text-primary" size={20} />
                    Optimized Yields
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Combine strategies to maximize returns. Use Alpha Bot AI to discover optimal allocations based on current market conditions and risk tolerance.
                </CardContent>
              </Card>

              <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ArrowsClockwise className="text-accent" size={20} />
                    Automated Rebalancing
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Fusion vaults can automatically rebalance allocations as market conditions change, ensuring your strategy stays optimized without manual intervention.
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightning className="text-primary" size={20} />
                    Transparent & Composable
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  All vault operations are on-chain and auditable. Fusion vaults are fully composable with other DeFi protocols, unlocking advanced strategies.
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4 mt-4">
            <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="text-destructive" size={20} />
                  Important Risk Considerations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-destructive">Smart Contract Risk</p>
                    <p className="text-muted-foreground text-xs">
                      Vulnerabilities in smart contracts could result in loss of funds. IPOR and integrated protocols undergo regular audits, but risk remains.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-500">Interest Rate Risk</p>
                    <p className="text-muted-foreground text-xs">
                      Interest rate swaps expose you to rate movements. Pay-fixed positions lose value if rates fall; receive-fixed loses if rates rise.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-500">Impermanent Loss</p>
                    <p className="text-muted-foreground text-xs">
                      Liquidity provision strategies can suffer impermanent loss if asset prices diverge significantly.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-500">Liquidation Risk</p>
                    <p className="text-muted-foreground text-xs">
                      Leveraged strategies may face liquidation during high volatility. Always monitor collateral ratios.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-500">Protocol Risk</p>
                    <p className="text-muted-foreground text-xs">
                      Each integrated protocol carries its own risks. Diversification helps but doesn't eliminate protocol-specific risks.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs font-medium">Risk Mitigation Tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground mt-2">
                    <li>Start with lower-risk strategies (lending, staking)</li>
                    <li>Diversify across multiple protocols and strategy types</li>
                    <li>Use IPOR swaps to hedge interest rate exposure</li>
                    <li>Never invest more than you can afford to lose</li>
                    <li>Monitor vault performance regularly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Learn more at{' '}
            <a 
              href="https://docs.ipor.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              docs.ipor.io
            </a>
          </p>
          <Badge variant="outline" className="text-xs">
            IPOR Protocol v1.0
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  )
}
