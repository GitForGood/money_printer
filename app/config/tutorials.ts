import type { TutorialContent, PageId } from '../../types/tutorial'

/**
 * Tutorial content for each page
 * 
 * These tutorials explain the core mechanics and UI of each page.
 * They are shown automatically on first visit and can be re-accessed via the help button.
 */
export const TUTORIALS: Record<PageId, TutorialContent> = {
    dashboard: {
        pageId: 'dashboard',
        title: 'EXECUTIVE DASHBOARD',
        content: `> SYSTEM ORIENTATION: FINANCIAL COMMAND CENTER

Welcome to your Executive Dashboard, Operator. This is your primary interface for monitoring financial health and operational status.

KEY METRICS:
• NET WORTH: Total value of all assets minus total debt. This is your score.
• LIQUID CASH: Available funds for immediate deployment.
• TOTAL DEBT: Principal owed across all loan instruments.
• QTR INCOME: Projected revenue per quarter (dividends, business profits).
• QTR EXPENSE: Projected costs per quarter (interest, overhead).

SYSTEM NOTIFICATIONS:
Critical alerts and pending events appear here. Events may require immediate action.

QUARTERLY CYCLE:
The game operates on a 1 Day = 1 Quarter system. Time advances automatically at midnight UTC. Plan your moves carefully - your decisions compound over time.`,
        tips: [
            'The goal is simple: Make Number Go Up.',
            'Leverage is the engine. Use debt to acquire income-generating assets.',
            'Pay attention to QTR EXPENSE vs QTR INCOME. Negative cash flow = trouble.',
        ]
    },

    assets: {
        pageId: 'assets',
        title: 'ASSET PORTFOLIO MANAGEMENT',
        content: `> SYSTEM ORIENTATION: HOLDINGS TERMINAL

This terminal displays all assets under your control. Assets are the foundation of wealth accumulation.

ASSET TYPES:
• STOCKS: High liquidity, dividend income, subject to market volatility.
• REAL ESTATE: Steady rental income, high collateral value, low liquidity.
• BUSINESS: Active management required, high risk/reward potential.

ROI CALCULATION:
Return on Investment shows unrealized gains/losses. Green = profit, Red = loss.

OPERATIONS:
• Select any asset to view detailed analytics in the right panel.
• SELL: Liquidate the asset at current market value (subject to tax).
• RENOVATE: (Real Estate) Improve condition and rental yield.
• REFINANCE: Pull out cash against appreciated value.

STRATEGY NOTE:
Selling assets triggers capital gains tax. The wealthy avoid selling - they borrow against assets instead (Buy, Borrow, Die).`,
        tips: [
            'Diversification reduces risk. Don\'t put everything in one sector.',
            'High-condition real estate offers better loan-to-value ratios.',
            'Business ventures require active management but can scale exponentially.',
        ]
    },

    loans: {
        pageId: 'loans',
        title: 'DEBT INSTRUMENT MANAGEMENT',
        content: `> SYSTEM ORIENTATION: LEVERAGE CONTROL

Debt is not your enemy - it is your primary tool for wealth generation. This terminal manages all active loan instruments.

LOAN MECHANICS:
• PRINCIPAL: The original loan amount.
• REMAINING: How much you still owe.
• RATE (D): Daily interest rate (compounds aggressively).
• TERM: Duration in days (∞ = revolving credit line).

COLLATERAL:
Most loans are secured against specific assets. If asset value drops below safety threshold, you face MARGIN CALL - forced liquidation at a discount.

PAYMENT STRATEGY:
• Minimum: Cover interest to avoid default.
• Aggressive: Pay down principal to reduce long-term costs.
• Refinance: If your asset has appreciated, refinance to pull out more tax-free cash.

CRITICAL WARNING:
Interest compounds daily. A 0.05% daily rate = ~18% annual. Respect the mathematics or they will consume you.`,
        tips: [
            'The wealthy use loans to avoid income tax. Borrowed money is not taxed.',
            'Refinancing appreciated assets is how you "make money printer go brrrr".',
            'Always maintain liquidity buffer. Missing a payment = catastrophic.',
        ]
    },

    search: {
        pageId: 'search',
        title: 'MARKETPLACE TERMINAL',
        content: `> SYSTEM ORIENTATION: ASSET ACQUISITION

The Marketplace Terminal provides access to all available investment opportunities. Two primary markets:

GLOBAL EQUITIES (STOCKS):
• Sortable by VOL (volatility), DIV (dividend yield), PRICE.
• OWNERSHIP: Track your position as percentage of total shares.
• Highly liquid - buy/sell instantly.
• Subject to market fluctuations and quarterly events.

LOCAL ASSETS (REAL ESTATE / BUSINESS):
• VALUATION: Purchase price (usually negotiable).
• One-time acquisition - once purchased, asset becomes exclusively yours.
• System-generated listings refresh periodically.

TRADING MECHANICS:
• BUY: Instant execution at current market price.
• SELL: Available on stocks you own (from Asset Portfolio).
• Trades consume Instant AP (refreshes daily).

MARKET INTELLIGENCE:
• VOL indicates risk level. High volatility = high potential gain/loss.
• DIV shows passive income rate. Essential for cash flow strategy.
• Click any listing to inspect detailed data in right panel.

STRATEGY:
Diversify across sectors. Monitor ownership percentage - acquiring majority stake in a company unlocks special actions.`,
        tips: [
            'High dividend stocks = passive income without selling.',
            'Real estate offers best collateral value for borrowing.',
            'Business listings show QTR REVENUE - ensure it covers your expenses.',
        ]
    },
}

/**
 * Get tutorial content for a specific page
 */
export function getTutorial(pageId: PageId): TutorialContent {
    return TUTORIALS[pageId]
}

/**
 * Get all tutorial page IDs
 */
export function getAllPageIds(): PageId[] {
    return Object.keys(TUTORIALS) as PageId[]
}
