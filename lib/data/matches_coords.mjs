import { get_round_title_height } from '../utils/sizes.mjs'

export const set_matches_coords = (all_data, scroll_Y, options) => {
    Object.assign(
        all_data,
        {
            rounds: all_data.rounds.map(round => {
                const round_scroll_Y = round.height_deficit > 0
                    ? round.height_deficit / 100 * scroll_Y
                    : 0
                
                return {
                    ...round,
                    matches: round.matches.map(match_data => {
                        return {
                            ...match_data,
                            center_Y: get_round_title_height(options)
                                + round.height_per_match * (match_data.order - 0.5)
                                - round_scroll_Y
                        }
                    })
                }
            })
        }
    )
}

export const try_update_matches_coords = (
    all_data,
    state,
    state_update,
    options
) => {
    if (state_update.scroll_Y !== undefined && state_update.scroll_Y !== state.scroll_Y) {
        set_matches_coords(all_data, state_update.scroll_Y, options)
    }
}
