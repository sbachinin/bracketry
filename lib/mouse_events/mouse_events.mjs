import { MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL } from '../constants.mjs'
import { debounce } from '../utils/utils.mjs'
import { find_match_data_by_id } from '../data/utils.mjs'
import { try_update_scroll_round_index } from '../hor_scroll/try_update_scroll_round_index.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

export const install_mouse_events = (
    all_data,
    options,
    store,
    stable_elements,
) => {

    const { matches_vertical_scroller, rounds_elements_wrapper,
        left_scroll_button, right_scroll_button } = stable_elements

    rounds_elements_wrapper.addEventListener(
        'mouseup',
        e => {
            if (e.button !== 0) return
        // first try onMatchClick, if it was provided in options
            if (options.onMatchClick
                && e.target.classList.contains('match-clickable-area')
            ) {
                const { match, round, round_index } = find_match_data_by_id(
                    all_data,
                    e.target.getAttribute('match-id')
                )

                options.onMatchClick(match, round, round_index)
                return
            }

            
            const is_team_title = e.target.classList.contains('team-title-item')
            if (is_team_title) {
                const team_id = e.target.getAttribute('team-id')
                const team = all_data.teams[team_id]
        // otherwise try onTeamTitleClick, if it was provided in options
                if (options.onTeamTitleClick) {
                    options.onTeamTitleClick({ ...team, id: team_id })
                } else {
                    store.update_state({ highlighted_team_id: team_id })
                }
            } else {
        // otherwise do the default "highlight a team" stuff
                store.update_state({ highlighted_team_id: null })
            }
        }
    )

    rounds_elements_wrapper.addEventListener(
        'mouseover', // entered wrapper or any of its children
        e => {
            if (options.onMatchClick
                && e.target.classList.contains('match-clickable-area')
            ) {
// try highlight a match-info-pair
                e.target
                    .closest('.round-wrapper')
                    .querySelector('.round-column.team-titles')
                    .querySelector(`[match-id="${e.target.getAttribute('match-id')}"]`)
                    .classList.add('highlighted')
            }
        }
    )

    rounds_elements_wrapper.addEventListener(
        'mouseout', // entered wrapper or any of its children
        e => {
            if (options.onMatchClick
                && e.target.classList.contains('match-clickable-area')
            ) {
// unhighlight all match-info-pairs
                rounds_elements_wrapper
                    .querySelectorAll('.match-info-pair.highlighted')
                    .forEach(pair => pair.classList.remove('highlighted'))
            }
        }
    )
     

    left_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(-1, all_data, store, stable_elements)
    )
    right_scroll_button.addEventListener(
        'mouseup',
        e => e.button === 0 && try_update_scroll_round_index(1, all_data, store, stable_elements)
    )




    const try_forget_window_scroll = debounce(
        () => { store.update_state({ window_recently_scrolled: false }) },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL)

    window.addEventListener(
        'scroll',
        () => {
            store.update_state({ window_recently_scrolled: true })
            try_forget_window_scroll()
        }
    )




    matches_vertical_scroller.addEventListener('scroll', (e) => {
        if (!options.show_scrollbar) return
        update_scrollbar(stable_elements, options)
    })
}
