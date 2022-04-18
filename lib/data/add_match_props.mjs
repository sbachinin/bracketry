import { create_unique_id } from '../utils/utils.mjs'

export const add_match_props = (all_data, match) => {
    return {
        ...match,
        id: match.id || create_unique_id(),
        sides: match.sides === undefined ? [] : match.sides.map(side => {
            return {
                ...side,
                score: side.score === undefined ? [] : side.score,
                ...all_data.teams[side.id]
            }
        })
    }
}