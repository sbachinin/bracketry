import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import {
    get_round_scroll_X,
    is_round_visible_X,
    get_match_body_height,
    get_match_center_Y
} from '../utils/sizes.mjs'

// draw scroll-aware rounds with connection lines
export const draw_dynamic_matches = (
    all_data,
    state,
    { main_canvas_el, offscreen_canvas },
    options
) => {

    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    ctx.lineJoin = 'round'

    all_data.rounds.forEach((round, round_index) => {
        const round_scroll_X = get_round_scroll_X(round, state, options)

        if (!is_round_visible_X(all_data.round_width, round_scroll_X, options)) return

        round.matches.forEach(
            (match, match_index) => {
                const match_body_center_Y = get_match_center_Y(all_data, round_index, match_index, state, options)

                const match_body_top_Y = match_body_center_Y - get_match_body_height(options) / 2

                if (
                    match_body_top_Y > main_canvas_el.height
                    || (match_body_top_Y + get_match_body_height(options)) < 0
                ) return

                ctx.putImageData(
                    offscreen_canvas.get_match_image(match.id, all_data, options),
                    round_scroll_X,
                    match_body_top_Y
                )

                maybe_draw_lines_for_match({
                    all_data,
                    match_id: match.id,
                    state,
                    options,
                    ctx
                })
            }
        )
    })
}