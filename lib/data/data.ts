export type Data = {
    rounds: Round[], // you have to provide an object for each round, including the upcoming rounds
    skippedLastRoundsCount: number,
    matches?: Match[],
    contestants?: {
        [contestantId: string]: Contestant
    }
}

export type Round = {
    name?: string,
}

export type Match = {
    roundIndex: number,
    order: number, // 0-based!
    sides?: Side[],
    matchStatus?: string, // Meant for statuses like 'Cancelled' | 'Scheduled' | '19.05.2022 18:30'
    isLive?: boolean,
    isBronzeMatch?: boolean,
}

type Score = {
    mainScore: number | string, // May contain divergent results like 'W/O' or 'Ret' in tennis
    subscore?: number | string,
    isWinner?: boolean
}

// Side is a match-specific data for contestant: his id, his scores ...
export type Side = {
    title?: string,
    contestantId?: string,
    scores?: Score[],

    /* any score you want to appear highlighted to the right of the 'normal' scores.
        E.g., points within a game in tennis: this number is drawn after 'scores',
        is surrounded by border and is higlighted with green if match 'isLive'
    */
    currentScore?: number | string,
    isServing?: boolean, // (for tennis) If 'true', a tennis ball icon will be drawn on the very left of a side
    isWinner?: boolean
}

// Contestant is an individual player OR an array of individual players (e.g., single tennis player or double tennis team)
export type Contestant = {
    entryStatus?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | '14',
    players: Player[]
}

// Player is an individual player - one of the guys/teams which constitute a Contestant
// (e.g., single tennis player or a member of tennis' double team)
export type Player = {
    title: string,
    nationality?: string
}
