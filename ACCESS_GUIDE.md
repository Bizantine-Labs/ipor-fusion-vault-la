# 🚀 Quick Start Guide: Accessing the IPOR Fusion Vault

The IPOR Fusion Vault Management Platform is now **LIVE** and ready to use! Follow these simple steps to access and use the application.

---

## 📍 Access URLs

### Local Development (Recommended for Development)
```
http://localhost:5000/ipor-fusion-vault-la/
```

### Production Deployment (GitHub Pages)
```
https://[your-username].github.io/ipor-fusion-vault-la/
```
> Note: Replace `[your-username]` with your GitHub username or organization name

---

## 🎯 Quick Start (3 Steps)

### 1. Launch the Application

**For Local Development:**
```bash
# Navigate to the project directory
cd /path/to/ipor-fusion-vault-la

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The application will be available at: **http://localhost:5000/ipor-fusion-vault-la/**

**For Production:**
The app is automatically deployed to GitHub Pages on every push to the `main` branch. Access it via your GitHub Pages URL.

### 2. Open in Your Browser

Navigate to the URL in your preferred web browser:
- **Chrome** (Recommended for Web3)
- **Firefox**
- **Brave**
- **Edge**

### 3. Start Using the Vault

You can now:
- ✅ **Create vaults** with multiple DeFi strategies
- ✅ **Configure strategies** across IPOR, Aave, Compound, Uniswap, etc.
- ✅ **Allocate capital** with visual sliders and risk assessment
- ✅ **Chat with Alpha Bot** for AI-powered strategy recommendations
- ✅ **Explore Developer Tools** for Python SDK examples
- ✅ **Learn about IPOR** protocol and interest rate derivatives

---

## 🔌 Web3 Wallet Connection (Optional)

To deploy vaults to blockchain networks, connect a Web3 wallet:

### Install MetaMask
1. Visit https://metamask.io
2. Install the browser extension
3. Create or import a wallet
4. Add test networks (Sepolia recommended for testing)

### Connect in the App
1. Click **"Connect Wallet"** in the top right
2. Approve the connection in MetaMask
3. Select your network (Sepolia for testing, Mainnet for production)
4. Ensure you have sufficient ETH for gas fees

### Get Test ETH (Sepolia)
For testing on Sepolia testnet:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia
- https://faucet.quicknode.com/ethereum/sepolia

---

## 📱 Features & How to Use

### 1. Create a Vault
Click **"Create Vault"** → Follow the wizard:
- **Step 1:** Configure vault name, asset (USDC, USDT, DAI, ETH), and fees
- **Step 2:** Select strategies from 14+ protocols
- **Step 3:** Allocate capital percentages (must total 100%)
- **Step 4:** Review and deploy

### 2. Alpha Bot AI Assistant
Click **"Ask Alpha Bot"** to:
- Get strategy recommendations
- Understand IPOR swaps and hedging
- Optimize vault allocations
- Learn about Python SDK usage

### 3. Developer Tools
Access **"Developer Tools"** tab to:
- View Python SDK installation guide
- Copy code examples for vault creation
- Learn programmatic strategy management
- Explore monitoring and analytics APIs

### 4. IPOR Protocol Education
Click **"Learn About IPOR"** to understand:
- Interest rate derivatives
- Pay-fixed and receive-fixed swaps
- Fusion vault architecture
- Risk management strategies

---

## 🎨 User Interface Overview

The platform features:
- **Dark Professional Theme**: Navy background with teal/lime accents
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Animated Interactions**: Smooth transitions with Framer Motion
- **Real-time Updates**: Live risk scoring and APY calculations
- **Persistent Storage**: Your vaults are automatically saved

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## 🌐 Network Configuration

### Testnet (Recommended First)
- **Network:** Sepolia
- **Purpose:** Safe testing without real funds
- **Gas Fees:** Very low (testnet ETH is free)

### Mainnet (Production)
- **Network:** Ethereum Mainnet
- **Purpose:** Real vault deployments
- **Gas Fees:** Real ETH required

### Supported Assets
- USDC (USD Coin)
- USDT (Tether)
- DAI (Dai Stablecoin)
- ETH (Ether)

---

## 📊 Available Strategies

### IPOR Swaps (Interest Rate Derivatives)
- Pay-Fixed USDC 28D - Hedge against rising rates
- Receive-Fixed USDC 28D - Earn from falling rates
- Pay-Fixed USDT 28D - Tether rate hedging
- Receive-Fixed USDT 28D - Tether rate exposure

### Lending Protocols
- Aave V3 USDC - Top lending protocol
- Compound V3 USDC - Established money market
- Morpho Aave USDC - Optimized Aave yields

### Liquidity Provision
- Uniswap V3 USDC/ETH - Concentrated liquidity DEX
- Curve USDC/USDT - Stablecoin pools
- Balancer USDC/DAI/USDT - Multi-asset pools

### Staking
- Lido stETH - Liquid Ethereum staking
- Rocket Pool rETH - Decentralized ETH staking
- Frax sfrxETH - Frax staked Ether

---

## 🔍 Monitoring Your Vaults

After creating vaults, you can:
- **View vault cards** on the main dashboard
- **Track TVL** (Total Value Locked)
- **Monitor APY** (Annual Percentage Yield)
- **Check 24h performance**
- **Review strategy allocations**
- **View risk scores** (1-5 scale)

---

## 💡 Pro Tips

1. **Start on Testnet**: Always test on Sepolia before mainnet deployment
2. **Diversify Strategies**: Spread capital across multiple protocols
3. **Monitor Risk**: Keep risk score below 4 for conservative strategies
4. **Use Alpha Bot**: Get AI recommendations for optimal allocations
5. **Check Gas Prices**: Deploy during low network activity for cheaper gas
6. **Save Configurations**: Vaults are automatically saved in browser storage

---

## 🆘 Troubleshooting

### App Won't Load
- Check your internet connection
- Clear browser cache and reload
- Try a different browser
- Ensure JavaScript is enabled

### Can't Connect Wallet
- Install MetaMask or another Web3 wallet
- Approve the connection request
- Check that you're on the correct network
- Refresh the page and try again

### Deployment Fails
- Ensure sufficient ETH for gas fees
- Check wallet is connected to correct network
- Verify vault configuration totals 100%
- Try again during lower network congestion

### Strategies Don't Add to 100%
- Adjust sliders until total reaches exactly 100%
- The "Deploy" button only activates at 100%
- Use the percentage indicators to guide you

---

## 📚 Additional Resources

### Documentation
- **IPOR Docs**: https://docs.ipor.io
- **Fusion Guide**: https://docs.ipor.io/build-on-fusion/
- **Python SDK**: https://github.com/IPOR-Labs/ipor-fusion.py
- **Developer Guide**: https://docs.ipor.io/build-on-fusion/developer-guide/

### Community & Support
- **IPOR Discord**: Join for community support
- **GitHub Issues**: Report bugs or request features
- **IPOR Twitter**: Follow for updates

### Code Examples
See the **Developer Tools** panel in the app for:
- Vault creation examples
- Strategy management code
- Monitoring & analytics
- Python SDK integration

---

## 🔐 Security Notes

- **Never share your private keys**
- **Test on Sepolia before mainnet**
- **Start with small amounts**
- **Verify contract addresses**
- **Use hardware wallets for large amounts**
- **Keep seed phrases secure and offline**

---

## 🚀 Next Steps

1. ✅ **Launch the app** using the commands above
2. ✅ **Explore the interface** without connecting a wallet
3. ✅ **Create a test vault** to see the configuration flow
4. ✅ **Chat with Alpha Bot** for personalized recommendations
5. ✅ **Review Developer Tools** for Python SDK examples
6. ✅ **Connect a wallet** when ready to deploy
7. ✅ **Test on Sepolia** before any mainnet deployment
8. ✅ **Deploy your first vault** and monitor performance

---

## 📞 Support

Need help? Here's how to get support:

1. **Check this guide** for common issues
2. **Review IPOR documentation** for technical details
3. **Ask in IPOR Discord** for community help
4. **Open a GitHub issue** for bugs or feature requests

---

**Happy Vault Building! 🎉**

The IPOR Fusion Vault platform empowers you to create sophisticated DeFi strategies combining interest rate derivatives with multi-protocol yield optimization. Start exploring today!
