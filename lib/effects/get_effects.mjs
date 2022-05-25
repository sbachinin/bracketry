import {
    UPDATE_MATCHES_SCROLLABILITY,
    HANDLE_ROUND_INDEX,
    UPDATE_HIGHLIGHT
} from './names.mjs'
import { handle_round_index } from './handle_round_index.mjs'

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

        [UPDATE_HIGHLIGHT]: () => {
            const all_matches = [...matches_scrollable_area.querySelectorAll('.match-wrapper')]
            all_matches.forEach(m => {
                    m.classList.remove('highlighted', 'last-highlighted')
                    const match_sides = [...m.querySelectorAll('.side-wrapper')]
                    match_sides.forEach(s => {
                        s.classList.remove('highlighted')
                        if (store.state.highlighted_contestant_id === null) return
                        if (s.getAttribute('contestant-id') === store.state.highlighted_contestant_id) {
                            s.classList.add('highlighted')
                            m.classList.add('highlighted')
                        }
                    })
                })
            
            const highlighted_matches = [...matches_scrollable_area.querySelectorAll('.match-wrapper.highlighted')]
            highlighted_matches.reverse()[0]?.classList.add('last-highlighted')
        },

        [UPDATE_MATCHES_SCROLLABILITY]: () => {
            matches_vertical_scroller.style.overflowY = (
                store.state.window_recently_scrolled
                    ? 'hidden'
                    : 'scroll'
            )
        }
    }
}