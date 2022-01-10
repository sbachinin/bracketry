import { get_round_title_height } from './sizes.mjs'

export const set_matches_coords = (
    all_rounds_data,
    scroll_Y,
    basic_drawing_attrs,
    options
) => {
    all_rounds_data.forEach((round, round_index) => {
        const {
            height_deficit,
            height_per_match
        } = basic_drawing_attrs.rounds[round_index]

        const round_scroll_Y = height_deficit > 0
            ? height_deficit / 100 * scroll_Y
            : 0
        
        Object.assign(round, {
            matches: round.matches
                .map(match_data => {
                    return {
                        ...match_data,
                        center_Y: get_round_title_height(options)
                            + height_per_match * (match_data.order - 0.5)
                            - round_scroll_Y
                    }
                })
        })
    })
}

export const try_update_matches_coords = (
    all_rounds_data,
    state,
    state_update,
    basic_drawing_attrs,
    options
) => {
    if (state_update.scroll_Y !== undefined && state_update.scroll_Y !== state.scroll_Y) {
        set_matches_coords(all_rounds_data, state_update.scroll_Y, basic_drawing_attrs, options)
    }
}
