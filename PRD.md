# Planning Guide

A DeFi vault launching platform built on IPOR Fusion that enables users to create and configure sophisticated vaults combining interest rate derivatives with multi-protocol yield strategies for optimized capital deployment and rate hedging.

**Experience Qualities**:
1. **Professional** - Enterprise-grade interface that instills confidence in users managing significant capital with clear information hierarchy and robust validation
2. **Transparent** - All vault parameters, risks, IPOR swap positions, and configurations are clearly visible with real-time feedback on selections and their implications
3. **Efficient** - Streamlined vault creation workflow that guides users from strategy selection through deployment without unnecessary friction, with AI-powered optimization

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)

This requires multiple interconnected views for vault configuration, strategy selection (including IPOR interest rate derivatives), parameter setting, risk assessment, and deployment confirmation. The app handles complex DeFi concepts, real-time validation, multi-strategy fusion vaults, and multi-step workflows that need sophisticated state management.

## Essential Features

### Vault Configuration Builder
- **Functionality**: Multi-step form allowing users to define vault parameters including name, description, asset types, fee structures, and access controls
- **Purpose**: Provides structured approach to defining all necessary vault characteristics before deployment
- **Trigger**: User clicks "Create New Vault" from dashboard
- **Progression**: Select vault type → Configure basic parameters (name, description, assets) → Set fee structure (management, performance fees) → Define access controls (public/private, allowlist) → Review summary → Deploy
- **Success criteria**: All required fields validated, gas estimation provided, successful transaction submission with confirmation

### Strategy Selection & Allocation
- **Functionality**: Interface for selecting yield strategies including IPOR interest rate swaps (pay fixed/receive fixed), lending protocols, liquidity provision, derivatives, and staking, with capital allocation percentages across strategies
- **Purpose**: Enables diversification and optimization of yield sources within a single vault, with IPOR derivatives for rate hedging
- **Trigger**: Reached during vault configuration workflow
- **Progression**: View available strategies including IPOR swaps with rate estimates → Select strategies from marketplace → Set allocation percentages with visual slider → Validate allocations sum to 100% → Configure strategy-specific parameters → Confirm selections
- **Success criteria**: At least one strategy selected, allocations total 100%, strategy parameters validated, risk profile displayed, IPOR swap positions clearly explained

### Risk Assessment Dashboard
- **Functionality**: Real-time calculation and visualization of vault risk metrics based on selected strategies and parameters
- **Purpose**: Helps vault creators understand the risk profile before deployment and make informed decisions
- **Trigger**: Automatically updates as user configures vault parameters and strategies
- **Progression**: Display initial risk score → Update metrics as parameters change → Show breakdown by risk category (smart contract, liquidity, market) → Highlight high-risk configurations → Provide recommendations
- **Success criteria**: Risk score calculated accurately, visual indicators clear, recommendations actionable

### Vault Dashboard & Management
- **Functionality**: Overview of created vaults with key metrics (TVL, APY, performance), access to vault settings, and ability to adjust parameters
- **Purpose**: Central hub for monitoring and managing deployed vaults
- **Trigger**: User navigates to "My Vaults" section
- **Progression**: Display vault cards with summary metrics → Click vault to view details → Access configuration panel → Modify adjustable parameters → Submit changes → Confirm transaction
- **Success criteria**: All vaults displayed with accurate data, parameters updatable where permitted, transaction confirmations received

### Transaction History & Analytics
- **Functionality**: Detailed log of all vault-related transactions (deposits, withdrawals, rebalances, fee collections) with filtering and export capabilities
- **Purpose**: Provides transparency and audit trail for vault operations
- **Trigger**: User navigates to "History" tab within vault details
- **Progression**: Display transaction list → Apply filters (date range, transaction type) → View transaction details → Export data if needed
- **Success criteria**: All transactions displayed accurately, filters work correctly, export generates valid CSV/JSON

