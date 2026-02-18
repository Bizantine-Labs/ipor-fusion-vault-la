import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Trash, UserCheck, Warning } from '@phosphor-icons/react'
import { isValidEthereumAddress } from '@/lib/utils'
import { toast } from 'sonner'

interface AllowlistManagerProps {
  allowlist: string[]
  onAllowlistChange: (addresses: string[]) => void
  disabled?: boolean
}

export function AllowlistManager({ allowlist, onAllowlistChange, disabled }: AllowlistManagerProps) {
  const [newAddress, setNewAddress] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleAddAddress = () => {
    const trimmedAddress = newAddress.trim()
    
    if (!trimmedAddress) {
      setValidationError('Please enter an address')
      return
    }

    if (!isValidEthereumAddress(trimmedAddress)) {
      setValidationError('Invalid Ethereum address format (must be 0x followed by 40 hex characters)')
      return
    }

    if (allowlist.includes(trimmedAddress)) {
      setValidationError('This address is already in the allowlist')
      return
    }

    onAllowlistChange([...allowlist, trimmedAddress])
    setNewAddress('')
    setValidationError(null)
    toast.success('Address added to allowlist')
  }

  const handleRemoveAddress = (address: string) => {
    onAllowlistChange(allowlist.filter(a => a !== address))
    toast.success('Address removed from allowlist')
  }

  const handleInputChange = (value: string) => {
    setNewAddress(value)
    if (validationError) {
      setValidationError(null)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAddress()
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="allowlist-input" className="flex items-center gap-2">
          <UserCheck size={16} weight="duotone" />
          Allowlist Addresses
        </Label>
        <p className="text-sm text-muted-foreground">
          Add Ethereum addresses that are allowed to deposit into this private vault
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="allowlist-input"
            placeholder="0x..."
            value={newAddress}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
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
          onClick={handleAddAddress} 
          disabled={disabled || !newAddress.trim()}
          size="default"
        >
          <Plus size={16} weight="bold" className="mr-1" />
          Add
        </Button>
      </div>

      {allowlist.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {allowlist.length} {allowlist.length === 1 ? 'address' : 'addresses'} allowed
            </p>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto border border-border rounded-lg p-3">
            {allowlist.map((address) => (
              <div 
                key={address} 
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md group hover:bg-muted transition-colors"
              >
                <code className="text-sm font-mono break-all">{address}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAddress(address)}
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
          <AlertDescription>
            No addresses in allowlist. The vault creator will be the only one able to deposit.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
