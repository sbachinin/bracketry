import { draw_match_info } from './match_info.mjs'
import { get_match_body_height } from '../../utils/sizes.mjs'

export const draw_static_matches = (offscreen_canvas_el, all_data, options, highlighted_team_id) => {
    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)

    all_data.rounds.forEach((round) => {
        round.matches.forEach((match, match_index) => {
            ctx.setTransform(
                1, 0, 0, 1,
                round.left_X,
                /* center_scroll_Y of the current match */ (match_index + 0.5) * get_match_body_height(options)
            )
            draw_match_info({
                all_data,
                match,
                options,
                highlighted_team_id,
                ctx
            })
        })
    })
}