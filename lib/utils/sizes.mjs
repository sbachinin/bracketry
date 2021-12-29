export const get_round_left_X = (options, round_index) => {
    return (options.round_width + options.distance_between_rounds) * round_index
        + options.padding_left
}

export const get_all_content_width = (options, rounds_count) => {
    return (
        rounds_count * options.round_width
        + (rounds_count-1) * options.distance_between_rounds
        + options.padding_left
        + options.padding_right
    )
}