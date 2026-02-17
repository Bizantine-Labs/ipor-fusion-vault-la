interface IconProps {
  size?: number
  className?: string
}

export function IPORIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#ipor-gradient)" />
      <path d="M12 14L20 10L28 14V26L20 30L12 26V14Z" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M20 10V20M12 14L20 20L28 14M20 20L20 30M20 20L12 26M20 20L28 26" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <defs>
        <linearGradient id="ipor-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function AaveIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#aave-gradient)" />
      <path d="M20 8L12 28H16L18 22H22L24 28H28L20 8Z" fill="white" />
      <path d="M19 18L20.5 14L22 18H19Z" fill="#B6509E" />
      <defs>
        <linearGradient id="aave-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#B6509E" />
          <stop offset="1" stopColor="#8B2E70" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CompoundIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#compound-gradient)" />
      <circle cx="20" cy="20" r="10" fill="white" />
      <path d="M16 20C16 17.7909 17.7909 16 20 16C22.2091 16 24 17.7909 24 20" stroke="#00D395" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="#00D395" />
      <defs>
        <linearGradient id="compound-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#00D395" />
          <stop offset="1" stopColor="#00A375" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function UniswapIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#uniswap-gradient)" />
      <path d="M26 14C26 12.8954 25.1046 12 24 12C22.8954 12 22 12.8954 22 14C22 14.7403 22.4022 15.3866 23 15.7324V24.2676C22.4022 24.6134 22 25.2597 22 26C22 27.1046 22.8954 28 24 28C25.1046 28 26 27.1046 26 26C26 25.2597 25.5978 24.6134 25 24.2676V15.7324C25.5978 15.3866 26 14.7403 26 14Z" fill="white" />
      <path d="M18 18C18 16.8954 17.1046 16 16 16C14.8954 16 14 16.8954 14 18C14 18.7403 14.4022 19.3866 15 19.7324V22.2676C14.4022 22.6134 14 23.2597 14 24C14 25.1046 14.8954 26 16 26C17.1046 26 18 25.1046 18 24C18 23.2597 17.5978 22.6134 17 22.2676V19.7324C17.5978 19.3866 18 18.7403 18 18Z" fill="white" opacity="0.7" />
      <defs>
        <linearGradient id="uniswap-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#FF007A" />
          <stop offset="1" stopColor="#C7005D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CurveIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#curve-gradient)" />
      <path d="M10 28C10 28 14 18 20 18C26 18 30 28 30 28" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M10 22C10 22 14 12 20 12C26 12 30 22 30 22" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <defs>
        <linearGradient id="curve-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#F3D03E" />
          <stop offset="1" stopColor="#D4B02F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MorphoIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#morpho-gradient)" />
      <path d="M14 28L20 10L26 28L20 22L14 28Z" fill="white" />
      <path d="M20 22L23 16L26 22L20 22Z" fill="#000D3D" opacity="0.3" />
      <defs>
        <linearGradient id="morpho-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#0094FF" />
          <stop offset="1" stopColor="#0066B3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function BalancerIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#balancer-gradient)" />
      <circle cx="15" cy="15" r="4" fill="white" />
      <circle cx="25" cy="15" r="4" fill="white" opacity="0.7" />
      <circle cx="20" cy="25" r="4" fill="white" opacity="0.5" />
      <defs>
        <linearGradient id="balancer-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#1E1E1E" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function PendleIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#pendle-gradient)" />
      <path d="M12 20L20 12L28 20L20 28L12 20Z" fill="white" />
      <path d="M20 12L28 20L20 20L20 12Z" fill="#3FB68B" opacity="0.5" />
      <defs>
        <linearGradient id="pendle-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#3FB68B" />
          <stop offset="1" stopColor="#2D8A68" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LidoIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#lido-gradient)" />
      <path d="M20 8L15 15L20 18L25 15L20 8Z" fill="white" />
      <path d="M20 22L15 19L15 25L20 32L25 25V19L20 22Z" fill="white" opacity="0.7" />
      <defs>
        <linearGradient id="lido-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#00A3FF" />
          <stop offset="1" stopColor="#0077CC" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function RocketPoolIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#rocketpool-gradient)" />
      <path d="M20 8L12 28H16L20 18L24 28H28L20 8Z" fill="white" />
      <circle cx="20" cy="14" r="2" fill="#FF6B35" />
      <defs>
        <linearGradient id="rocketpool-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#FF6B35" />
          <stop offset="1" stopColor="#D94E28" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FraxIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#frax-gradient)" />
      <rect x="12" y="12" width="7" height="16" rx="1" fill="white" />
      <rect x="21" y="12" width="7" height="7" rx="1" fill="white" opacity="0.7" />
      <rect x="21" y="21" width="7" height="7" rx="1" fill="white" opacity="0.5" />
      <defs>
        <linearGradient id="frax-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#000000" />
          <stop offset="1" stopColor="#2D2D2D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function GearboxIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#gearbox-gradient)" />
      <circle cx="20" cy="20" r="5" fill="white" />
      <path d="M20 10V14M20 26V30M30 20H26M14 20H10M26.5 13.5L23.5 16.5M16.5 23.5L13.5 26.5M26.5 26.5L23.5 23.5M16.5 16.5L13.5 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="gearbox-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LagoonIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#lagoon-gradient)" />
      <path d="M12 22C12 22 16 18 20 18C24 18 28 22 28 22C28 26 24 28 20 28C16 28 12 26 12 22Z" fill="white" />
      <path d="M12 16C12 16 16 12 20 12C24 12 28 16 28 16" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <defs>
        <linearGradient id="lagoon-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#0284C7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function FlareIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#flare-icon-gradient)" />
      <path d="M20 10L24 20L20 17L16 20L20 10Z" fill="white" />
      <path d="M20 30L16 20L20 23L24 20L20 30Z" fill="white" opacity="0.7" />
      <circle cx="20" cy="20" r="2" fill="white" />
      <defs>
        <linearGradient id="flare-icon-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#E84142" />
          <stop offset="1" stopColor="#C62828" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function OptionsIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#options-gradient)" />
      <path d="M10 28L18 12L26 20L30 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="12" r="2" fill="white" />
      <circle cx="26" cy="20" r="2" fill="white" />
      <defs>
        <linearGradient id="options-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function MultipleIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#multiple-gradient)" />
      <rect x="10" y="10" width="8" height="8" rx="2" fill="white" />
      <rect x="22" y="10" width="8" height="8" rx="2" fill="white" opacity="0.7" />
      <rect x="10" y="22" width="8" height="8" rx="2" fill="white" opacity="0.7" />
      <rect x="22" y="22" width="8" height="8" rx="2" fill="white" opacity="0.5" />
      <defs>
        <linearGradient id="multiple-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function DefaultProtocolIcon({ size = 40, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="40" height="40" rx="8" fill="url(#default-gradient)" />
      <rect x="12" y="12" width="16" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="20" cy="20" r="3" fill="white" />
      <defs>
        <linearGradient id="default-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function getProtocolIcon(protocol: string) {
  const normalizedProtocol = protocol.toLowerCase().replace(/\s/g, '')
  
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    ipor: IPORIcon,
    aave: AaveIcon,
    compound: CompoundIcon,
    uniswap: UniswapIcon,
    curve: CurveIcon,
    morpho: MorphoIcon,
    balancer: BalancerIcon,
    pendle: PendleIcon,
    lido: LidoIcon,
    rocketpool: RocketPoolIcon,
    frax: FraxIcon,
    gearbox: GearboxIcon,
    lagoon: LagoonIcon,
    flare: FlareIcon,
    options: OptionsIcon,
    multiple: MultipleIcon,
  }
  
  return iconMap[normalizedProtocol] || DefaultProtocolIcon
}
