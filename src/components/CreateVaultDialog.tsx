import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { StrategyCard } from './StrategyCard'
import { AllocationSlider } from './AllocationSlider'
import { RiskGauge } from './RiskGauge'
import { AccessControlManager } from './AccessControlManager'
import { AVAILABLE_STRATEGIES, ASSET_OPTIONS, calculateVaultRisk, calculateExpectedAPY } from '@/lib/strategies'
import { VaultConfig } from '@/lib/types'
import { CheckCircle, Warning, Funnel } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface CreateVaultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVaultCreate: (config: VaultConfig) => void
}

export function CreateVaultDialog({ open, onOpenChange, onVaultCreate }: CreateVaultDialogProps) {
  const [activeTab, setActiveTab] = useState('basic')
  const [config, setConfig] = useState<Partial<VaultConfig>>({
    name: '',
    description: '',
    asset: '',
    managementFee: 2,
    performanceFee: 20,
    isPublic: true,
    allowlist: [],
    accessControl: {
      owner: [],
      atomist: [],
      alpha: [],
      guardian: []
    },
    strategies: []
  })
  const [strategyFilter, setStrategyFilter] = useState<string>('all')

  const [selectedStrategies, setSelectedStrategies] = useState<Set<string>>(new Set())

  const handleStrategyToggle = (strategyId: string) => {
    const newSelected = new Set(selectedStrategies)
    if (newSelected.has(strategyId)) {
      newSelected.delete(strategyId)
      setConfig({
        ...config,
        strategies: config.strategies?.filter(s => s.strategyId !== strategyId) || []
      })
    } else {
      newSelected.add(strategyId)
      const remainingAllocation = 100 - (config.strategies?.reduce((sum, s) => sum + s.allocation, 0) || 0)
      setConfig({
        ...config,
        strategies: [
          ...(config.strategies || []),
          { strategyId, allocation: Math.min(remainingAllocation, 25) }
        ]
      })
    }
    setSelectedStrategies(newSelected)
  }

  const handleAllocationChange = (strategyId: string, value: number) => {
    setConfig({
      ...config,
      strategies: config.strategies?.map(s => 
        s.strategyId === strategyId ? { ...s, allocation: value } : s
      ) || []
    })
  }

  const handleRemoveStrategy = (strategyId: string) => {
    handleStrategyToggle(strategyId)
  }

  const totalAllocation = config.strategies?.reduce((sum, s) => sum + s.allocation, 0) || 0
  const riskScore = calculateVaultRisk(config.strategies || [])
  const expectedAPY = calculateExpectedAPY(config.strategies || [])

  const filteredStrategies = AVAILABLE_STRATEGIES.filter(strategy => {
    if (strategyFilter === 'all') return true
    if (strategyFilter === 'ipor') return strategy.protocol === 'IPOR'
    return strategy.type === strategyFilter
  })

  const canProceedToStrategies = config.name && config.description && config.asset
  const canProceedToReview = canProceedToStrategies && 
    config.strategies && 
    config.strategies.length > 0 && 
    totalAllocation === 100

  const handleCreate = () => {
    if (!canProceedToReview) {
      toast.error('Please complete all required fields')
      return
    }

    // Validate that at least one owner is assigned for private vaults
    if (!config.isPublic && (!config.accessControl?.owner || config.accessControl.owner.length === 0)) {
      toast.error('At least one Owner must be assigned for private vaults')
      setActiveTab('access')
      return
    }

    onVaultCreate(config as VaultConfig)
    toast.success('Vault created successfully!')
    onOpenChange(false)
    
    setConfig({
      name: '',
      description: '',
      asset: '',
      managementFee: 2,
      performanceFee: 20,
      isPublic: true,
      allowlist: [],
      accessControl: {
        owner: [],
        atomist: [],
        alpha: [],
        guardian: []
      },
      strategies: []
    })
    setSelectedStrategies(new Set())
    setStrategyFilter('all')
    setActiveTab('basic')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Vault</DialogTitle>
          <DialogDescription>
            Configure your vault parameters and select yield strategies
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="access" disabled={!canProceedToStrategies}>
              Access
            </TabsTrigger>
            <TabsTrigger value="strategies" disabled={!canProceedToStrategies}>
              Strategies
            </TabsTrigger>
            <TabsTrigger value="review" disabled={!canProceedToReview}>
              Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vault-name">Vault Name *</Label>
                <Input
                  id="vault-name"
                  placeholder="e.g., High Yield Stablecoin Vault"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vault-description">Description *</Label>
                <Textarea
                  id="vault-description"
                  placeholder="Describe your vault's strategy and objectives..."
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vault-asset">Base Asset *</Label>
                <Select value={config.asset} onValueChange={(value) => setConfig({ ...config, asset: value })}>
                  <SelectTrigger id="vault-asset">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_OPTIONS.map(asset => (
                      <SelectItem key={asset.value} value={asset.value}>
                        {asset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="management-fee">Management Fee (%)</Label>
                  <Input
                    id="management-fee"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={config.managementFee}
                    onChange={(e) => setConfig({ ...config, managementFee: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="performance-fee">Performance Fee (%)</Label>
                  <Input
                    id="performance-fee"
                    type="number"
                    min="0"
                    max="30"
                    step="1"
                    value={config.performanceFee}
                    onChange={(e) => setConfig({ ...config, performanceFee: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="is-public" className="text-base">Public Vault</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow anyone to deposit into this vault
                  </p>
                </div>
                <Switch
                  id="is-public"
                  checked={config.isPublic}
                  onCheckedChange={(checked) => setConfig({ ...config, isPublic: checked })}
                />
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => setActiveTab('access')}
              disabled={!canProceedToStrategies}
            >
              Continue to Access Control
            </Button>
          </TabsContent>

          <TabsContent value="access" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <Label htmlFor="is-public-access" className="text-base">Public Vault</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Allow anyone to deposit into this vault
                  </p>
                </div>
                <Switch
                  id="is-public-access"
                  checked={config.isPublic}
                  onCheckedChange={(checked) => setConfig({ ...config, isPublic: checked })}
                />
              </div>

              {!config.isPublic && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-border rounded-lg p-6"
                >
                  <AccessControlManager
                    accessControl={config.accessControl || { owner: [], atomist: [], alpha: [], guardian: [] }}
                    onAccessControlChange={(accessControl) => setConfig({ ...config, accessControl })}
                  />
                </motion.div>
              )}

              {config.isPublic && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-muted rounded-lg"
                >
                  <p className="text-sm text-muted-foreground">
                    This is a public vault - anyone can deposit. To restrict access and use role-based permissions, toggle "Public Vault" off.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1" 
                onClick={() => setActiveTab('basic')}
              >
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => setActiveTab('strategies')}
              >
                Continue to Strategies
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Available Strategies</h3>
                    <p className="text-sm text-muted-foreground">
                      Select strategies to include in your vault
                    </p>
                  </div>
                  <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Funnel size={16} className="mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Strategies</SelectItem>
                      <SelectItem value="ipor">
                        <Badge variant="outline" className="mr-2">IPOR</Badge>
                        IPOR Only
                      </SelectItem>
                      <SelectItem value="lending">Lending</SelectItem>
                      <SelectItem value="liquidity">Liquidity</SelectItem>
                      <SelectItem value="derivatives">Derivatives</SelectItem>
                      <SelectItem value="staking">Staking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {filteredStrategies.map(strategy => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      selected={selectedStrategies.has(strategy.id)}
                      onToggle={() => handleStrategyToggle(strategy.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <AllocationSlider
                  allocations={config.strategies || []}
                  onAllocationChange={handleAllocationChange}
                  onRemoveStrategy={handleRemoveStrategy}
                />
                
                <RiskGauge riskScore={riskScore} apy={expectedAPY} />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setActiveTab('basic')} className="flex-1">
                Back
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => setActiveTab('review')}
                disabled={!canProceedToReview}
              >
                Continue to Review
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-6 mt-6">
            <div className="space-y-6">
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Vault Summary</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{config.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Asset</p>
                    <p className="font-medium">{config.asset}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Management Fee</p>
                    <p className="font-medium">{config.managementFee}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Performance Fee</p>
                    <p className="font-medium">{config.performanceFee}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Access</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{config.isPublic ? 'Public' : 'Private'}</p>
                      {!config.isPublic && config.accessControl && (
                        <Badge variant="outline" className="text-xs">
                          {Object.values(config.accessControl).reduce((sum, arr) => sum + arr.length, 0)} roles assigned
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Strategies</p>
                    <p className="font-medium">{config.strategies?.length || 0}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{config.description}</p>
                </div>

                {!config.isPublic && config.accessControl && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Role Assignments</p>
                    <div className="space-y-3">
                      {(Object.entries(config.accessControl) as [string, string[]][]).map(([role, addresses]) => (
                        addresses.length > 0 && (
                          <div key={role} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize text-xs">{role}</Badge>
                              <span className="text-xs text-muted-foreground">({addresses.length})</span>
                            </div>
                            <div className="pl-2 space-y-1 max-h-24 overflow-y-auto">
                              {addresses.map((address, index) => (
                                <code key={index} className="text-xs font-mono block bg-muted px-2 py-1 rounded">
                                  {address}
                                </code>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Strategy Allocation</h3>
                
                <div className="space-y-3">
                  {config.strategies?.map(alloc => {
                    const strategy = AVAILABLE_STRATEGIES.find(s => s.id === alloc.strategyId)
                    if (!strategy) return null

                    return (
                      <div key={alloc.strategyId} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{strategy.name}</p>
                          <p className="text-xs text-muted-foreground">{strategy.protocol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold">{alloc.allocation}%</p>
                          <p className="text-xs text-accent">{strategy.estimatedAPY.toFixed(1)}% APY</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="border border-accent/50 bg-accent/10 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-accent" size={20} />
                    <p className="text-sm font-medium">Expected APY</p>
                  </div>
                  <p className="text-2xl font-mono font-bold text-accent">{expectedAPY.toFixed(2)}%</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`border rounded-lg p-4 ${
                    riskScore <= 2 
                      ? 'border-accent/50 bg-accent/10'
                      : riskScore <= 4
                      ? 'border-yellow-500/50 bg-yellow-500/10'
                      : 'border-destructive/50 bg-destructive/10'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Warning className={
                      riskScore <= 2 ? 'text-accent' : riskScore <= 4 ? 'text-yellow-500' : 'text-destructive'
                    } size={20} />
                    <p className="text-sm font-medium">Risk Score</p>
                  </div>
                  <p className={`text-2xl font-mono font-bold ${
                    riskScore <= 2 ? 'text-accent' : riskScore <= 4 ? 'text-yellow-500' : 'text-destructive'
                  }`}>
                    {riskScore.toFixed(1)}/5
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setActiveTab('strategies')} className="flex-1">
                Back
              </Button>
              <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleCreate}>
                Deploy Vault
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
