import { debounce } from '../utils/utils.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { scroll_Y_to_round1_highlighted_match } from './scroll_Y_to_round1_highlighted_match.mjs'

export const try_highlight_team = debounce(
    (e, rounds, state, options, update_state, canvas_height) => {
        const highlighted_team_id = find_what_under_cursor(e, rounds, state.scroll_X, options).hovered_team?.id
        const update = {
            highlighted_team_id,
            previous_highlighted_team_id: state.highlighted_team_id
        }

        scroll_Y_to_round1_highlighted_match(highlighted_team_id, rounds, state.scroll_Y, options, update_state, canvas_height)

// highlight with or without animation, depending on expand-related options
        if (options.reduce_match_until_clicked || options.reduce_match_until_hovered) {
            update.highlight_opacity = 1
        } else {
            animate_with_easing({
                type: 'fade_highlight',
                handle_new_value: easing_value => {
                    update_state({ highlight_opacity: easing_value })
                },
                duration: 200
            })
        }
        
        update_state(update)
    },
    70
)