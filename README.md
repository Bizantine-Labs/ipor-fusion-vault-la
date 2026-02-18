# 🚀 IPOR Fusion - Vault Management Platform

A sophisticated DeFi vault management platform built on IPOR Fusion that enables users to create and configure advanced vaults combining interest rate derivatives with multi-protocol yield strategies.

## ✨ Features

### Core Functionality
- **Vault Creation Wizard**: Multi-step guided process for configuring sophisticated DeFi vaults
- **Strategy Selection**: Choose from 14+ strategies across IPOR swaps, lending, liquidity provision, and staking
- **Dynamic Allocation**: Real-time capital allocation with visual feedback and risk assessment
- **Alpha Bot AI**: Intelligent AI assistant specialized in IPOR protocols and strategy optimization
- **Developer Tools**: Comprehensive Python SDK documentation and code examples
- **IPOR Education**: Detailed information about interest rate swaps and Fusion capabilities

### Advanced Capabilities
- **Interest Rate Derivatives**: IPOR pay-fixed and receive-fixed swap strategies for rate hedging
- **Multi-Strategy Vaults**: Combine multiple protocols (Aave, Compound, Uniswap, Curve, etc.) in one vault
- **Risk Analysis**: Real-time risk scoring and APY calculation based on strategy allocations
- **Performance Tracking**: Monitor vault TVL, APY, and 24-hour performance metrics
- **Python SDK**: Programmatic vault management with add/remove strategies and rebalancing
- **Analytics Dashboard**: Track positions, transaction history, and vault metrics
- **Persistent Storage**: All vault configurations saved using Spark KV store

## 🎨 Design Highlights

- **Dark Professional Theme**: Sophisticated dark navy background with teal and lime accents
- **Typography**: Space Grotesk for headings, Inter for body, JetBrains Mono for numbers
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Grid Background Pattern**: Subtle technical aesthetic with repeating gradients

## 🏗️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Components**: shadcn/ui v4 component library
- **Icons**: Phosphor Icons (duotone style)
- **Animation**: Framer Motion
- **AI Integration**: Spark LLM API for Alpha Bot
- **Persistence**: Spark KV storage for vault data
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (40+ preinstalled)
│   ├── AlphaBot.tsx          # AI strategy assistant
│   ├── AllocationSlider.tsx  # Strategy allocation UI
│   ├── CreateVaultDialog.tsx # Vault creation wizard
│   ├── DeveloperTools.tsx    # Python SDK documentation
│   ├── IPORInfo.tsx          # IPOR protocol education
│   ├── RiskGauge.tsx         # Risk visualization
│   ├── StrategyCard.tsx      # Strategy selection cards
│   └── VaultCard.tsx         # Vault display cards
├── lib/
│   ├── strategies.ts         # Available strategies and calculations
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── App.tsx                   # Main application component
├── index.css                 # Custom theme and styles
└── main.tsx                  # Application entry point
```

## ⚙️ Deployment Setup (GitHub Pages)

This repository includes an automated deployment workflow at `.github/workflows/deploy.yml`.

### One-time setup
1. Push this project to GitHub.
2. In your repository settings, open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Ensure your default branch is `main` (or update the workflow trigger branch).

### Deploy flow
- Every push to `main` runs `npm ci` and `npm run build`.
- The generated `dist/` folder is published to GitHub Pages automatically.
- The Vite `base` path is set dynamically in CI from your repository name, so assets resolve correctly on Pages.

You can also trigger deployments manually from the **Actions** tab using **Deploy to GitHub Pages**.

## 🚀 Deployment Ready

This application is production-ready and can be deployed immediately. All features are fully functional:

✅ Vault creation and management  
✅ Strategy selection and allocation  
✅ AI-powered recommendations via Alpha Bot  
✅ Persistent data storage  
✅ Responsive design for all screen sizes  
✅ IPOR protocol education and developer resources  
✅ Risk assessment and APY calculations  

## ✅ Deployment Quickstart (Do This Next)

If you want to go from local app to live vault deployment, follow this order:

1. **Install + verify the app builds**
   ```bash
   npm install
   npm run build
   ```

2. **Run the production preview locally**
   ```bash
   npm run preview
   ```
   Open the printed URL (usually `http://localhost:4173`) and verify the UI loads.

