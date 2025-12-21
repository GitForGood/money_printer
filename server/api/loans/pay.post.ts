import { defineEventHandler, readBody, createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../../types/database.types'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    const client = await serverSupabaseClient<Database>(event)

    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)
    const { loanId, amount } = body

    if (!loanId || !amount) {
        throw createError({ statusCode: 400, statusMessage: 'Missing loanId or amount' })
    }

    // 1. Fetch Loan
    const { data: loan, error: loanError } = await (client.from('loans') as any)
        .select('*')
        .eq('id', loanId)
        .eq('borrower_id', user.id)
        .maybeSingle()

    if (loanError || !loan) {
        throw createError({ statusCode: 404, statusMessage: 'Loan not found' })
    }

    // 2. Fetch Player Cash
    const { data: stats, error: statsError } = await (client.from('player_stats') as any)
        .select('cash')
        .eq('user_id', user.id)
        .maybeSingle()

    if (statsError || !stats) throw createError({ statusCode: 404, statusMessage: 'Player stats not found' })
    const currentCash = stats?.cash || 0

    if (currentCash < amount) {
        throw createError({ statusCode: 400, statusMessage: 'Insufficient funds' })
    }

    const paymentAmount = Math.min(amount, Number(loan.remaining_principal))

    // 3. Update DB
    // Deduct Cash
    await (client.from('player_stats') as any)
        .update({ cash: currentCash - paymentAmount })
        .eq('user_id', user.id)

    // Update Loan
    const newPrincipal = Number(loan.remaining_principal) - paymentAmount
    const { error: updateError } = await (client.from('loans') as any)
        .update({ remaining_principal: newPrincipal })
        .eq('id', loanId)

    if (updateError) throw createError({ statusCode: 500, statusMessage: 'Failed to update loan principal' })

    // Optional: If fully paid, we could delete or archive. Let's keep for record if > 0.
    // If newPrincipal <= 0, maybe mark as closed?

    return {
        success: true,
        paid: paymentAmount,
        remaining: newPrincipal
    }
})
