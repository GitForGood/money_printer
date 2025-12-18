import { ActionType } from '../../../types/actions'
import { EventType, type GameEvent, type EventOutcome } from '../../../types/events'
import type { PublicCompany } from '../../../types/market'

export const generateBuyoutOffer = (playerShares: number, company: PublicCompany): GameEvent => {
    const offerPrice = company.sharePrice * 1.15; // 15% Premium
    const totalValue = Math.floor(playerShares * offerPrice);

    return {
        id: `evt_buyout_${company.ticker}_${Date.now()}`,
        type: EventType.Opportunity,
        title: `Buyout Offer: ${company.name}`,
        description: `A private equity firm wants to buy your ${playerShares} shares of ${company.ticker}. They are offering a 15% premium over market price to acquire your stake without market impact.`,
        isPersistent: false,
        choices: [
            {
                id: 'choice_accept_buyout',
                text: `Accept Offer ($${totalValue.toLocaleString()})`,
                outcome: {
                    id: 'out_accept_buyout',
                    description: `You sold your stake in ${company.name} privately.`,
                    mutations: [
                        { path: 'player.cash', operation: 'add', value: totalValue },
                        { path: `assets.${company.id}.shares`, operation: 'set', value: 0 } // Assuming asset key structure
                    ]
                }
            },
            {
                id: 'choice_reject_buyout',
                text: 'Reject Offer',
                outcome: {
                    id: 'out_reject_buyout',
                    description: 'You held onto your shares.',
                    mutations: []
                }
            }
        ]
    }
}

export const generateStockSplit = (company: PublicCompany): GameEvent => {
    return {
        id: `evt_split_${company.ticker}_${Date.now()}`,
        type: EventType.MarketShift,
        title: `Stock Split: ${company.name}`,
        description: `${company.name} has announced a 2-for-1 stock split. Your share count will double, and the price will halve.`,
        isPersistent: true, // Requires acknowledgment
        choices: [
            {
                id: 'choice_ack_split',
                text: 'Acknowledge',
                outcome: {
                    id: 'out_ack_split',
                    description: 'Portfolio readjusted.',
                    mutations: [
                        // Double Shares
                        { path: `assets.${company.id}.shares`, operation: 'multiply', value: 2 },
                        // Halve Price (Global Market State)
                        { path: `market.${company.id}.sharePrice`, operation: 'multiply', value: 0.5 }
                    ]
                }
            }
        ]
    }
}
