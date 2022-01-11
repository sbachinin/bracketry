import { draw_matches_for_round } from './draw_matches_for_round.mjs'
import { get_round_title_height } from '../utils/sizes.mjs'

export const draw_rounds = (
    all_data,
    state,
    canvas_el,
    options,
) => {
    const ctx = canvas_el.getContext('2d')
    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height)

    // draw rounds in reverse order
    // because score on hover must be drawn on top of next round
    for (let i=all_data.rounds.length-1; i>=0; i--) {
        const { left_X } = all_data.rounds[i]
        const round_width = all_data[i === 0 ? 'first_round_width' : 'round_width']
        const round_is_visible = (left_X + round_width) > state.scroll_X
        && (left_X - options.distance_between_rounds) < (state.scroll_X + canvas_el.width)

        round_is_visible && draw_matches_for_round(
            i,
            all_data,
            canvas_el,
            options,
            state,
        )
    }


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
    all_data.rounds.forEach((_, round_index) => {
        const { title, left_X } = all_data.rounds[round_index]
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