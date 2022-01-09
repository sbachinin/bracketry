import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_title_height } from '../sizes.mjs'

export const draw_rounds = (
    all_rounds,
    state,
    canvas_el,
    options,
    basic_drawing_attrs
) => {
    const ctx = canvas_el.getContext('2d')
    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height)

    all_rounds.forEach((_, round_index) => {
        const { left_X } = basic_drawing_attrs.rounds[round_index]
        const round_width = basic_drawing_attrs[round_index === 0 ? 'first_round_width' : 'round_width']
        if ( // this round is invisible under current scroll_X
            (left_X + round_width) < state.scroll_X
            || (left_X - options.distance_between_rounds) > (state.scroll_X + canvas_el.width)
        ) return

        draw_matches_for_round(
            round_index,
            all_rounds,
            canvas_el,
            options,
            state.scroll_X,
            basic_drawing_attrs
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
        const { title, left_X } = basic_drawing_attrs.rounds[round_index]
        ctx.fillText(
            title,
            (
                left_X - state.scroll_X
                + options.round_title_margin_left
            ),
            options.padding_top
        )
    })
}