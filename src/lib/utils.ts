import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEthereumAddress(address: string): boolean {
  // Check if the address matches the Ethereum address format (0x followed by 40 hex characters)
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
