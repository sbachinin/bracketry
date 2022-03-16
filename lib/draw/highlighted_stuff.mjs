import { draw_highlighted_matches_info } from './highlighted_matches_info.mjs'
import { draw_highlighted_line } from './highlighted_line.mjs'

export const draw_highlighted_stuff = (
    all_data,
    state,
    options,
    highlight_canvas_el
) => {
    if (!options.highlight_team_history_on_click) return
    
    const highlight_ctx = highlight_canvas_el.getContext('2d')
    highlight_ctx.clearRect(0, 0, highlight_canvas_el.width, highlight_canvas_el.height)

    if (state.highlighted_team_id !== null || state.hovered_team_id !== null) {
        draw_highlighted_matches_info(all_data, state, options, highlight_ctx)
    }
    
    if (typeof state.highlighted_team_id === 'string') {
        draw_highlighted_line({
            all_data,
            state,
            options,
            highlight_ctx,
        })
    }
}