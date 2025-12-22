import { defineEventHandler, createError, readBody } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'
import type { MarkTutorialCompleteRequest, MarkTutorialCompleteResponse } from '../../../types/tutorial'

/**
 * Mark a tutorial as completed
 */
export default defineEventHandler(async (event): Promise<MarkTutorialCompleteResponse> => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody<MarkTutorialCompleteRequest>(event)
    const { pageId } = body

    if (!pageId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing pageId'
        })
    }

    // Update tutorial state
    const { data: state, error } = await client
        .from('tutorial_state')
        .update({
            completed: true,
            completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('page_id', pageId)
        .select()
        .single()

    if (error) {
        console.error('Error updating tutorial state:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update tutorial state'
        })
    }

    return {
        success: true,
        state
    }
})
