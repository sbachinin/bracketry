
import { maybe_draw_round_titles } from './round_titles.mjs'
import { draw_dynamic_matches } from './draw_dynamic_matches.mjs'
import { draw_highlighted_stuff } from './highlighted_stuff.mjs'

export const draw_all = (
    all_data,
    store,
    options,
    root_elements
) => {
    maybe_draw_round_titles(all_data, store.state, options, root_elements.round_titles_canvas_el)
    draw_dynamic_matches(all_data, store.state, root_elements, options)
    if (options.highlight_team_history_on_click) {
        draw_highlighted_stuff(all_data, store.state, options, root_elements.highlight_canvas_el)
    }
}