import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_title_height, get_round_left_X } from './sizes.mjs'

export const draw_rounds = (
    all_rounds,
    state,
    ctx,
    options,
    { widest_team_title_width, rounds_drawing_attrs }
) => {
    all_rounds.forEach((_, round_index) => {
        draw_matches_for_round(
            round_index,
            all_rounds,
            ctx,
            options,
            state.scroll_X,
            widest_team_title_width
        )
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
    all_rounds.forEach((_, round_index) => {
        ctx.fillText(
            rounds_drawing_attrs[round_index].title,
            (
                get_round_left_X(options, round_index) + state.scroll_X
                + options.round_title_margin_left
            ),
            options.padding_top
        )
    })
}