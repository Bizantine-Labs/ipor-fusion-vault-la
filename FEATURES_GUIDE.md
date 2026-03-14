# 🎯 IPOR Fusion Vault - Feature Guide

This guide walks you through all the features available in the IPOR Fusion Vault Management Platform.

---

## 📋 Table of Contents

1. [Application Overview](#application-overview)
2. [Main Dashboard](#main-dashboard)
3. [Creating Your First Vault](#creating-your-first-vault)
4. [Alpha Bot AI Assistant](#alpha-bot-ai-assistant)
5. [Developer Tools](#developer-tools)
6. [IPOR Protocol Info](#ipor-protocol-info)
7. [Wallet Connection](#wallet-connection)
8. [Vault Management](#vault-management)
9. [Strategy Selection](#strategy-selection)
10. [Deployment Process](#deployment-process)

---

## Application Overview

**IPOR Fusion Vault** is a sophisticated DeFi platform that enables you to:
- Create multi-strategy vaults combining 14+ DeFi protocols
- Leverage interest rate derivatives (IPOR swaps)
- Optimize yield across lending, liquidity, and staking strategies
- Get AI-powered recommendations from Alpha Bot
- Deploy vaults to Ethereum networks (testnet and mainnet)

**Access:** `http://localhost:5000/ipor-fusion-vault-la/` (local) or your GitHub Pages URL

---

## Main Dashboard

### Overview Statistics

The top of the dashboard displays:
- **Total TVL (Total Value Locked)**: Sum of all your vaults
- **Average APY**: Average expected annual percentage yield
- **Number of Vaults**: Total vaults you've created

### Header Elements

**Left Side:**
- 🔷 IPOR Fusion logo and branding
- Platform title

**Right Side:**
- 🛠️ **Developer Tools** button - Access Python SDK documentation
- 📚 **Learn About IPOR** button - Educational content
- 💼 **Connect Wallet** button - Web3 wallet integration
- 🤖 **Alpha Bot** button - AI strategy assistant

---

## Creating Your First Vault

### Step 1: Start the Wizard

Click the **"+ Create New Vault"** button in the top section.

### Step 2: Basic Configuration

**Required Fields:**
- **Vault Name**: Descriptive name (e.g., "Conservative Yield Vault")
- **Description**: Purpose and strategy overview
- **Asset**: Choose base asset (USDC, USDT, DAI, or ETH)
- **Management Fee**: 0-5% annual fee (default: 2%)
- **Performance Fee**: 0-30% profit share (default: 20%)

**Tips:**
- Use clear, descriptive names
- Keep fees competitive with similar products
- USDC is recommended for beginners (most strategy options)

### Step 3: Select Strategies

**Available Strategy Categories:**

#### 🔄 IPOR Swaps (Interest Rate Derivatives)
- **Pay-Fixed USDC 28D** (7.5% APY, Risk: 3/5)
  - Hedge against rising interest rates
  - Fixed payment, receive floating
  
- **Receive-Fixed USDC 28D** (6.8% APY, Risk: 4/5)
  - Benefit from falling rates
  - Receive fixed, pay floating

#### 💰 Lending Protocols
- **Aave V3 USDC** (4.5% APY, Risk: 2/5)
  - Industry-leading lending protocol
  - High liquidity, established track record
  
- **Compound V3 USDC** (4.2% APY, Risk: 2/5)
  - Pioneering DeFi lending platform
  - Strong security history
  
- **Morpho Aave USDC** (5.1% APY, Risk: 3/5)
  - Optimized Aave yields
  - P2P lending matching

#### 💧 Liquidity Provision
- **Uniswap V3 USDC/ETH** (8.5% APY, Risk: 4/5)
  - Concentrated liquidity DEX
  - Trading fees + potential impermanent loss
  
- **Curve USDC/USDT** (3.8% APY, Risk: 1/5)
  - Stablecoin pools
  - Minimal impermanent loss
  
- **Balancer USDC/DAI/USDT** (4.9% APY, Risk: 2/5)
  - Multi-asset pools
  - Diversified exposure

#### 🔒 Staking
- **Lido stETH** (3.5% APY, Risk: 2/5)
  - Liquid Ethereum staking
  - Widely adopted
  
- **Rocket Pool rETH** (3.4% APY, Risk: 2/5)
  - Decentralized ETH staking
  - No validator minimum
  
- **Frax sfrxETH** (3.7% APY, Risk: 3/5)
  - Frax staked Ether
  - Additional yield mechanisms

**Selection Tips:**
- Start with 2-4 strategies for simplicity
- Mix strategy types for diversification
- Consider risk tolerance (conservative: 1-2, aggressive: 4-5)
- IPOR swaps are unique to this platform

### Step 4: Allocate Capital

**Using the Allocation Sliders:**
1. Each strategy has a percentage slider
2. Adjust allocations to total exactly **100%**
3. Real-time indicators show:
   - Current allocation per strategy
   - Total allocation (must be 100%)
   - Expected weighted APY
   - Overall risk score

**Allocation Strategies:**

**Conservative (Risk 1-2):**
```
50% Aave V3 USDC
30% Curve USDC/USDT
20% Lido stETH
Expected APY: ~4.0%
Risk Score: 1.8
```

**Balanced (Risk 2-3):**
```
40% Pay-Fixed USDC Swap
30% Aave V3 USDC
20% Uniswap V3 USDC/ETH
10% Morpho Aave USDC
Expected APY: ~6.2%
Risk Score: 2.9
```

**Aggressive (Risk 3-4):**
```
35% Receive-Fixed USDC Swap
30% Uniswap V3 USDC/ETH
25% Pay-Fixed USDT Swap
10% Morpho Aave USDC
Expected APY: ~7.8%
Risk Score: 3.6
```

### Step 5: Review & Deploy

**Review Screen Shows:**
- ✅ Vault name and asset
- ✅ All selected strategies with allocations
- ✅ Total allocation (must be 100%)
- ✅ Expected APY (weighted average)
- ✅ Risk score (1-5 scale)
- ✅ Management and performance fees

**Actions:**
- **Create Vault**: Saves configuration locally (no blockchain)
- **Deploy to Blockchain**: Opens deployment wizard (requires wallet)

---

## Alpha Bot AI Assistant

### What is Alpha Bot?

Alpha Bot is your AI-powered DeFi strategy advisor, specialized in:
- IPOR protocol and interest rate derivatives
- Multi-strategy vault optimization
- Risk assessment and diversification
- Python SDK usage and integration

### How to Use Alpha Bot

1. **Open Alpha Bot**: Click the robot icon (🤖) in the top-right
2. **Ask Questions**: Type your strategy questions
3. **Get Recommendations**: Receive AI-powered advice
4. **Apply Suggestions**: Use insights to optimize your vault

### Example Questions

**Strategy Advice:**
- "What's a good conservative allocation for USDC?"
- "How do IPOR pay-fixed swaps work?"
- "Should I add more liquidity provision strategies?"
- "What's the difference between Aave and Compound?"

**Risk Management:**
- "How can I reduce my vault's risk score?"
- "What's a balanced risk allocation?"
- "Explain impermanent loss in Uniswap V3"

**Technical Questions:**
- "How do I use the Python SDK to create a vault?"
- "What's the difference between pay-fixed and receive-fixed swaps?"
- "How often should I rebalance my vault?"

**Market Conditions:**
- "When should I use pay-fixed swaps?"
- "Best strategies for high volatility?"
- "How to hedge against rising interest rates?"

### Tips for Best Results

- Be specific about your goals (yield, safety, etc.)
- Mention your risk tolerance
- Ask follow-up questions for clarity
- Request code examples for Python SDK

---

## Developer Tools

### What's Included

The Developer Tools panel provides comprehensive Python SDK documentation:

1. **Installation & Setup**
   - Package installation commands
   - SDK initialization examples
   - Network configuration

2. **Vault Creation**
   - Programmatic vault deployment
   - Multi-strategy configuration
   - Parameter customization

3. **Strategy Management**
   - Adding new strategies
   - Removing strategies
   - Rebalancing allocations

4. **IPOR Swaps**
   - Pay-fixed swap configuration
   - Receive-fixed swap setup
   - Notional amount settings

5. **Monitoring & Analytics**
   - Vault metrics retrieval
   - Position tracking
   - Transaction history

6. **Advanced Features**
   - Auto-rebalancing setup
   - Custom strategy parameters
   - Multi-vault management

### Accessing Developer Tools

1. Click **"Developer Tools"** in the top-right
2. Browse through code examples
3. Copy code snippets directly
4. Use with IPOR Fusion Python SDK

### Example: Creating a Vault Programmatically

```python
from ipor_fusion import IporFusionSDK
from ipor_fusion.strategies import AaveV3Strategy, IPORSwapStrategy

# Initialize SDK
sdk = IporFusionSDK(network="mainnet")

# Create vault with multiple strategies
vault = sdk.create_vault({
    "name": "My DeFi Vault",
    "asset": "USDC",
    "strategies": [
        AaveV3Strategy(allocation=0.6),
        IPORSwapStrategy(
            allocation=0.4,
            swap_type="pay_fixed",
            notional=100000
        )
    ]
})

# Deploy and monitor
vault.deploy()
metrics = vault.get_metrics()
print(f"TVL: ${metrics.tvl:,.2f}")
print(f"APY: {metrics.apy}%")
```

---

## IPOR Protocol Info

### Educational Content

The IPOR Info section provides:

1. **What is IPOR?**
   - Interest rate oracle and derivatives
   - Decentralized rate discovery
   - Multi-chain support

2. **Fusion Platform**
   - Multi-strategy vault architecture
   - Composable DeFi building blocks
   - Risk management framework

3. **Interest Rate Swaps**
   - Pay-fixed vs receive-fixed
   - Hedging strategies
   - Rate speculation

4. **Use Cases**
   - Rate hedging for lenders
   - Yield optimization
   - Treasury management
   - Speculation on rate movements

### When to Use Different Swaps

**Pay-Fixed Swap (Hedge Rising Rates):**
- When: Expect rates to increase
- You: Pay fixed, receive floating
- Benefit: Lock in current low rates
- Risk: Miss out if rates fall

**Receive-Fixed Swap (Earn from Falling Rates):**
- When: Expect rates to decrease
- You: Receive fixed, pay floating
- Benefit: Earn fixed rate even as market rates fall
- Risk: Pay more if rates rise

---

## Wallet Connection

### Supported Wallets

- **MetaMask** (Recommended)
- **WalletConnect** compatible wallets
- **Coinbase Wallet**
- **Rainbow Wallet**
- Other Ethereum wallets

### Connection Process

1. **Click "Connect Wallet"** in top-right
2. **Select Wallet Type** (MetaMask, WalletConnect, etc.)
3. **Approve Connection** in wallet popup
4. **Verify Address** displayed in header

### Wallet Display

Once connected, you'll see:
- Your Ethereum address (truncated: 0x1234...5678)
- Current network (Mainnet, Sepolia, etc.)
- Disconnect option

### Network Switching

**For Testing:**
- Switch to **Sepolia** testnet
- Get free test ETH from faucets
- Deploy without real funds

**For Production:**
- Switch to **Ethereum Mainnet**
- Ensure sufficient ETH for gas
- Use carefully with real funds

---

## Vault Management

### Viewing Your Vaults

After creating vaults, they appear as **Vault Cards** on the dashboard.

**Each Card Shows:**
- 🏷️ Vault name
- 💰 Total Value Locked (TVL)
- 📈 Annual Percentage Yield (APY)
- 📊 24-hour performance (+/- %)
- 🎯 Risk score (1-5 stars)
- 🔗 Blockchain address (if deployed)
- ⚙️ Management and performance fees

### Card Actions

- **View Details**: Click card to see full configuration
- **Deploy**: Launch deployment process
- **View on Etherscan**: See blockchain transaction (deployed vaults)

### Vault Status Indicators

**Mock (Not Deployed):**
- Status: "Mock Deployment"
- Simulated for testing
- No blockchain transaction

**Deployed:**
- Status: "Deployed"
- Shows vault address
- Shows transaction hash
- Clickable Etherscan link

---

## Strategy Selection

### Understanding Strategy Metrics

**APY (Annual Percentage Yield):**
- Expected yearly returns
- Historical average
- Not guaranteed

**Risk Score (1-5):**
- 1: Very Safe (stablecoins, established protocols)
- 2: Safe (blue-chip lending)
- 3: Moderate (swaps, optimized yields)
- 4: Aggressive (DEX LPs, leverage)
- 5: Very Aggressive (exotic derivatives)

### Strategy Categorization

**By Risk:**
- **Conservative (1-2)**: Aave, Compound, Curve stables, Lido
- **Moderate (3)**: IPOR swaps, Morpho, Balancer
- **Aggressive (4-5)**: Uniswap V3, exotic pairs, leverage

**By Type:**
- **Fixed Income**: Lending protocols (Aave, Compound)
- **Derivatives**: IPOR interest rate swaps
- **Trading Fees**: DEX liquidity (Uniswap, Curve)
- **Staking Yield**: ETH staking (Lido, Rocket Pool)

### Diversification Tips

1. **Mix Strategy Types**
   - Don't put 100% in one category
   - Combine lending + swaps + liquidity

2. **Balance Risk**
   - Pair safe strategies with aggressive ones
   - Keep total risk score under 3 for conservative

3. **Consider Correlation**
   - USDC/USDT strategies move together
   - Add ETH exposure for diversification

4. **Liquidity Planning**
   - Some strategies have lock-up periods
   - Plan for withdrawal needs

---

## Deployment Process

### Prerequisites

Before deploying:
- ✅ Wallet connected
- ✅ Correct network selected (Sepolia for test)
- ✅ Sufficient ETH for gas fees
- ✅ Vault configuration complete (100% allocated)

### Deployment Steps

1. **Initiate Deployment**
   - Click "Deploy Vault" on vault card
   - Or select "Deploy" in creation wizard

2. **Review Configuration**
   - Verify all strategies
   - Check allocations
   - Confirm fees

3. **Estimate Gas**
   - System estimates gas costs
   - Shows ETH required
   - Displays USD equivalent

4. **Confirm in Wallet**
   - Review transaction in wallet
   - Approve gas fee
   - Submit transaction

5. **Wait for Confirmation**
   - Transaction processing
   - Progress indicator shown
   - Usually 15 seconds - 2 minutes

6. **Deployment Complete**
   - Receive vault address
   - Get transaction hash
   - View on block explorer

### Gas Cost Estimates

**Sepolia (Test):**
- Cost: ~0.001-0.003 ETH
- Free test ETH from faucets

**Mainnet:**
- Cost: Varies by network congestion
- Typically $20-$100 USD
- Check gas prices before deploying

### Post-Deployment

After successful deployment:
- 📋 Vault address stored locally
- 🔗 Transaction hash saved
- 🌐 Viewable on Etherscan
- 📊 Metrics updated automatically

### Troubleshooting Deployment

**"Insufficient Funds":**
- Get more ETH from faucet (testnet)
- Add ETH to wallet (mainnet)

**"Transaction Failed":**
- Check network connection
- Verify gas limit
- Try again with higher gas price

**"Wrong Network":**
- Switch to correct network in wallet
- Refresh page
- Reconnect wallet

---

## Best Practices

### For Beginners

1. **Start Small**: Create mock vaults first
2. **Test on Sepolia**: Always test before mainnet
3. **Use Alpha Bot**: Get recommendations
4. **Conservative Risk**: Keep risk score under 3
5. **Diversify**: Don't put all funds in one strategy

### For Advanced Users

1. **Multiple Vaults**: Create specialized vaults
2. **Rebalancing**: Adjust allocations over time
3. **Python SDK**: Automate with code
4. **Monitor Markets**: Watch interest rate trends
5. **Tax Planning**: Track all transactions

### Security Tips

1. **Never Share Keys**: Keep private keys private
2. **Verify Addresses**: Double-check before deploying
3. **Start Small**: Test with minimal amounts
4. **Use Hardware Wallets**: For large amounts
5. **Backup Everything**: Save vault configurations

---

## Frequently Asked Questions

### General Questions

**Q: Is this platform free to use?**
A: The UI is free. Blockchain deployments cost gas fees.

**Q: Can I edit a vault after creation?**
A: Currently, create new vaults for different allocations.

**Q: Are my vaults secure?**
A: Built on audited IPOR protocol. Always test on testnets first.

### Strategy Questions

**Q: What's the minimum investment?**
A: Depends on the blockchain. Test with small amounts first.

**Q: Can I remove strategies later?**
A: Use Python SDK for strategy management post-deployment.

**Q: How often should I rebalance?**
A: Depends on market conditions. Monthly is common.

### Technical Questions

**Q: Which blockchain networks are supported?**
A: Ethereum Mainnet and Sepolia testnet currently.

**Q: Can I use this on mobile?**
A: Yes, responsive design works on mobile browsers.

**Q: How do I get my vault data via API?**
A: See Developer Tools for Python SDK examples.

---

## Additional Resources

### Documentation
- **Main Docs**: https://docs.ipor.io
- **Fusion Guide**: https://docs.ipor.io/build-on-fusion/
- **Python SDK**: https://github.com/IPOR-Labs/ipor-fusion.py

### Community
- **Discord**: Join IPOR community
- **Twitter**: Follow @ipor_io
- **GitHub**: Star the repositories

### Support
- Check [ACCESS_GUIDE.md](ACCESS_GUIDE.md) for setup help
- Use [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for commands
- Open GitHub issues for bugs

---

**Ready to build sophisticated DeFi vaults? Start creating!** 🚀
