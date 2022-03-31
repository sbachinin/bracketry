import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import {
    get_round_scroll_X,
    is_round_visible_X,
    get_match_body_height
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

        const min_height_per_match = options.min_vert_margin_between_matches + get_match_body_height(options)
        const height_growth_factor = Math.pow(2, Math.max(round_index - state.scroll_X_anchor_round_index, 0))
        const height_per_match = min_height_per_match * height_growth_factor

        if (!is_round_visible_X(all_data.round_width, round_scroll_X, options)) return

        round.matches.forEach(
            (match, match_index) => {
                const match_body_top_Y = (
                    options.matches_padding_top
                    + (match_index + 0.5) * height_per_match
                    - get_match_body_height(options) / 2
                )

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