### Alpha Bot - AI Strategy Assistant
- **Functionality**: AI-powered chatbot specializing in IPOR protocols that analyzes market conditions, interest rate trends, vault performance, and user goals to provide personalized strategy recommendations including optimal IPOR swap positions and optimization insights
- **Purpose**: Empowers users with intelligent guidance for vault creation and optimization, making complex DeFi strategies and interest rate derivatives accessible
- **Trigger**: User clicks "Ask Alpha Bot" button in header or opens chat panel
- **Progression**: User asks question about IPOR swaps/strategies/markets → Bot analyzes current vaults, interest rate environment, and market data → Generates personalized recommendations with rationale including IPOR derivative positions → User can follow up with clarifying questions → Bot provides actionable insights with specific strategy allocations and rate hedging advice
- **Success criteria**: Bot responds within 3 seconds, provides relevant IPOR-focused strategy recommendations, suggests optimal allocations including swap positions, explains risk/reward tradeoffs and rate exposure clearly

### IPOR Protocol Education
- **Functionality**: Comprehensive information dialog explaining IPOR Fusion, interest rate swaps, available strategies, benefits, and risks
- **Purpose**: Educates users about IPOR's unique capabilities and helps them understand interest rate derivatives before creating vaults
- **Trigger**: User clicks "About IPOR Fusion" button in header
- **Progression**: Open dialog → Browse tabs (Overview, Strategies, Benefits, Risks) → Read detailed explanations → Access external documentation link
- **Success criteria**: Clear explanation of IPOR concepts, strategy types well-documented, risk disclosures comprehensive, external docs easily accessible

### Python SDK Developer Tools
- **Functionality**: Interactive dialog showcasing the IPOR Fusion Python SDK with installation instructions, code examples, IPOR swap examples, and resource links to GitHub and documentation
- **Purpose**: Enable developers to build programmatic integrations with IPOR Fusion, automate vault management, and create custom applications
- **Trigger**: User clicks "Developer Tools" button in header
- **Progression**: Open dialog → Browse tabs (Quick Start, Examples, IPOR Swaps, Resources) → View code examples with copy-to-clipboard → Access GitHub repository and documentation links
- **Success criteria**: SDK installation clear, code examples comprehensive and copyable, IPOR swap examples well-explained, external resources easily accessible

## Edge Case Handling

- **Wallet Disconnection**: Save draft vault configurations to localStorage, restore on reconnection with clear notification
- **Network Congestion**: Display gas price warnings, allow users to set custom gas limits, provide transaction queuing
- **Invalid Strategy Combinations**: Real-time validation prevents incompatible strategy selections with explanatory error messages
- **Partial Configuration Saves**: Auto-save progress every 30 seconds, show "unsaved changes" indicator, prompt before navigation
- **Insufficient Balance**: Clear error messaging with required amounts, disable deploy button, suggest actions
- **Strategy Unavailability**: Grey out unavailable strategies with explanation, suggest alternatives, notify if becomes available
- **API/RPC Failures**: Retry with exponential backoff, fallback to cached data where appropriate, clear error states
- **Duplicate Vault Names**: Append unique identifiers, validate against existing vaults, suggest alternatives

## Design Direction

The design should evoke confidence, sophistication, and cutting-edge financial technology. Users should feel they are interacting with a professional-grade platform that handles their capital with the utmost care. The aesthetic should balance technical precision with approachability - powerful without being intimidating. Visual elements should communicate clarity, structure, and forward-thinking innovation through crisp data visualization, purposeful animation, and a refined color palette that suggests both stability and growth.

## Color Selection

A sophisticated palette combining deep teals and vibrant greens to represent growth and stability in the DeFi space, with warm accents for calls-to-action and a dark, professional foundation.

