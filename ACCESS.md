# 🚀 IPOR Fusion Vault - Access Guide

## Server Status

✅ **The vault is now running!**

## How to Access the Vault

### Local Access

The IPOR Fusion Vault application is now running and accessible at:

**🌐 Primary URL:** `http://localhost:5000`

You can access the vault management platform by:

1. **Open your web browser** (Chrome, Firefox, Safari, or Edge recommended)
2. **Navigate to:** `http://localhost:5000`
3. **The application will load** displaying the vault management dashboard

### Alternative Access Methods

If you're running this in a development environment with port forwarding:

- **Local Machine:** `http://localhost:5000`
- **Local Network:** `http://<your-ip-address>:5000`
- **With Port Forwarding:** Use the forwarded URL provided by your hosting service

### What You'll See

When you access the vault, you'll land on the **IPOR Fusion Vault Management Platform** with:

1. **Hero Section** - Welcome screen with "Create New Vault" button
2. **Your Vaults** - List of your created and deployed vaults
3. **Navigation Tabs:**
   - **Vaults** - Main dashboard for managing vaults
   - **Alpha Bot** - AI assistant for strategy recommendations
   - **Strategies** - Browse available DeFi strategies
   - **IPOR Info** - Learn about IPOR protocol
   - **Dev Tools** - Python SDK documentation

## Getting Started

### First-Time Users

1. **Create Your First Vault**
   - Click the "Create New Vault" button
   - Follow the step-by-step wizard:
     - **Step 1:** Configure vault basics (name, asset, fees)
     - **Step 2:** Select strategies from 14+ options
     - **Step 3:** Allocate capital across strategies
     - **Step 4:** Review and create

2. **Explore Strategies**
   - Navigate to the "Strategies" tab
   - Browse available strategies across:
     - **IPOR Swaps** - Interest rate derivatives
     - **Lending** - Aave, Compound, Morpho
     - **Liquidity** - Uniswap V3, Curve, Balancer
     - **Staking** - Lido, Rocket Pool, Frax

3. **Use Alpha Bot**
   - Click on "Alpha Bot" tab
   - Ask questions like:
     - "What's the best strategy for stable returns?"
     - "How do IPOR swaps work?"
     - "Recommend a vault configuration for $100k"

### Deploying Vaults

**Current Mode: Simulation**

The application is currently running in **simulation mode**, which means:

- ✅ You can create and configure vaults
- ✅ You can test the full user experience
- ✅ Vaults are saved locally using browser storage
- ⚠️ Actual blockchain deployment requires additional setup

### For Real Blockchain Deployment

To deploy vaults to actual blockchain networks:

1. **Review Deployment Guides:**
   - `WEB3_DEPLOYMENT.md` - Direct Web3 wallet integration
   - `DEPLOYMENT_GUIDE.md` - Backend API architecture

2. **Set Up Wallet Connection:**
   - Install MetaMask or another Web3 wallet
   - Connect to Sepolia testnet (for testing)
   - Get test ETH from a faucet

3. **Configure Factory Addresses:**
   - Edit `src/lib/web3.ts`
   - Replace placeholder addresses with real IPOR Fusion factory addresses

4. **Follow Pre-Deployment Checklist:**
   - Test on Sepolia testnet first
   - Verify gas estimates
   - Confirm strategy allocations
   - Check vault parameters

## Features You Can Use Now

### ✅ Available Features

- **Vault Creation** - Full wizard with strategy selection
- **Strategy Exploration** - 14+ strategies across multiple protocols
- **Capital Allocation** - Visual sliders for percentage distribution
- **Risk Assessment** - Real-time risk scoring
- **APY Calculation** - Estimated annual percentage yield
- **Alpha Bot AI** - Intelligent strategy recommendations
- **Python SDK Docs** - Comprehensive developer documentation
- **IPOR Education** - Learn about interest rate derivatives
- **Vault Management** - Track and monitor configured vaults

### 🚧 Requires Additional Setup

- **Blockchain Deployment** - Needs Web3 wallet and factory addresses
- **Real Asset Management** - Requires connected wallet with funds
- **Live Performance Tracking** - Needs deployed vaults on-chain
- **Transaction History** - Available after blockchain deployment

