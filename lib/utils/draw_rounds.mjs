import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_title_height, get_round_left_X } from './sizes.mjs'

export const draw_rounds = (allRounds, state, ctx, options) => {
    allRounds.forEach((_, round_index) => {
        draw_matches_for_round(round_index, allRounds, ctx, options)
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
    allRounds.forEach((round_data, round_index) => {
        ctx.fillText(
            round_data.name,
            (
                get_round_left_X(options, round_index) + state.scrollX
                + options.round_title_margin_left
            ),
            options.padding_top
        )
    })
}