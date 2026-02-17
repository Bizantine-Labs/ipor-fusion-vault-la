interface IconProps {
  size?: number
  className?: string
}

export function USDCIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z" fill="white" />
      <path d="M18.5 15C18.5 13.6193 17.3807 12.5 16 12.5C14.6193 12.5 13.5 13.6193 13.5 15V17C13.5 18.3807 14.6193 19.5 16 19.5C17.3807 19.5 18.5 18.3807 18.5 17V15Z" fill="#2775CA" />
      <circle cx="16" cy="16" r="7" stroke="#2775CA" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function USDTIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path d="M18 10H14V13H11V15H14V18C14 19.1046 14.8954 20 16 20C17.1046 20 18 19.1046 18 18V15H21V13H18V10Z" fill="white" />
    </svg>
  )
}

export function DAIIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#dai-gradient)" />
      <path d="M10 16H22M10 14H22M12 11H20C21.6569 11 23 12.3431 23 14V18C23 19.6569 21.6569 21 20 21H12V11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="dai-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#F5AC37" />
          <stop offset="1" stopColor="#FBCC5F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function ETHIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#eth-gradient)" />
      <path d="M16 6L15.5 7.68V19.87L16 20.37L22 16.58L16 6Z" fill="white" />
      <path d="M16 6L10 16.58L16 20.37V6Z" fill="white" opacity="0.6" />
      <path d="M16 21.6L15.7 21.98V26.02L16 26.95L22 17.84L16 21.6Z" fill="white" />
      <path d="M16 26.95V21.6L10 17.84L16 26.95Z" fill="white" opacity="0.6" />
      <defs>
        <linearGradient id="eth-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#627EEA" />
          <stop offset="1" stopColor="#4F5FD8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function WETHIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#weth-gradient)" />
      <path d="M16 6L15.5 7.68V19.87L16 20.37L22 16.58L16 6Z" fill="white" />
      <path d="M16 6L10 16.58L16 20.37V6Z" fill="white" opacity="0.6" />
      <path d="M16 21.6L15.7 21.98V26.02L16 26.95L22 17.84L16 21.6Z" fill="white" />
      <path d="M16 26.95V21.6L10 17.84L16 26.95Z" fill="white" opacity="0.6" />
      <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
      <defs>
        <linearGradient id="weth-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#627EEA" />
          <stop offset="1" stopColor="#4F5FD8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function WBTCIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#wbtc-gradient)" />
      <path d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z" fill="white" />
      <path d="M14 12H17C18.1046 12 19 12.8954 19 14C19 14.7403 18.5978 15.3866 18 15.7324C18.5978 16.0782 19 16.7245 19 17.5C19 18.8807 17.8807 20 16.5 20H14V12Z" fill="#F09242" />
      <path d="M15 13V15H16.5C16.7761 15 17 14.7761 17 14.5C17 14.2239 16.7761 14 16.5 14H15V13Z" fill="white" />
      <path d="M15 16V18H16.5C16.7761 18 17 17.7761 17 17.5C17 17.2239 16.7761 17 16.5 17H15V16Z" fill="white" />
      <defs>
        <linearGradient id="wbtc-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#F09242" />
          <stop offset="1" stopColor="#E47127" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FRXPIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#frxp-gradient)" />
      <rect x="10" y="10" width="5" height="12" rx="1" fill="white" />
      <rect x="17" y="10" width="5" height="5" rx="1" fill="white" opacity="0.7" />
      <rect x="17" y="17" width="5" height="5" rx="1" fill="white" opacity="0.5" />
      <defs>
        <linearGradient id="frxp-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#23292F" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function XRPIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#xrp-gradient)" />
      <path d="M10 10L14 14M22 10L18 14M14 18L16 20L18 18M14 14L18 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="xrp-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#25A768" />
          <stop offset="1" stopColor="#1B7F4E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function DefaultAssetIcon({ size = 32, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="16" fill="url(#default-asset-gradient)" />
      <circle cx="16" cy="16" r="8" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="16" cy="16" r="3" fill="white" />
      <defs>
        <linearGradient id="default-asset-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function getAssetIcon(asset: string) {
  const normalizedAsset = asset.toUpperCase().replace(/\s/g, '')
  
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    USDC: USDCIcon,
    USDT: USDTIcon,
    DAI: DAIIcon,
    ETH: ETHIcon,
    WETH: WETHIcon,
    WBTC: WBTCIcon,
    FRXP: FRXPIcon,
    XRP: XRPIcon,
  }
  
  return iconMap[normalizedAsset] || DefaultAssetIcon
}
