import { defineEventHandler } from 'h3'
import type { PendingEventResponse, GameEvent } from '../../../types/events'
import { EventType } from '../../../types/events'

export default defineEventHandler(async (event): Promise<PendingEventResponse> => {
    // Mock data for now
    const mockEvents: GameEvent[] = [
        {
            id: 'evt_001',
            type: EventType.Opportunity,
            title: 'Insider Tip',
            description: 'An old contact offers you early access to a tech startup IPO. It requires quick cash.',
            isPersistent: false,
            choices: [
                {
                    id: 'c_001_a',
                    text: 'Invest heavily ($50k)',
                    outcome: {
                        id: 'out_001_a',
                        description: 'You bought in early.',
                        mutations: [
                            { path: 'player.cash', operation: 'add', value: -50000 },
                            { path: 'assets.tech_stock_01.value', operation: 'add', value: 50000 }
                        ]
                    }
                },
                {
                    id: 'c_001_b',
                    text: 'Ignore',
                    outcome: {
                        id: 'out_001_b',
                        description: 'You let the opportunity pass.',
                        mutations: []
                    }
                }
            ]
        }
    ]

    return {
        events: mockEvents
    }
})
