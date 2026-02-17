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

## 🚀 Deployment Ready

This application is production-ready and can be deployed immediately. All features are fully functional:

✅ Vault creation and management  
✅ Strategy selection and allocation  
✅ AI-powered recommendations via Alpha Bot  
✅ Persistent data storage  
✅ Responsive design for all screen sizes  
✅ IPOR protocol education and developer resources  
✅ Risk assessment and APY calculations  

## 🔧 Key Components

### Alpha Bot
AI assistant that provides personalized strategy recommendations based on:
- Current vault configurations
- Available strategies and their APYs
- IPOR swap positions and rate hedging
- Market conditions and risk tolerance
- Python SDK usage for programmatic access

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

- [IPOR Documentation](https://docs.ipor.io)
- [IPOR Fusion Guide](https://docs.ipor.io/build-on-fusion/)
- [Python SDK GitHub](https://github.com/IPOR-Labs/ipor-fusion.py)
- [Developer Guide](https://docs.ipor.io/build-on-fusion/developer-guide/)

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

Built with ❤️ using IPOR Fusion and Spark
