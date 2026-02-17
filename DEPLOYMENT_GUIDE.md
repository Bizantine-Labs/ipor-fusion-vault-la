# IPOR Fusion Vault Deployment Integration Guide

This document explains how to integrate the IPOR Fusion frontend with actual blockchain deployments using the IPOR Fusion Python SDK.

## Current Implementation

The current implementation provides a **simulation mode** that demonstrates the full deployment workflow without requiring actual blockchain connections. This allows users to:

- Configure vaults with strategies and allocations
- Simulate the deployment process
- Visualize deployment status and vault addresses
- Experience the complete user flow

## Architecture

### Frontend (Browser/React)
- Vault configuration UI
- Strategy selection and allocation
- Deployment dialog and wallet connection
- Mock deployment simulation

### Backend Integration Points
The following functions in `src/lib/deployment.ts` are designed to be replaced with real backend API calls:

1. **`connectWallet()`** - Currently uses `window.ethereum` for Web3 wallet connection
2. **`deployVault(config)`** - Currently simulates deployment, should call backend API
3. **`estimateGasCost(config)`** - Currently provides mock estimates

## Integration Options

### Option 1: Backend API Server (Recommended)

Create a backend service that wraps the IPOR Fusion Python SDK and exposes REST API endpoints.

#### Backend Setup (Python/Flask Example)

```python
from flask import Flask, request, jsonify
from ipor_fusion import IporFusionSDK
from ipor_fusion.PlasmaVault import PlasmaVault
from ipor_fusion.strategies import *

app = Flask(__name__)

# Initialize SDK (securely manage private keys!)
sdk = IporFusionSDK(
    network="sepolia",  # or mainnet
    private_key=os.environ.get("DEPLOYER_PRIVATE_KEY")
)

@app.route('/api/deploy-vault', methods=['POST'])
def deploy_vault():
    data = request.json
    
    try:
        # Map frontend config to SDK parameters
        vault_config = {
            "name": data['vault']['name'],
            "asset": data['vault']['asset'],
            "strategies": []
        }
        
        # Convert strategy allocations to SDK strategy objects
        for strategy_alloc in data['vault']['strategies']:
            strategy_id = strategy_alloc['strategyId']
            allocation = strategy_alloc['allocation'] / 100  # Convert percentage
            
            # Map strategy IDs to SDK strategy classes
            if 'ipor' in strategy_id:
                strategy = IPORSwapStrategy(
                    allocation=allocation,
                    swap_type="pay_fixed" if "pay-fixed" in strategy_id else "receive_fixed"
                )
            elif 'aave' in strategy_id:
                strategy = AaveV3Strategy(allocation=allocation)
            # ... add more strategy mappings
            
            vault_config['strategies'].append(strategy)
        
        # Deploy vault using SDK
        vault = sdk.create_vault(**vault_config)
        tx_hash = vault.deploy()
        
        return jsonify({
            'success': True,
            'vaultAddress': vault.address,
            'transactionHash': tx_hash,
            'timestamp': int(time.time() * 1000)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': int(time.time() * 1000)
        }), 400

@app.route('/api/estimate-gas', methods=['POST'])
def estimate_gas():
    data = request.json
    # Use SDK to estimate actual gas costs
    estimate = sdk.estimate_deployment_cost(data['vault'])
    return jsonify({
        'gasLimit': str(estimate['gas_limit']),
        'estimatedCost': str(estimate['cost_eth'])
    })

if __name__ == '__main__':
    app.run(port=5000)
```

#### Frontend Integration

Update `src/lib/deployment.ts` to call the backend:

```typescript
export async function deployVault(config: DeploymentConfig): Promise<DeploymentResult> {
  try {
    const response = await fetch('http://localhost:5000/api/deploy-vault', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    })
    
    const result = await response.json()
    return result
    
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Deployment failed',
      timestamp: Date.now()
    }
  }
}
```

### Option 2: Direct Web3 Integration

