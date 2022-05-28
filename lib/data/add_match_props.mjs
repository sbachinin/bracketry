export const add_match_props = (all_data, match) => {
    return {
        ...match,
        sides: match.sides === undefined ? [] : match.sides.map(side => {
            const contestant = all_data.contestants[side.contestant_id]
            return {
                ...side,
                score: side.score === undefined ? [] : side.score,
                entry_status: contestant.entry_status,
                players: contestant.players
            }
        })
    }
}