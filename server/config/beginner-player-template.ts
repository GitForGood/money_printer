import type { Database } from '../../types/database.types'

type PlayerStatsInsert = Database['public']['Tables']['player_stats']['Insert']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

/**
 * Beginner Player Template
 * 
 * This template defines the starting state for all new players.
 * Edit these values to globally change the starting conditions for new players.
 */
export const BEGINNER_PLAYER_TEMPLATE = {
    /**
     * Profile defaults
     */
    profile: {
        title: 'Day Trader',
        // username will be derived from email if not provided
    } as Partial<ProfileInsert>,

    /**
     * Player stats defaults
     * All new players start with these values
     */
    stats: {
        // Starting liquid cash
        cash: 10000,

        // Hidden metrics (not visible to player directly)
        heat: 0,           // Regulatory attention (0-100)
        karma: 0,          // Ethical standing (-100 to 100)
        reputation: 0,     // Public reputation (0-100)
        insider_level: 0,  // Access to insider information (0-10)

        // Action Point (AP) System - Instant (daily tasks/trades)
        ap_instant: 10,
        max_ap_instant: 10,

        // Action Point (AP) System - Quarterly (tactical decisions)
        ap_quarterly: 5,
        max_ap_quarterly: 5,

        // Action Point (AP) System - Long-term (strategic projects)
        ap_long_term: 2,
        max_ap_long_term: 2,

        // Legacy AP field (deprecated but kept for compatibility)
        ap: 10,
    } as Partial<PlayerStatsInsert>,

    /**
     * Optional starter assets
     * These assets will be created for new players
     * Leave empty array for no starter assets
     */
    starterAssets: [
        // Example: Give players a small stock position to start
        // {
        //     type: 'stock',
        //     company_ticker: 'TECH', // Must match an existing company
        //     shares: 10,
        //     cost_basis_per_share: 100,
        // }
    ] as Array<{
        type: string
        company_ticker?: string
        shares?: number
        cost_basis_per_share?: number
        name?: string
        base_value?: number
        location?: string
    }>,
}

/**
 * Get profile defaults for a new player
 */
export function getProfileDefaults(email?: string): Partial<ProfileInsert> {
    return {
        ...BEGINNER_PLAYER_TEMPLATE.profile,
        username: email?.split('@')[0] || 'Operator',
    }
}

/**
 * Get stats defaults for a new player
 */
export function getStatsDefaults(): Partial<PlayerStatsInsert> {
    return { ...BEGINNER_PLAYER_TEMPLATE.stats }
}

/**
 * Get starter assets for a new player
 */
export function getStarterAssets() {
    return [...BEGINNER_PLAYER_TEMPLATE.starterAssets]
}
