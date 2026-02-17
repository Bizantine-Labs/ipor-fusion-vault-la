import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Strategy } from '@/lib/types'
import { TrendUp, ShieldCheck, Lightning } from '@phosphor-icons/react'
import { getProtocolIcon } from '@/components/StrategyIcons'

interface StrategyCardProps {
  strategy: Strategy
  selected: boolean
  onToggle: () => void
}

export function StrategyCard({ strategy, selected, onToggle }: StrategyCardProps) {
  const getRiskColor = (score: number) => {
    if (score <= 2) return 'text-accent border-accent/50'
    if (score <= 4) return 'text-yellow-500 border-yellow-500/50'
    return 'text-destructive border-destructive/50'
  }

  const ProtocolIcon = getProtocolIcon(strategy.protocol)

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        selected 
          ? 'border-primary bg-primary/5 shadow-md shadow-primary/20' 
          : 'border-border hover:border-primary/30'
      }`}
      onClick={onToggle}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Checkbox 
              checked={selected} 
              onCheckedChange={onToggle}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-shrink-0">
              <ProtocolIcon size={32} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base">{strategy.name}</CardTitle>
              <CardDescription className="text-xs mt-1">
                {strategy.protocol} · {strategy.type}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {strategy.description}
        </p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Lightning className="text-accent" size={16} />
            <span className="text-sm font-mono font-semibold text-accent">
              {strategy.estimatedAPY.toFixed(1)}%
            </span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <ShieldCheck className={getRiskColor(strategy.riskScore)} size={16} />
            <Badge variant="outline" className={getRiskColor(strategy.riskScore)}>
              Risk: {strategy.riskScore}/5
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
