import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash, Shield, UserCheck, Warning, Info } from '@phosphor-icons/react'
import { isValidEthereumAddress } from '@/lib/utils'
import { VaultRole } from '@/lib/types'
import { toast } from 'sonner'

interface AccessControlManagerProps {
  accessControl: {
    owner: string[]
    atomist: string[]
    alpha: string[]
    guardian: string[]
  }
  onAccessControlChange: (accessControl: {
    owner: string[]
    atomist: string[]
    alpha: string[]
    guardian: string[]
  }) => void
  disabled?: boolean
}

const ROLE_INFO: Record<VaultRole, { title: string; description: string; icon: React.ReactNode; color: string }> = {
  owner: {
    title: 'Owner',
    description: 'Top administrator with full vault control. Manages other roles and critical parameters.',
    icon: <Shield size={16} weight="duotone" />,
    color: 'text-purple-500'
  },
  atomist: {
    title: 'Atomist',
    description: 'Operational role for configuring vault parameters, fees, and strategy managers.',
    icon: <UserCheck size={16} weight="duotone" />,
    color: 'text-blue-500'
  },
  alpha: {
    title: 'Alpha',
    description: 'Manages and executes investment strategies. Handles strategy allocation and rebalancing.',
    icon: <UserCheck size={16} weight="duotone" />,
    color: 'text-green-500'
  },
  guardian: {
    title: 'Guardian',
    description: 'Emergency role for pausing operations or canceling transactions in critical situations.',
    icon: <Shield size={16} weight="duotone" />,
    color: 'text-yellow-500'
  }
}

export function AccessControlManager({ accessControl, onAccessControlChange, disabled }: AccessControlManagerProps) {
  const [activeRole, setActiveRole] = useState<VaultRole>('owner')
  const [newAddress, setNewAddress] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleAddAddress = (role: VaultRole) => {
    const trimmedAddress = newAddress.trim()
    
    if (!trimmedAddress) {
      setValidationError('Please enter an address')
      return
    }

    if (!isValidEthereumAddress(trimmedAddress)) {
      setValidationError('Invalid Ethereum address format (must be 0x followed by 40 hex characters)')
      return
    }

    // Check if address already exists in any role
    const existsInRole = Object.entries(accessControl).find(([_, addresses]) => 
      addresses.includes(trimmedAddress)
    )
    
    if (existsInRole) {
      setValidationError(`This address is already assigned as ${existsInRole[0]}`)
      return
    }

    onAccessControlChange({
      ...accessControl,
      [role]: [...accessControl[role], trimmedAddress]
    })
    
    setNewAddress('')
    setValidationError(null)
    toast.success(`Address added as ${ROLE_INFO[role].title}`)
  }

  const handleRemoveAddress = (role: VaultRole, address: string) => {
    onAccessControlChange({
      ...accessControl,
      [role]: accessControl[role].filter(a => a !== address)
    })
    toast.success(`Address removed from ${ROLE_INFO[role].title} role`)
  }

  const handleInputChange = (value: string) => {
    setNewAddress(value)
    if (validationError) {
      setValidationError(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, role: VaultRole) => {
    if (e.key === 'Enter') {
      handleAddAddress(role)
    }
  }

  const totalAssignments = Object.values(accessControl).reduce((sum, addresses) => sum + addresses.length, 0)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Shield size={20} weight="duotone" className="text-primary" />
          <Label className="text-base font-semibold">Role-Based Access Control</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Assign Ethereum addresses to different roles following IPOR Fusion's access management model
        </p>
      </div>

      <Alert>
        <Info size={16} weight="duotone" />
        <AlertDescription className="text-xs">
          IPOR Fusion uses role-based access control. Each role has specific permissions and responsibilities. 
          At least one Owner must be assigned. Best practice: use multisig wallets for Owner and Atomist roles.
        </AlertDescription>
      </Alert>

      <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as VaultRole)}>
        <TabsList className="grid w-full grid-cols-4">
          {(Object.keys(ROLE_INFO) as VaultRole[]).map((role) => (
            <TabsTrigger key={role} value={role} className="relative">
              {ROLE_INFO[role].title}
              {accessControl[role].length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-[10px]">
                  {accessControl[role].length}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(ROLE_INFO) as VaultRole[]).map((role) => (
          <TabsContent key={role} value={role} className="space-y-4">
            <div className={`p-4 border border-border rounded-lg bg-muted/30`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={ROLE_INFO[role].color}>
                  {ROLE_INFO[role].icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{ROLE_INFO[role].title} Role</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ROLE_INFO[role].description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="0x..."
                  value={newAddress}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, role)}
                  disabled={disabled}
                  className={validationError ? 'border-destructive' : ''}
                />
                {validationError && (
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <Warning size={14} />
                    {validationError}
                  </p>
                )}
              </div>
              <Button 
                onClick={() => handleAddAddress(role)} 
                disabled={disabled || !newAddress.trim()}
                size="default"
              >
                <Plus size={16} weight="bold" className="mr-1" />
                Add
              </Button>
            </div>

            {accessControl[role].length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {accessControl[role].length} {accessControl[role].length === 1 ? 'address' : 'addresses'} assigned
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-border rounded-lg p-3">
                  {accessControl[role].map((address) => (
                    <div 
                      key={address} 
                      className="flex items-center justify-between p-2 bg-muted/50 rounded-md group hover:bg-muted transition-colors"
                    >
                      <code className="text-sm font-mono break-all">{address}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAddress(role, address)}
                        disabled={disabled}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash size={16} weight="bold" className="text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Alert>
                <Warning size={16} weight="duotone" />
                <AlertDescription className="text-xs">
                  {role === 'owner' 
                    ? 'At least one Owner address is required. Owners have full control over the vault.'
                    : `No ${ROLE_INFO[role].title} assigned. This role is optional but recommended for ${role === 'guardian' ? 'emergency controls' : 'operational efficiency'}.`
                  }
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <Shield size={16} weight="duotone" className="text-muted-foreground" />
          <span className="text-sm font-medium">Total Role Assignments</span>
        </div>
        <Badge variant="outline">{totalAssignments}</Badge>
      </div>
    </div>
  )
}
