import { draw_matches_for_round } from './draw_matches_for_round.mjs'

export const draw_static_rounds = (el, all_data, options) => {
    
    const ctx = el.getContext('2d')
    ctx.clearRect(0, 0, el.width, el.height)
    for (let i=all_data.rounds.length-1; i>=0; i--) {
        draw_matches_for_round(
            i,
            all_data,
            el,
            options,
        )
    }
}