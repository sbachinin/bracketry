import { draw_match_info } from './draw_match_info.mjs'
import { get_match_center_scroll_Y } from '../utils/sizes.mjs'

export const draw_static_rounds = (offscreen_canvas_el, all_data, options) => {
    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)

    all_data.rounds.forEach((round) => {
        round.matches.forEach((match, match_index) => {
            ctx.translate(
                round.left_X,
                get_match_center_scroll_Y(round, 0, match_index, options)
            )
            draw_match_info({
                team_title_width: all_data.team_title_width,
                entry_status_width: all_data.entry_status_width,
                match,
                options,
                ctx
            })
            ctx.setTransform(1, 0, 0, 1, 0, 0)
        })
    })
}