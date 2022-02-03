import { draw_expanded_match } from './draw_expanded_match.mjs'

export const draw_expanded_matches = (rounds, state, expand_canvas_el, options) => {
    const ctx = expand_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, expand_canvas_el.width, expand_canvas_el.height)

    state.expanded_match && draw_expanded_match({
        match: state.expanded_match,
        round: rounds[state.expanded_match.round_index],
        state,
        ctx,
        options
    })

    state.previous_expanded_match && draw_expanded_match({
        match: state.previous_expanded_match,
        round: rounds[state.previous_expanded_match.round_index],
        state,
        ctx,
        options
    })
}