export const get_round_left_X = (options, round_index) => {
    return (options.round_width + options.distance_between_rounds) * round_index
        + options.padding_left
}
