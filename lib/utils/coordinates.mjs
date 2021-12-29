export const get_round_left_X = (state, options, round_index) => {
    return state.scrollX
        + options.padding_left
        + (options.round_width + options.distance_between_rounds) * round_index
}
