// SHAPE OF ALL DATA DESCRIBED IN TS FOR READABILITY:

type Data = {
    rounds: Round[], // you have to provide an object for each round, including the upcoming rounds
    matches: Match[],
    contestants: {
        [contestant_id: string]: Contestant
    }
}

type Round = {
    id: string,
    name?: string,
}

type Match = {
    match_id: string,
    round_id: string,
    order: number, // 0-based!
    sides: Side[],
    match_status?: string // it will be rendered IF there is no score. Meant for statuses like 'Cancelled' | 'Scheduled' | '19.05.2022 18:30' (any status INSTEAD of score)
}

// Side is a match-specific data for contestant: his id, his score ...
type Side = {
    contestant_id: string,
    score: [
        {
            main_score: number | string, // May contain divergent results like 'W/O' or 'Ret' in tennis
            tie_break?: number
        }
    ]

    subscore?: number | string, // e.g., points within a game in tennis: this number is drawn after 'score', is surrounded by border and is higlighted with green if match 'is_live'
    is_serving?: boolean, // if this one is 'true', a tennis ball icon will be drawn before a side's score
    is_winner?: boolean
}

// Contestant is an individual player OR an array of individual players (e.g., single tennis player or double tennis team)
type Contestant = {
    entry_status?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | 14,
    players: Player[]
}

// Player is an individual player - one of the guys/teams which constitute a Contestant
// (e.g., single tennis player or a member of tennis' double team)
type Player = {
    title: string,
    nationality_code?: string,
    flag_url?: string,
}





