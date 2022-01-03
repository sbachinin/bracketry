import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_title_height, get_round_left_X } from './sizes.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const draw_rounds = (all_rounds, state, ctx, options) => {
    all_rounds.forEach((_, round_index) => {
        draw_matches_for_round(round_index, all_rounds, ctx, options, state.scroll_X)
    })

    // hide matches under rounds titles
    ctx.fillStyle = options.background_color;
    ctx.fillRect(
        0,
        0,
        100000,
        get_round_title_height(options)
    );

    // draw rounds titles
    ctx.font = `${options.round_title_font_size}px ${options.round_title_font_family}`
    ctx.textBaseline = 'top'
    ctx.fillStyle = options.round_title_color
    all_rounds.forEach((round_data, round_index) => {
        ctx.fillText(
            round_data.name || get_default_round_title(all_rounds.length, round_index),
            (
                get_round_left_X(options, round_index) + state.scroll_X
                + options.round_title_margin_left
            ),
            options.padding_top
        )
    })
}