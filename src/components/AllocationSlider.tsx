import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { AVAILABLE_STRATEGIES } from '@/lib/strategies'
import { motion } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface AllocationSliderProps {
  allocations: { strategyId: string; allocation: number }[]
  onAllocationChange: (strategyId: string, value: number) => void
  onRemoveStrategy: (strategyId: string) => void
}

export function AllocationSlider({ allocations, onAllocationChange, onRemoveStrategy }: AllocationSliderProps) {
  const totalAllocation = allocations.reduce((sum, a) => sum + a.allocation, 0)
  const isOverAllocated = totalAllocation > 100

  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Strategy Allocation</CardTitle>
          <div className={`text-sm font-mono font-semibold ${
            isOverAllocated ? 'text-destructive' : totalAllocation === 100 ? 'text-accent' : 'text-muted-foreground'
          }`}>
            {totalAllocation}% / 100%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {allocations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Select strategies to configure allocations
          </p>
        ) : (
          <>
            {allocations.map((alloc) => {
              const strategy = AVAILABLE_STRATEGIES.find(s => s.id === alloc.strategyId)
              if (!strategy) return null

              return (
                <motion.div 
                  key={alloc.strategyId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{strategy.name}</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold">{alloc.allocation}%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => onRemoveStrategy(alloc.strategyId)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={[alloc.allocation]}
                    onValueChange={(value) => onAllocationChange(alloc.strategyId, value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${alloc.allocation}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )
            })}
            
            {isOverAllocated && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3"
              >
                Total allocation exceeds 100%. Please adjust the percentages.
              </motion.div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
