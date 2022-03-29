import { draw_lines_for_match } from './draw_lines_for_match.mjs'
import {
    get_round_scroll_Y_px,
    is_round_visible_X,
    is_match_visible_Y,
    get_match_center_scroll_Y
} from '../utils/sizes.mjs'

// draw scroll-aware rounds with connection lines
export const draw_dynamic_matches = (all_data, state, root_elements, options) => {
    const { main_canvas_el, offscreen_canvas } = root_elements

    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    ctx.lineJoin = 'round'

    all_data.rounds.forEach((_, round_index) => {
        const round = all_data.rounds[round_index]

        const round_scroll_X = round.left_X - (options.auto_canvas_size ?  0 : state.scroll_X)
        const round_scroll_Y = get_round_scroll_Y_px(
            options.use_classical_layout ? all_data.rounds[0] : round,
            state.scroll_Y,
            options
        )
        
        if (!is_round_visible_X(all_data.round_width, round_scroll_X, options)) return
    
// draw matches without lines
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

        round.matches.forEach(
            (match) => {
                const center_scroll_Y = get_match_center_scroll_Y(all_data, match.id, state.scroll_Y, options)
                
// draw lines
                if (is_match_visible_Y(center_scroll_Y, options)) {
                    draw_lines_for_match({
                        all_data,
                        this_round: round,
                        this_round_scroll_X: round_scroll_X,
                        previous_round: all_data.rounds[round_index - 1],
                        match,
                        center_scroll_Y,
                        round_width: all_data.round_width,
                        state,
                        options,
                        ctx,
                    })
                }
            }
        )
    })
}