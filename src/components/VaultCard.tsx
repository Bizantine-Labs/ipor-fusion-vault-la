import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Vault, TrendUp, TrendDown } from '@phosphor-icons/react'
import { Vault as VaultType } from '@/lib/types'
import { motion } from 'framer-motion'

interface VaultCardProps {
  vault: VaultType
  onClick: () => void
}

export function VaultCard({ vault, onClick }: VaultCardProps) {
  const isPositive = vault.performance24h >= 0

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer border-border hover:border-primary/50 transition-all duration-300 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10"
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Vault className="text-primary" size={24} />
              </div>
              <div>
                <CardTitle className="text-lg">{vault.name}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {vault.asset}
                </CardDescription>
              </div>
            </div>
            <Badge variant={vault.isPublic ? 'default' : 'secondary'}>
              {vault.isPublic ? 'Public' : 'Private'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">TVL</p>
              <p className="text-xl font-mono font-semibold">
                ${(vault.tvl / 1000000).toFixed(2)}M
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">APY</p>
              <p className="text-xl font-mono font-semibold text-accent">
                {vault.apy.toFixed(2)}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendUp className="text-accent" size={16} />
              ) : (
                <TrendDown className="text-destructive" size={16} />
              )}
              <span className={`text-sm font-mono ${isPositive ? 'text-accent' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{vault.performance24h.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Risk:</span>
              <Badge 
                variant="outline" 
                className={
                  vault.riskScore <= 2 
                    ? 'border-accent/50 text-accent' 
                    : vault.riskScore <= 4 
                    ? 'border-yellow-500/50 text-yellow-500'
                    : 'border-destructive/50 text-destructive'
                }
              >
                {vault.riskScore}/5
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