- **Primary Color**: Deep teal `oklch(0.45 0.12 210)` - Represents trust, stability, and the innovative nature of DeFi protocols, used for key UI elements and navigation
- **Secondary Colors**: Dark navy `oklch(0.15 0.02 240)` for backgrounds creating depth and focus; Muted slate `oklch(0.25 0.015 240)` for cards and surfaces providing subtle elevation
- **Accent Color**: Electric lime `oklch(0.75 0.18 135)` - High-energy growth indicator for CTAs, positive metrics, and interactive elements that demand attention
- **Foreground/Background Pairings**: 
  - Background (Dark Navy #0F1419): Light text `oklch(0.95 0 0)` - Ratio 15.2:1 ✓
  - Card (Muted Slate #1E2329): Light text `oklch(0.95 0 0)` - Ratio 12.8:1 ✓
  - Primary (Deep Teal #2B6B7F): White text `oklch(1 0 0)` - Ratio 5.1:1 ✓
  - Accent (Electric Lime #A8D96C): Dark text `oklch(0.15 0.02 240)` - Ratio 8.9:1 ✓

## Font Selection

The typography should communicate technical expertise and precision while maintaining excellent readability for complex financial data, blending geometric clarity with contemporary sophistication.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Space Grotesk Bold / 36px / -0.02em letter-spacing / 1.2 line-height
  - H2 (Section Headers): Space Grotesk SemiBold / 28px / -0.01em letter-spacing / 1.3 line-height  
  - H3 (Card Titles): Space Grotesk Medium / 20px / normal letter-spacing / 1.4 line-height
  - Body (Primary Content): Inter Regular / 15px / normal letter-spacing / 1.6 line-height
  - Small (Labels/Captions): Inter Medium / 13px / normal letter-spacing / 1.5 line-height
  - Numbers/Metrics: JetBrains Mono Medium / 15px / normal letter-spacing / tabular-nums

## Animations

Animations should enhance comprehension and provide reassuring feedback during critical operations, with particular emphasis on data transitions and state changes. Use smooth, physics-based transitions (300-400ms with ease-out curves) for page navigation and card interactions. Implement micro-interactions for form inputs and buttons that provide immediate tactile feedback (100-150ms). Data visualizations should animate progressively with staggered reveals. Loading states should use skeleton screens with subtle shimmer effects rather than spinners. Success confirmations get a moment of celebration with a subtle scale-and-fade pattern, while errors should pulse gently to draw attention without alarming.

## Component Selection

- **Components**: 
  - Cards with subtle border glow for vault containers and strategy selectors
  - Multi-step form wizard using Tabs component with custom progress indicator
  - Select dropdowns for asset and strategy selection with search functionality
  - Slider for allocation percentages with real-time preview
  - Dialog for deployment confirmation with transaction summary
  - Badge for risk indicators, vault status, and strategy tags
  - Progress bars for showing allocation distributions
  - Tooltip for explaining complex DeFi terms and parameters
  - Accordion for expandable strategy details and advanced options
  - Alert for warnings about risk, gas prices, and system notifications
  - Table for transaction history with sortable columns
  - Input with validation states for vault parameters
  - Switch for toggle options (public/private vaults, notifications)
  - Skeleton for loading states across dashboard metrics

- **Customizations**: 
  - Custom gauge chart component for risk visualization using D3
  - Animated percentage allocation bars with gradient fills
  - Custom vault card with glassmorphism effect and hover elevation
  - Strategy selector grid with interactive preview states
  - Multi-step progress indicator with completion states

- **States**: 
  - Buttons: Default with subtle gradient, hover with scale and brightness increase, active with pressed depth, disabled with reduced opacity and cursor change
  - Inputs: Default with border, focused with glow and border color shift, error with red border and shake animation, success with green check icon
  - Cards: Default with subtle shadow, hover with elevated shadow and border glow, selected with accent border and background shift

- **Icon Selection**: 
  - Vault (for main vault representation), TrendUp/TrendDown (performance metrics), ShieldCheck (security/risk), Lightning (yield/APY), Gear (settings), Plus (create new), ChartLine (analytics), Wallet (balance/connection), Warning (alerts), CheckCircle (success), X (close/remove), CaretRight (navigation), Info (tooltips)

- **Spacing**: 
  - Consistent 16px base unit (Tailwind's default spacing-4)
  - Cards: p-6 padding, gap-4 between elements
  - Sections: mb-8 between major sections, gap-6 within sections
  - Form fields: gap-3 for tight groupings, gap-6 between field groups
  - Dashboard grid: gap-6 for card layouts
  - Buttons: px-6 py-3 for primary actions, px-4 py-2 for secondary

- **Mobile**: 
  - Single column layouts on mobile with full-width cards
  - Collapsible navigation drawer instead of persistent sidebar
  - Simplified vault cards showing only critical metrics, expandable for details
  - Vertical stack for strategy allocations instead of horizontal bars
  - Bottom sheet for deployment confirmation instead of centered dialog
  - Larger touch targets (min 44px) for all interactive elements
  - Sticky header with collapsed wallet info and menu toggle
  - Swipeable tabs for multi-step form progression
