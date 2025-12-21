export interface PlayerStats {
    heat: number;
    karma: number;
    reputation: number;
    insiderLevel: number;
    apInstant: number;
    maxApInstant: number;
    apQuarterly: number;
    maxApQuarterly: number;
    apLongTerm: number;
    maxApLongTerm: number;
}

export interface PlayerProfile {
    id: string;
    username: string;
    title: string;
    stats: PlayerStats;
}
