import { draw_dynamic_matches } from './draw_dynamic_matches.mjs'

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    root_elements.offscreen_canvas.draw_matches(all_data, options, store.state.highlighted_team_id)
    draw_dynamic_matches(all_data, store.state, root_elements, options)
}