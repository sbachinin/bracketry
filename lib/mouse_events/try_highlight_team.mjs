import { debounce } from '../utils/utils.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { scroll_Y_to_round1_highlighted_match } from './scroll_Y_to_round1_highlighted_match.mjs'

export const try_highlight_team = debounce(
    (e, rounds, store, options, canvas_height) => {
        const highlighted_team_id = find_what_under_cursor(e, rounds, store.state.scroll_X, options).hovered_team?.id
        if (highlighted_team_id === store.state.highlighted_team_id) return

        const update = {
            highlighted_team_id,
            previous_highlighted_team_id: store.state.highlighted_team_id,
            highlight_opacity: 0
        }

        scroll_Y_to_round1_highlighted_match(highlighted_team_id, rounds, store, options, canvas_height)

// highlight with or without animation, depending on expand-related options
        if (options.reduce_match_until_clicked || options.reduce_match_until_hovered) {
            update.highlight_opacity = 1
        } else {
            animate_with_easing({
                type: 'fade_highlight',
                handle_new_value: easing_value => {
                    store.update_state({ highlight_opacity: easing_value })
                },
                duration: 200
            })
        }
        
        store.update_state(update)
    },
    70
)