import { draw_match_info } from './draw_match_info.mjs'

export const draw_static_rounds = (offscreen_canvas_el, all_data, options) => {
    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)

    all_data.rounds.forEach((round, round_index) => {
        round.matches.forEach((match, match_index) => {
            draw_match_info({
                team_title_width: all_data.team_title_width,
                round_index,
                left_X: round.left_X,
                match: { ...match, center_scroll_Y: round.height_per_match * (match_index + 0.5) },
                options,
                ctx
            })
        })
    })
}