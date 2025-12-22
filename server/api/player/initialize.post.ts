import { defineEventHandler, createError, readBody } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'
import { getProfileDefaults, getStatsDefaults } from '../../config/beginner-player-template'

/**
 * Initialize a new player with template defaults
 * 
 * This endpoint creates:
 * - Profile entry (if not exists)
 * - Player stats entry with template defaults
 * - Tutorial state entries for all pages
 */
export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // Check if player_stats already exists
    const { data: existingStats } = await client
        .from('player_stats')
        .select('user_id')
        .eq('user_id', user.id)
        .single()

    if (existingStats) {
        return {
            success: false,
            message: 'Player already initialized',
            alreadyExists: true
        }
    }

    // Create profile if it doesn't exist
    const profileDefaults = getProfileDefaults(user.email)
    const { error: profileError } = await client
        .from('profiles')
        .upsert({
            id: user.id,
            ...profileDefaults
        })

    if (profileError) {
        console.error('Profile creation error:', profileError)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create profile'
        })
    }

    // Create player_stats with template defaults
    const statsDefaults = getStatsDefaults()
    const { error: statsError } = await client
        .from('player_stats')
        .insert({
            user_id: user.id,
            ...statsDefaults
        })

    if (statsError) {
        console.error('Stats creation error:', statsError)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create player stats'
        })
    }

    // Initialize tutorial state using database function
    const { error: tutorialError } = await client
        .rpc('initialize_tutorial_state', { p_user_id: user.id })

    if (tutorialError) {
        console.error('Tutorial state initialization error:', tutorialError)
        // Non-fatal - continue anyway
    }

    return {
        success: true,
        message: 'Player initialized successfully',
        userId: user.id
    }
})
