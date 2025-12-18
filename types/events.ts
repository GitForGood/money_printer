export enum EventType {
    Opportunity = 'opportunity',
    Crisis = 'crisis',
    Audit = 'audit',
    MarketShift = 'market_shift',
    Flavor = 'flavor'
}

// Replaces specific ResourceType/ResourceModifier for flexibility
export type MutationOperation = 'add' | 'subtract' | 'set' | 'multiply';

export interface StateMutation {
    path: string; // e.g., 'player.cash', 'assets.tech_stock_01.value', 'world.heat'
    operation: MutationOperation;
    value: any; // number, string, boolean, etc.
}

export interface TriggerNextEvent {
    eventId: string;
    delayQuarters?: number;
}

export interface EventOutcome {
    id: string;
    description: string;
    mutations: StateMutation[]; // Direct state changes
    triggers?: TriggerNextEvent[];
    customPayload?: Record<string, any>;
}

export interface EventChoice {
    id: string;
    text: string;
    outcome: EventOutcome;
    requirements?: {
        minCash?: number;
        maxHeat?: number;
        minKarma?: number;
        requiredAssetId?: string;
    };
}

export interface GameEvent {
    id: string;
    type: EventType;
    title: string;
    description: string;
    choices: EventChoice[];
    expiresAt?: string; // ISO Date, if the event disappears
    durationQuarters?: number; // If the event effect lasts for a while
    isPersistent: boolean; // If true, stays in active events list until resolved
}

export interface PendingEventResponse {
    events: GameEvent[];
}
