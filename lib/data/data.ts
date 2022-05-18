// SHAPE OF ALL DATA DESCRIBED IN TS FOR READABILITY:

type Data = {
    rounds: Round[] // you have to provide an object for each round, including the upcoming rounds
    contestants: {
        [contestant_id: string]: Contestant
    }
}

type Round = {
    name?: string,
    matches?: Match[]
}

type Match = {
    id?: string,
    order: number, // 0-based!
    sides?: Side[]
}

// Side is a match-specific data for contestant: his id, his score, his final result in a match ...
type Side = {
    contestant_id: string,
    score?: [
        {
            main_score: number | string, // May contain divergent results like 'W/O' or 'Ret' in tennis
            tie_break?: number
        }
    ]

    // if 'result' is 'winner', it's replaced with a default check icon;
    // any other string provided for 'result' will be rendered as it is
    result?: string // ('winner' | 'Rt' | 'W/O' | [any string, any html])
    
}

// Contestant is an individual player OR an array of individual players (e.g., single tennis player or double tennis team)
type Contestant = {
    entry_status?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | 14,
    players: Player[]
}

// Player is an individual player - one of the guys/teams which constitute a Competitor
// (e.g., single tennis player or a member of tennis' double team)
type Player = {
    title: string,
    nationality_code?: string,
    flag_url?: string,
}