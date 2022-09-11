export type Data = {
    rounds: Round[], // you have to provide an object for each round, including the upcoming rounds
    matches?: Match[],
    contestants?: {
        [contestantId: string]: Contestant
    }
}

type Round = {
    name?: string,
}

export type Match = {
    roundIndex: number,
    order: number, // 0-based!
    sides?: Side[],
    matchStatus?: string // it will be rendered IF there is no score. Meant for statuses like 'Cancelled' | 'Scheduled' | '19.05.2022 18:30' (any status INSTEAD of score)
    isLive?: boolean
}

type Score = {
    mainScore: number | string, // May contain divergent results like 'W/O' or 'Ret' in tennis
    tieBreak?: number | string,
    isWinner?: boolean
}

// Side is a match-specific data for contestant: his id, his score ...
type Side = {
    title?: string,
    contestantId?: string,
    score?: Score[]

    subscore?: Score, // e.g., points within a game in tennis: this number is drawn after 'score', is surrounded by border and is higlighted with green if match 'isLive'
    isServing?: boolean, // if this one is 'true', a tennis ball icon will be drawn before a side's score
    isWinner?: boolean
}

// Contestant is an individual player OR an array of individual players (e.g., single tennis player or double tennis team)
export type Contestant = {
    entryStatus?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | '14',
    players: Player[]
}

// Player is an individual player - one of the guys/teams which constitute a Contestant
// (e.g., single tennis player or a member of tennis' double team)
type Player = {
    title: string,
    nationality?: string
}
