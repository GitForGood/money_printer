import { defineEventHandler, readBody, createError } from 'h3'
import type { EventOutcome } from '../../../types/events'

interface ResolveEventBody {
    eventId: string;
    choiceId: string;
}

export default defineEventHandler(async (event) => {
    const body = await readBody<ResolveEventBody>(event)

    if (!body || !body.eventId || !body.choiceId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing eventId or choiceId',
        })
    }

    // TODO: Implement actual resolution logic (apply modifiers, update DB)

    // Return a success mock outcome
    const response: { success: boolean, outcome: EventOutcome } = {
        success: true,
        outcome: {
            id: 'out_mock',
            description: 'Event resolved successfully (Mock)',
            mutations: []
        }
    }

    return response
})
