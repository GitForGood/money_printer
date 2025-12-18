#Money Printer - Game Design Document
## 1. Executive Summary
Title: Money Printer Genre: Economic Simulation / Idle-lite Platform: Web (Responsive: Desktop & Mobile) Core Concept: A realistic, gamified simulation of extreme wealth accumulation using debt, assets, and tax avoidance. Visual Style: "Terminal Chic" – Minimalist, functional, ASCII-influenced, high-contrast, data-dense but readable.

## 2. Core Gameplay Loop
Acquire Assets: Player uses starting capital or debt to buy revenue-generating assets (companies, real estate, stocks).
Leverage: Player takes out loans against the value of these assets (LTV - Loan To Value).
Reinvest: Loan money is not income (no tax); it is used to buy more assets.
Manage: Player manages cash flow to pay interest. If cash flow dips, they must refinance or sell assets.
Optimization: Player hires managers, uses tax shelters (foundations, offshore accounts), and lobbies for regulations to increase efficiency.
Growth: Net worth grows exponentially. The goal is "Number Go Up".
## 3. Mechanics & Economy
### 3.1. Time System
Real-time Clock: The game runs perpetually.
Game Tick: 1 Real-time Day = 1 Financial Quarter (3 months).
Pacing:
Instant Actions: Buying/Selling liquid stocks, taking small payday loans.
Short-term Actions (1 Day/Quarter): Renovation, small business pivot, hiring staff.
Long-term Actions (4 Days/Year): Building new HQ, lobbying for major legislation, corporate acquisitions.
### 3.2. Assets & Business Ventures
Players can create or buy:

Equities: Dividend-paying stocks. High liquidity.
Real Estate: High collateral value, steady rent, low liquidity.
Business Ventures: Player-founded companies. High risk/reward. Requires active choices (Manager hiring, strategy setting).
### 3.3. Debt System (The Engine)
LTV (Loan-To-Value): Safe assets (Real Estate) offer high LTV (e.g., 70%). Volatile assets (Stocks) offer low LTV (e.g., 30%).
Margin Calls: If asset value drops, the bank demands cash. Failure to pay = liquidation of assets at a discount.
Refinancing: As assets appreciate, refinance the loan to pull out more cash tax-free.
### 3.4. Tax System (The Antagonist)
Income Tax: High rate on realized gains and dividends.
Capital Gains: Tax on selling assets for profit.
Strategies to Avoid Tax:
Buy, Borrow, Die: Don't sell assets. Borrow against them. Loans aren't income.
Write-offs: Depreciation of real estate. Business expenses.
Offshore: High setup cost, lowers tax rate, risk of audit/seizure.
### 3.5. Action Economy
Action Points (AP): Player has limited "Attention" or "Bandwidth".
Expansion: Hiring a "CFO" or "Asset Manager" costs salary but essentially buys more automation or AP, allowing concurrent long-term plans.
### 3.6. Event System & Hidden Metrics
Heat & Karma (Hidden Stats): Certain actions (skirting taxes, layoffs, aggressive takeovers) increase "Heat" or "Karma". The player cannot see the exact values, but messages from "Associates" will hint at it.
Triggered Events: High "Heat" might trigger audits, protests, or regulatory crackdowns. Low "Karma" might lead to internal sabotage or PR disasters.
Stacking Effects: Small events stack. A series of minor labor violations might eventually trigger a massive general strike that halts all production for a quarter.
### 3.7. Brutal Efficiency (The Dark Path)
Players can engage in high-risk, high-reward black market or unethical tactics:

Sabotage: Target a competitor's asset to lower its value before a hostile takeover.
Espionage: Pay to see a competitor's (or NPC's) hidden stats, upcoming plans, or tax leaks.
Bribing: Bribe officials to lower "Heat" or secure "Subsidies".
Risk: As the player's profile grows, they become targets of the same tactics from rival NPCs (and eventually players).
3.8. Business Ecosystem & Supply Chains
Instead of isolated assets, businesses now interact:

Sector Types:
Retail (Groceries, Electronics): High cash flow, depends on Suppliers.
Service (Maintenance, Repair, Cleaning): Moderate cash flow, depends on Supplies/Equipment.
Manufacturing (Suppliers): High overhead, depends on Services and Logistics.
Emergent Complexity: If the player owns both a Retail chain and the Supplier that feeds it, they get a "Vertical Integration" bonus (reduced costs). If they only own the Retail side and the local Supplier shuts down (due to a strike or sabotage), their Retail profits plummet until a new supplier is found.

### 3.9. Events
Players can trigger events by:

- Acquiring assets
- Taking out loans
- Hiring staff
- Engaging in unethical practices

These events are triggered by the game, not by the player. These events should present the player with a course of action with some hints of the general direction of the outcomes but should keep away from specifics and should be a bit cryptic. The effects can be something like "You have been targeted by a competitor" or "You have been audited by the IRS". The player should then have to make a decision based on their current state and the hints given. An event should be blocking - requiring the player to make a decision before the game can continue. If a player exits the game before resolving it they will be prompted to resolve it when they return. 

## 4. User Interface & Experience (UI/UX)
Philosophy: "Bloomberg Terminal meets Text Adventure".

Visuals: Monospaced fonts, raw data tables, ASCII charts.
Responsiveness:
Desktop: Dashboard view. multiple panels visible.
Mobile: Stacked view. Swipe between portfolios/news/actions.
Feedback: Satisfying "clack" sounds, number tickers rolling up.
Bland but Stylized: Avoid "cartoony" graphics. It should feel like serious financial software, but gamified with clear progress bars and alerts.

## 5. Future Multiplayer
Market Listing: Successful player companies can IPO. Other players can buy stock in them.
Leaderboards: "Forbes List" equivalent.

## 6. Technical Architecture
### 6.1. Stack
Frontend: Nuxt (Vue 3) + Tailwind CSS.
Backend/DB: Supabase (PostgreSQL).
State Management: Pinia (Client), Postgres (Server).
### 6.2. Key Technologies Needed
Scheduling (pg_cron): Essential for the "1 Day = 1 Quarter" mechanic. The database needs to trigger interest calculations, dividend payouts, and event resolution automatically at a set time (e.g., midnight UTC) or continuously.
Real-time (Supabase Realtime): To push updates (market crashes, completed actions) to the client immediately without refreshing.
Charts: asciichart (for text-based graphs) or a minimal charting lib (Chart.js with custom "retro" config).
Icons: lucide-vue-next (clean, crisp, capable of fitting the aesthetic).
### 6.3. Data Structure Plan (Rough Draft)
users: portfolio_value, cash, bandwidth_limit.
assets: type, value, volatility, income_rate, owner_id.
loans: principal, interest_rate, collateral_asset_id.
events: type (market_crash, boom), duration.