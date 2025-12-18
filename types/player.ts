export interface PlayerStats {
    heat: number;
    karma: number;
    reputation: number;
    insiderLevel: number;
}

export interface PlayerProfile {
    id: string;
    username: string;
    title: string;
    stats: PlayerStats;
    level: number;
    xp: number;
    nextLevelXp: number;
}
