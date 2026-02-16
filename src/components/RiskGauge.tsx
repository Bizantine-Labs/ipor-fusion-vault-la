import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Warning, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface RiskGaugeProps {
  riskScore: number
  apy: number
}

export function RiskGauge({ riskScore, apy }: RiskGaugeProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 2) return { label: 'Low Risk', color: 'text-accent', bgColor: 'bg-accent/20' }
    if (score <= 4) return { label: 'Medium Risk', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20' }
    return { label: 'High Risk', color: 'text-destructive', bgColor: 'bg-destructive/20' }
  }

  const risk = getRiskLevel(riskScore)
  const percentage = (riskScore / 5) * 100

  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Risk Assessment</CardTitle>
          <Badge variant="outline" className={risk.color}>
            {risk.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${risk.bgColor} relative`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
            <p className={`text-2xl font-mono font-bold ${risk.color}`}>
              {riskScore.toFixed(1)}/5
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Expected APY</p>
            <p className="text-2xl font-mono font-bold text-accent">
              {apy.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-start gap-2">
            <ShieldCheck className="text-accent mt-0.5" size={16} />
            <div>
              <p className="text-xs font-medium">Smart Contract Risk</p>
              <p className="text-xs text-muted-foreground">Audited protocols only</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            {riskScore <= 3 ? (
              <CheckCircle className="text-accent mt-0.5" size={16} />
            ) : (
              <Warning className="text-yellow-500 mt-0.5" size={16} />
            )}
            <div>
              <p className="text-xs font-medium">Liquidity Risk</p>
              <p className="text-xs text-muted-foreground">
                {riskScore <= 3 ? 'Sufficient liquidity' : 'Monitor liquidity closely'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            {riskScore <= 2 ? (
              <CheckCircle className="text-accent mt-0.5" size={16} />
            ) : (
              <Warning className="text-yellow-500 mt-0.5" size={16} />
            )}
            <div>
              <p className="text-xs font-medium">Market Risk</p>
              <p className="text-xs text-muted-foreground">
                {riskScore <= 2 ? 'Low volatility exposure' : 'Diversification recommended'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