For simpler deployments, you can integrate directly with Web3 and IPOR smart contracts from the frontend (requires contract ABIs and deployed addresses).

### Option 3: Serverless Functions

Deploy the Python SDK backend as serverless functions (AWS Lambda, Vercel Functions, etc.) with secure key management.

## Security Considerations

### Critical Security Requirements

1. **Never expose private keys in frontend code**
   - All deployment transactions must be signed server-side
   - Use secure key management (AWS KMS, HashiCorp Vault, etc.)

2. **Authentication & Authorization**
   - Implement user authentication
   - Verify user has permission to deploy vaults
   - Rate limit deployment requests

3. **Wallet Connection**
   - Keep `connectWallet()` on frontend for user address verification
   - Never request or handle private keys in browser
   - Use the wallet address to associate deployed vaults with users

4. **Transaction Verification**
   - Verify all transaction parameters server-side
   - Validate strategy configurations against allowed protocols
   - Check gas prices and set reasonable limits

## Environment Variables

### Backend (.env)

```bash
# Network Configuration
IPOR_NETWORK=sepolia  # or mainnet
RPC_ENDPOINT=https://sepolia.infura.io/v3/YOUR_KEY

# Deployment Wallet (SECURE!)
DEPLOYER_PRIVATE_KEY=0x...

# API Configuration
API_PORT=5000
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com

# Optional: Database for tracking deployments
DATABASE_URL=postgresql://...
```

### Frontend (.env)

```bash
# Backend API
VITE_API_URL=http://localhost:5000
VITE_API_KEY=your-api-key

# Network Info (for display purposes)
VITE_DEFAULT_NETWORK=sepolia
```

## Deployment Flow

### Complete User Flow

1. **User configures vault** → Frontend validates configuration
2. **User clicks "Deploy"** → DeployVaultDialog opens
3. **User connects wallet** → `connectWallet()` gets user address
4. **User confirms deployment** → Frontend sends config to backend API
5. **Backend validates** → Checks auth, validates strategies
6. **Backend deploys** → Uses IPOR Python SDK to deploy vault
7. **Backend returns result** → Vault address + transaction hash
8. **Frontend updates** → Shows success, stores vault data with `useKV`

### Data Persistence

Deployed vaults are stored locally using `useKV`:

```typescript
const vault: Vault = {
  ...config,
  id: `vault-${Date.now()}`,
  deploymentStatus: 'deployed',
  vaultAddress: '0x...',
  transactionHash: '0x...',
  network: 'sepolia'
}

setVaults((current) => [...current, vault])
```

For production, consider also storing vault data in a backend database.

## Testing

### Test on Testnet First

1. Deploy to Sepolia testnet
2. Get testnet ETH from faucet
3. Test full deployment flow
4. Verify vault on Etherscan
5. Test deposits and withdrawals

### Mock Mode (Current Implementation)

The current mock implementation is useful for:
- UI/UX development and testing
- Demos and presentations
- User onboarding flows
- Frontend testing without backend

## Next Steps

1. **Set up backend service** with IPOR Fusion Python SDK
2. **Implement authentication** for vault deployment
3. **Configure secure key management** for deployment wallet
4. **Replace mock functions** in `deployment.ts` with API calls
5. **Add database** to track deployed vaults across users
6. **Implement monitoring** for deployed vaults (TVL, APY updates)
7. **Add transaction tracking** with status updates

## Resources

- **IPOR Fusion Python SDK**: https://github.com/IPOR-Labs/ipor-fusion.py
- **IPOR Documentation**: https://docs.ipor.io
- **Developer Guide**: https://docs.ipor.io/build-on-fusion/developer-guide/
- **Smart Contracts**: https://github.com/IPOR-Labs/ipor-fusion

## Support

For questions or issues:
1. Review IPOR Fusion documentation
2. Check the Python SDK GitHub repository
3. Join IPOR Discord community
4. Contact IPOR Labs team

---

**Note**: Always test thoroughly on testnets before mainnet deployment. Never commit private keys to version control.
