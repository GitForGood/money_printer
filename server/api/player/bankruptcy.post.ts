import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'
import { getStatsDefaults } from '../../config/beginner-player-template'

/**
 * Declare Bankruptcy - Complete Profile Reset
 * 
 * This endpoint:
 * - Deletes all player assets
 * - Deletes all player loans
 * - Resets player_stats to template defaults
 * - Resets tutorial state (tutorials will show again)
 * 
 * WARNING: This action is irreversible!
 */
export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    try {
        // Delete all assets owned by this user
        const { error: assetsError } = await client
            .from('assets')
            .delete()
            .eq('owner_id', user.id)

        if (assetsError) {
            console.error('Error deleting assets:', assetsError)
            throw new Error('Failed to delete assets')
        }

        // Delete all loans for this user
        const { error: loansError } = await client
            .from('loans')
            .delete()
            .eq('borrower_id', user.id)

        if (loansError) {
            console.error('Error deleting loans:', loansError)
            throw new Error('Failed to delete loans')
        }

        // Reset player_stats to template defaults
        const statsDefaults = getStatsDefaults()
        const { error: statsError } = await client
            .from('player_stats')
            .update(statsDefaults)
            .eq('user_id', user.id)

        if (statsError) {
            console.error('Error resetting stats:', statsError)
            throw new Error('Failed to reset stats')
        }

        // Reset tutorial state using database function
        const { error: tutorialError } = await client
            .rpc('reset_tutorial_state', { p_user_id: user.id })

        if (tutorialError) {
            console.error('Error resetting tutorial state:', tutorialError)
            // Non-fatal - continue anyway
        }

        return {
            success: true,
            message: 'Bankruptcy declared. All assets liquidated, debts cleared, stats reset to beginner template.',
            userId: user.id
        }
    } catch (error: any) {
        console.error('Bankruptcy error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to complete bankruptcy reset'
        })
    }
})