## Technical Details

### Server Information

- **Server:** Vite Development Server
- **Port:** 5000
- **Protocol:** HTTP
- **Base Path:** `/ipor-fusion-vault-la/`

### Technology Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui v4
- **Icons:** Phosphor Icons
- **Animation:** Framer Motion
- **State:** React Hooks + Spark KV storage

### Data Storage

- **Local Storage:** Browser localStorage via Spark KV
- **Vault Configurations:** Persisted across sessions
- **No Backend Required:** For simulation mode

## Troubleshooting

### Can't Access the Vault?

1. **Check Server Status:**
   ```bash
   curl -I http://localhost:5000
   ```
   You should see `HTTP/1.1 302 Found`

2. **Verify Port Availability:**
   ```bash
   netstat -tulpn | grep 5000
   ```
   Should show node process listening

3. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for any JavaScript errors
   - Check Network tab for failed requests

### Server Not Running?

If the server stopped, restart it:

```bash
cd /home/runner/work/ipor-fusion-vault-la/ipor-fusion-vault-la
npm run dev
```

### Port Already in Use?

If port 5000 is occupied:

```bash
npm run kill  # Kills process on port 5000
npm run dev   # Restart server
```

## Development Commands

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Kill process on port 5000
npm run kill
```

## Next Steps

### For Developers

1. **Explore the Code:**
   - `src/App.tsx` - Main application component
   - `src/components/` - UI components
   - `src/lib/strategies.ts` - Strategy definitions
   - `src/lib/types.ts` - TypeScript types

2. **Customize Strategies:**
   - Edit `src/lib/strategies.ts`
   - Add new protocols or modify APY calculations
   - Update risk scores and categories

3. **Integrate Backend:**
   - Follow `DEPLOYMENT_GUIDE.md`
   - Set up Python backend with IPOR SDK
   - Replace mock functions in `src/lib/deployment.ts`

### For Users

1. **Test the Platform:**
   - Create multiple vaults
   - Try different strategy combinations
   - Use Alpha Bot for recommendations
   - Explore developer documentation

2. **Learn About IPOR:**
   - Read the "IPOR Info" tab
   - Understand interest rate swaps
   - Learn about Fusion capabilities

3. **Prepare for Deployment:**
   - Review deployment guides
   - Set up Web3 wallet
   - Get testnet funds
   - Test on Sepolia first

## Security Notes

### Current Environment

- ✅ Safe for local testing and development
- ✅ No real funds at risk (simulation mode)
- ✅ No private keys required yet

### Before Mainnet Deployment

- ⚠️ Never expose private keys in frontend code
- ⚠️ Always test on testnet first
- ⚠️ Verify all smart contract addresses
- ⚠️ Use secure key management (backend only)
- ⚠️ Implement proper authentication
- ⚠️ Audit all contract interactions

## Resources

### Documentation

- **README.md** - Project overview and features
- **DEPLOYMENT_GUIDE.md** - Backend integration guide
- **WEB3_DEPLOYMENT.md** - Web3 wallet deployment
- **PRD.md** - Product requirements document
- **SECURITY.md** - Security guidelines

### External Resources

- [IPOR Documentation](https://docs.ipor.io)
- [IPOR Fusion Guide](https://docs.ipor.io/build-on-fusion/)
- [Python SDK GitHub](https://github.com/IPOR-Labs/ipor-fusion.py)
- [Developer Guide](https://docs.ipor.io/build-on-fusion/developer-guide/)

## Support

### Getting Help

1. **Check Documentation** - Review all MD files in this repository
2. **IPOR Discord** - Join the IPOR community
3. **GitHub Issues** - Report bugs or request features
4. **IPOR Labs** - Contact for protocol questions

---

## Quick Reference

| Item | Value |
|------|-------|
| **Access URL** | `http://localhost:5000` |
| **Server Port** | 5000 |
| **Status** | ✅ Running |
| **Mode** | Simulation (no real blockchain) |
| **Storage** | Browser localStorage |
| **Wallet Required** | No (for simulation) |

---

**🎉 Happy Vault Building!**

Start creating your DeFi vaults and exploring the power of IPOR Fusion! 🚀
