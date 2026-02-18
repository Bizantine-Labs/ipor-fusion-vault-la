# Web3 Wallet Integration - Deployment Guide

This document explains how to use the Web3 wallet integration to deploy IPOR Fusion vaults to real blockchain networks.

## Overview

The application now supports **real blockchain deployment** through Web3 wallet integration using MetaMask or compatible wallets. You can deploy vaults to multiple networks including Ethereum Mainnet, Sepolia testnet, Arbitrum, and Polygon.

## Features

✅ **Wallet Connection**: Connect MetaMask or other Web3 wallets  
✅ **Network Switching**: Automatically switch networks when deploying  
✅ **Gas Estimation**: Estimate deployment costs before executing  
✅ **Multi-Network Support**: Deploy to mainnet and test networks  
✅ **Transaction Tracking**: View deployment transactions on block explorers  
✅ **Real-time Status**: Monitor wallet connection and balance  

## Prerequisites

### 1. Install MetaMask

Download and install [MetaMask](https://metamask.io/) browser extension.

### 2. Get Test Tokens (for Testnets)

For testing, you'll need test tokens on Sepolia:

- **Sepolia ETH**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- **Sepolia USDC**: Use the USDC faucet or bridge test tokens

### 3. Have Mainnet ETH (for Production)

For mainnet deployment, ensure you have sufficient ETH for gas fees (typically 0.001-0.01 ETH).

## How to Deploy a Vault

### Step 1: Connect Wallet

1. Click the **"Connect Wallet"** button in the header
2. Approve the connection in your MetaMask popup
3. Your wallet address and balance will be displayed

### Step 2: Create a Vault Configuration

1. Click **"Create Vault"**
2. Configure your vault:
   - Name and description
   - Choose an asset (USDC, USDT, or DAI)
   - Set management and performance fees
   - Select strategies and allocations
   - Choose public/private access

### Step 3: Deploy to Blockchain

1. Click the **rocket icon** on your vault card to deploy
2. In the deployment dialog:
   - Select your target network (Sepolia recommended for testing)
   - Optionally add an initial deposit
   - Click **"Estimate Gas"** to see deployment costs
3. Click **"Deploy Vault"**
4. The app will prompt you to switch networks if needed
5. Confirm the transaction in MetaMask
6. Wait for the transaction to complete

### Step 4: View Deployed Vault

Once deployed, your vault will show:
- ✅ "Deployed" status badge
- Vault contract address
- Transaction hash
- Links to block explorer

## Supported Networks

| Network          | Chain ID | Explorer                        | Recommended For    |
|------------------|----------|---------------------------------|-------------------|
| Ethereum Mainnet | 1        | etherscan.io                    | Production        |
| Sepolia Testnet  | 11155111 | sepolia.etherscan.io            | **Testing** (Recommended) |
| Arbitrum One     | 42161    | arbiscan.io                     | Production        |
| Polygon          | 137      | polygonscan.com                 | Production        |

## Supported Assets

The following stablecoins are supported for vault creation:

- **USDC** - USD Coin
- **USDT** - Tether USD  
- **DAI** - Dai Stablecoin

Asset contract addresses are automatically resolved for each network.

## Gas Costs

Typical gas costs for vault deployment:

- **Sepolia**: FREE (test ETH from faucet)
- **Ethereum Mainnet**: ~0.002-0.01 ETH ($5-$25 depending on gas prices)
- **Arbitrum**: ~0.0001-0.001 ETH ($0.25-$2.50)
- **Polygon**: ~0.01-0.05 MATIC ($0.01-$0.05)

*Gas costs vary based on network congestion and vault complexity (number of strategies).*

## Security Best Practices

### ⚠️ Important Security Notes

1. **Test First**: Always deploy to Sepolia testnet first before mainnet
2. **Verify Transactions**: Double-check all transaction details in MetaMask
3. **Start Small**: Begin with small initial deposits until you're confident
4. **Save Addresses**: Copy and save your vault contract address after deployment
5. **Network Verification**: Ensure you're on the correct network before deploying

## Troubleshooting

### "No wallet detected"
- Install MetaMask or another Web3 wallet extension
- Refresh the page after installation

### "Insufficient funds for gas"
- Add more ETH to your wallet
- For testnets, use faucets to get test tokens

### "Wrong network"
- The app will automatically prompt you to switch
- Approve the network switch in MetaMask

### "Transaction failed"
- Check you have enough gas
- Verify the asset is supported on the target network
- Ensure wallet has sufficient balance

### Deployment takes too long
- Check the transaction status on the block explorer
- Gas price might be too low - try increasing it in MetaMask
- Network congestion - wait and retry

## Technical Implementation

### Architecture

The Web3 integration uses:
- **viem**: Modern TypeScript library for Ethereum interactions
- **wagmi**: React hooks for Web3 (types only)
- **@tanstack/react-query**: For async state management

### Key Files

- `src/lib/web3.ts` - Core Web3 functions and wallet connection
- `src/components/WalletConnect.tsx` - Wallet connection UI component
- `src/components/DeployVaultDialog.tsx` - Vault deployment flow

### Smart Contract Integration

The deployment process:
1. Connects to the IPOR Fusion factory contract
2. Encodes vault configuration as transaction data
3. Submits transaction to blockchain
4. Waits for confirmation
5. Extracts vault address from emitted events

## Future Enhancements

🔮 Planned features:
- Direct interaction with deployed vaults (deposit/withdraw)
- Real-time TVL and APY tracking from chain
- Multi-signature wallet support
- Hardware wallet integration (Ledger, Trezor)
- WalletConnect support for mobile wallets
- Transaction history and analytics

## Support

For issues or questions:
- Check the [IPOR Documentation](https://docs.ipor.io/)
- Visit the [IPOR GitHub](https://github.com/IPOR-Labs/ipor-fusion)
- Join the IPOR Discord community

## Development Notes

### Factory Contract Addresses

The factory addresses are placeholders and need to be updated with actual IPOR Fusion factory addresses for each network:

```typescript
const FACTORY_ADDRESSES: Record<SupportedChain, Address> = {
  mainnet: '0x...', // Update with real address
  sepolia: '0x...', // Update with real address
  arbitrum: '0x...', // Update with real address
  polygon: '0x...'  // Update with real address
}
```

### Asset Addresses

Asset addresses are configured per network. Update in `src/lib/web3.ts` as needed for additional tokens.

---

**Ready to deploy?** Connect your wallet and create your first IPOR Fusion vault! 🚀
