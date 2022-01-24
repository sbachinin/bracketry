import { debounce } from '../utils/utils.mjs'
import { get_round_title_height } from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { animate_scroll_Y } from './animate_scroll_Y.mjs'


const scroll_to_round1_highlighted_match = (
    highlighted_team_id,
    rounds,
    scroll_Y,
    options,
    update_state,
    canvas_height
) => {
    if (highlighted_team_id === undefined) return

    const round1_highlighted_match = rounds[0].matches.find(m => m.sides.find(s => s.id === highlighted_team_id))
    
    let destination_scroll_Y = null

    if (round1_highlighted_match.center_Y < get_round_title_height(options)) {
        destination_scroll_Y = (
            scroll_Y
            + (round1_highlighted_match.center_Y - get_round_title_height(options) - options.min_height_per_match/2) // invisibility depth in px
                / rounds[0].height_deficit * 100
        )
    }

    if ((round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom) > canvas_height) {
        destination_scroll_Y = (
            scroll_Y
            + (round1_highlighted_match.center_Y + options.min_height_per_match/2 + options.padding_bottom - canvas_height)
                / rounds[0].height_deficit * 100
        )
    }

    destination_scroll_Y !== null && animate_scroll_Y(
        scroll_Y,
        destination_scroll_Y,
        options, update_state
    )
}

export const try_highlight_team = debounce(
    (e, rounds, state, options, update_state, canvas_height) => {
        const highlighted_team_id = find_what_under_cursor(e, rounds, state.scroll_X, options).hovered_team?.id
        const update = {
            highlighted_team_id,
            previous_highlighted_team_id: state.highlighted_team_id
        }

    scroll_to_round1_highlighted_match(highlighted_team_id, rounds, state.scroll_Y, options, update_state, canvas_height)

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