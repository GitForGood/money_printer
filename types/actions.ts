export enum ActionType {
    // legitimate
    Hire = 'hire',
    Fire = 'fire',
    Renovate = 'renovate',
    Lobby = 'lobby',
    Marketing = 'marketing',
    // underworld
    Bribe = 'bribe',
    Sabotage = 'sabotage',
    Espionage = 'espionage'
}

export interface ActionRequirement {
    resource: string; // 'cash', 'heat', 'ap'
    min?: number;
    max?: number;
    cost?: number; // Consumed on use
}

export interface GameAction {
    id: string;
    type: ActionType;
    label: string;
    description: string;
    requirements: ActionRequirement[];
    cooldownDays?: number;
    baseSuccessRate?: number; // 0.0 - 1.0
}
