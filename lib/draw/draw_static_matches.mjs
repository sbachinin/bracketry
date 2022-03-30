import { draw_match_info } from './draw_match_info.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'
import { maybe_draw_lines_for_match } from './lines_for_match.mjs'

export const draw_static_matches = (offscreen_canvas_el, all_data, options, highlighted_team_id) => {
    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)

    all_data.rounds.forEach((round) => {
        round.matches.forEach((match) => {
            ctx.setTransform(
                1, 0, 0, 1,
                round.left_X,
                get_match_center_scroll_Y(all_data, match.id, 0, options)
            )
            draw_match_info({
                all_data,
                match,
                options,
                highlighted_team_id,
                ctx
            })

            ctx.setTransform(1, 0, 0, 1, 0, 0)

            if (options.use_classical_layout) {
                maybe_draw_lines_for_match({
                    all_data,
                    match_id: match.id,
                    options,
                    ctx
                })
            }
        })
    })
}