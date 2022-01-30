import { draw_regular_match } from './draw_regular_match.mjs'

export const draw_static_rounds = (offscreen_canvas_el, all_data, options) => {
    const ctx = offscreen_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, offscreen_canvas_el.width, offscreen_canvas_el.height)

    all_data.rounds.forEach((round, round_index) => {
        round.matches.forEach(match => {
            draw_regular_match({
                all_data,
                round_index,
                match,
                options,
                ctx
            })
        })
    })

}