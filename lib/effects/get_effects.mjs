import {
    UPDATE_CANVAS_SCROLLABILITY,
    HANDLE_ROUND_INDEX,
    REFRESH_CANVAS,
    HIGHLIGHT_SIDE_TITLES
} from './names.mjs'
import { handle_round_index } from './handle_round_index.mjs'
import { refresh_canvas } from '../draw/lines_canvas.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    stable_elements
) => {

    const {
        matches_vertical_scroller, matches_scrollable_area
    } = stable_elements

    return {

        [HANDLE_ROUND_INDEX]: () => handle_round_index(all_data, options, store.state, stable_elements),



        [REFRESH_CANVAS]: () => {
            refresh_canvas(
                all_data,
                store.state,
                options,
                stable_elements)
        },

        [HIGHLIGHT_SIDE_TITLES]: () => {
            matches_scrollable_area.querySelectorAll('.side-wrapper')
                .forEach(s => {
                    const is_to_highlight = s.getAttribute('contestant-id') === store.state.highlighted_contestant_id
                    s.classList[is_to_highlight ? 'add' : 'remove']('highlighted')
                })
        },

        [UPDATE_CANVAS_SCROLLABILITY]: () => {
            matches_vertical_scroller.style.overflowY = (
                store.state.window_recently_scrolled
                    ? 'hidden'
                    : 'scroll'
            )
        }
    }
}