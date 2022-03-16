import { draw_expanded_match } from './expanded_match.mjs'

export const draw_expanded_matches = (all_data, state, expand_canvas_el, options) => {
    const ctx = expand_canvas_el.getContext('2d')
    ctx.clearRect(0, 0, expand_canvas_el.width, expand_canvas_el.height)

    state.expanded_match && draw_expanded_match({
        all_data,
        is_currently_expanded: true,
        state,
        ctx,
        options
    })

    options.animate_match_expand && state.previous_expanded_match && draw_expanded_match({
        all_data,
        is_currently_expanded: false,
        state,
        ctx,
        options
    })
}