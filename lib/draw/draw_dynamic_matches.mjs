import { maybe_draw_lines_for_match } from './lines_for_match.mjs'
import {
    get_round_scroll_X,
    get_round_scroll_Y_px,
    is_round_visible_X
} from '../utils/sizes.mjs'

// draw scroll-aware rounds with connection lines
export const draw_dynamic_matches = (all_data, state, root_elements, options) => {
    const { main_canvas_el, offscreen_canvas } = root_elements

    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    ctx.lineJoin = 'round'

// if classical, just draw one full-screen portion of offscreen canvas
// (all lines already there, + no need to individually shift each round vertically)
    if (options.use_classical_layout) {
        ctx.drawImage(
            offscreen_canvas.el,
            state.scroll_X,
            get_round_scroll_Y_px(
                all_data.rounds[0],
                state.scroll_Y,
                options
            ),
            main_canvas_el.width,
            main_canvas_el.height,
            0,
            0,
            main_canvas_el.width,
            main_canvas_el.height,
        )
        return
    }

// for non-classical layout, draw round by round,
// shifting each one vertically by its own scroll pixel amount
    all_data.rounds.forEach((_, round_index) => {
        const round = all_data.rounds[round_index]

        const round_scroll_X = get_round_scroll_X(round, state, options)
        const round_scroll_Y = get_round_scroll_Y_px(round, state.scroll_Y, options)
        
        if (!is_round_visible_X(all_data.round_width, round_scroll_X, options)) return

        ctx.drawImage(
            offscreen_canvas.el,
            round.left_X,
            round_scroll_Y,
            all_data.round_width,
            main_canvas_el.height,
            round_scroll_X,
            0,
            all_data.round_width,
            main_canvas_el.height,
        )

// draw lines for each match
        round.matches.forEach(
            match => {
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