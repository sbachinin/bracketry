import { draw_match_info } from './match_info.mjs'
import { get_match_body_height } from '../../utils/sizes.mjs'

export const draw_static_matches = (offscreen_canvas_el, all_data, options, highlighted_team_id) => {
    const static_matches_center_Ys = {}

    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)
    ctx.textBaseline = 'middle'
    ctx.translate(
        0,
        get_match_body_height(options) * 0.5
    )
    all_data.rounds.forEach(round => {
        round.matches.forEach(match => {
            draw_match_info({
                all_data,
                match,
                options,
                highlighted_team_id,
                ctx
            })
            static_matches_center_Ys[match.id] = ctx.getTransform().f
            ctx.translate(0, get_match_body_height(options))
        })
    })

    return static_matches_center_Ys
}