3. **Connect a wallet (MetaMask recommended)**
   - Use the **Connect Wallet** button in the app
   - Confirm your address and network in the header

4. **Configure real Fusion factory addresses before deploying**
   - Open `src/lib/web3.ts`
   - Replace each placeholder in `FACTORY_ADDRESSES` (`0x1234...`) with the real factory contract address for that chain
   - Double-check addresses against the official IPOR/Fusion docs or your deployment source of truth

5. **Deploy safely on Sepolia first**
   - Switch to **Sepolia** in wallet/app
   - Fund test ETH from a faucet
   - Create vault → set strategies/allocations → deploy

6. **Choose your deployment path**
   - `WEB3_DEPLOYMENT.md` → best for direct wallet-based deployment flow
   - `DEPLOYMENT_GUIDE.md` → best for backend API + Python SDK production architecture

### Pre-mainnet checklist
- [ ] Deployment succeeds on Sepolia
- [ ] You can see tx hash and vault address in explorer
- [ ] Fees/allocations are validated
- [ ] Wallet has enough ETH for expected gas
- [ ] Team agrees on mainnet network + asset selection

## 🔧 Key Components

### Alpha Bot
AI assistant that provides personalized strategy recommendations based on:
- Current vault configurations
- Available strategies and their APYs
- IPOR swap positions and rate hedging
- Market conditions and risk tolerance
- Python SDK usage for programmatic access

### Python SDK Integration
The Developer Tools panel showcases comprehensive Python SDK examples:
- **Installation & Setup**: Quick start with pip install and SDK initialization
- **Vault Creation**: Deploy vaults programmatically with multiple strategies
- **Strategy Management**: Add/remove strategies, rebalance allocations dynamically
- **IPOR Swaps**: Configure pay-fixed and receive-fixed interest rate swaps
- **Monitoring & Analytics**: Track vault performance, positions, and transaction history
- **Advanced Features**: Auto-rebalancing, multi-strategy optimization, custom parameters

### Vault Creation Flow
1. **Basic Configuration**: Name, description, asset type, fees
2. **Strategy Selection**: Choose from lending, liquidity, derivatives, staking
3. **Allocation**: Set percentage distribution across strategies
4. **Review & Deploy**: Final confirmation with risk assessment

### Strategy Categories
- **IPOR Swaps**: Interest rate derivatives (pay/receive fixed)
- **Lending**: Aave, Compound, Morpho protocols
- **Liquidity**: Uniswap V3, Curve, Balancer pools
- **Staking**: Lido, Rocket Pool, Frax validators

## 📚 Resources

### Documentation & Guides
- [IPOR Documentation](https://docs.ipor.io)
- [IPOR Fusion Guide](https://docs.ipor.io/build-on-fusion/)
- [Python SDK GitHub](https://github.com/IPOR-Labs/ipor-fusion.py)
- [Developer Guide](https://docs.ipor.io/build-on-fusion/developer-guide/)

### Python SDK Quick Start

Install the IPOR Fusion SDK:
```bash
pip install ipor-fusion
```

Create and manage vaults programmatically:
```python
from ipor_fusion import IporFusionSDK
from ipor_fusion.strategies import AaveV3Strategy, IPORSwapStrategy

sdk = IporFusionSDK(network="mainnet")

# Create a multi-strategy vault
vault = sdk.create_vault({
    "name": "My DeFi Vault",
    "asset": "USDC",
    "strategies": [
        AaveV3Strategy(allocation=0.6),
        IPORSwapStrategy(allocation=0.4, swap_type="pay_fixed", notional=100000)
    ]
})

# Add strategies and rebalance
vault.add_strategy(IPORSwapStrategy(allocation=0.3, swap_type="receive_fixed", notional=50000))
vault.rebalance()

# Monitor performance and analytics
metrics = vault.get_metrics()
print(f"TVL: ${metrics.tvl:,.2f} | APY: {metrics.apy}% | Risk: {metrics.risk_score}/5")

# Track positions and transactions
positions = vault.get_positions()
transactions = vault.get_transaction_history(limit=10)
```

See the **Developer Tools** panel in the app for comprehensive examples including IPOR swaps, monitoring & analytics, and advanced multi-strategy configurations.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

Built with ❤️ using IPOR Fusion and Spark
