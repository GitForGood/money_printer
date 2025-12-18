import { defineEventHandler, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { PlayerProfile } from '../../../types/player'

export default defineEventHandler(async (event): Promise<PlayerProfile> => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    // Fetch Profile (Assume 'profiles' table linked to auth.users)
    const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch Stats (Assume 'player_stats' table)
    const { data: stats, error: statsError } = await client
        .from('player_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

    // Handle missing data gracefully by returning defaults
    // In a real production app, we might want to ensure these records exist on signup.

    return {
        id: user.id,
        username: profile?.username || user.email?.split('@')[0] || 'Operator',
        title: profile?.title || 'Day Trader',
        stats: {
            heat: stats?.heat || 0,
            karma: stats?.karma || 0,
            reputation: stats?.reputation || 0,
            insiderLevel: stats?.insider_level || 0
        },
        level: stats?.level || 1,
        xp: stats?.xp || 0,
        nextLevelXp: ((stats?.level || 1) * 1000) // Simple progression formula
    }
})
