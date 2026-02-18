import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
  DropdownMenu,
  Dropdow
  DropdownMenuS
} from '@/components/u
import { connectWal
import { motion } fr
export function WalletCo
  const [connecting, 

    checkWalletConnection().then(info => {
        setWallet(info)
    })
    if (typeof window !== 'undefined' 

          toast.info('Wallet disc
          checkWalletConnection().then(info => {
            toast.success('Wallet connected', {
            })


        checkWalletConnection().then(info 

      window.ethereum?.
      r
      

    }

    if (typeof window === 'undefined
        description: 'Ple
      return

    try {
      if (!walletInfo) {
      }
      toast.success('Wallet connected', {
      })
      toast.
      })
      s

  const handleCopyAddress = () => {
      navigator.clipboard.writeText(wallet.address)
      t


    setWallet(null)

  if (!wallet) {
      <Button
        disabled={connecting}
        className="gap-2 border-primary/30 hover:bg-primary/10"
        <
      <
  }
  return

          variant="outline" 
        >
            animate={{ scale: [1, 1.1, 1]
            className="w-2 h-2 rounded-full bg-accent"
        
          </
     

      <DropdownMenuCont
         
            <div className="flex items-center 
                {shorten
              <Button
       
                onClick={ha
                {copied ? (
                ) : (
        
            </div>
        </DropdownMenuLabel>
        <div className="px-2 py-1.5">
        
              {
          </div>
     
   

        <DropdownMenuSeparator />
          <SignOu
        </DropdownMenuItem>
    </DropdownMenu>
}


























































































