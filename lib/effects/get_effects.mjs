import {
    UPDATE_CANVAS_SCROLLABILITY,
    HANDLE_ROUND_INDEX,
    REDRAW_CANVAS,
    HIGHLIGHT_TEAM_TITLES
} from './names.mjs'
import { within_range } from '../utils/utils.mjs'
import { redraw_canvas } from '../draw/lines_canvas.mjs'
import { update_buttons } from '../hor_scroll/update_buttons.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

export const get_effects = (
    store,
    all_data,
    options,
    stable_elements
) => {

    const {
        matches_vertical_scroller, matches_scrollable_area, content_area
    } = stable_elements

    return {

        [HANDLE_ROUND_INDEX]: () => {

            const anchor_index = store.state.anchor_round_index
            const floored_index = Math.floor(anchor_index)

    // shift matches and round titles horizontally according to anchor index
            const hor_scroll_px = anchor_index
                * matches_vertical_scroller.scrollWidth
                / all_data.rounds.length
            content_area.style.left = -hor_scroll_px + 'px'




    // remember scrollY ratio
            let scrollY_middle_ratio = 0
            const scrollY_middle_px = matches_vertical_scroller.scrollTop + matches_vertical_scroller.clientHeight / 2
            scrollY_middle_ratio = scrollY_middle_px / matches_vertical_scroller.scrollHeight

    // ensure that all rounds are of anchor round's height (or 0)
            const rounds = [...matches_scrollable_area.querySelectorAll('.round-wrapper')]
            rounds.forEach((r, i) => r.style.height = i < floored_index ? 0 : 'auto') // squash invis rounds so that their height didn't affect the area's height
            floored_index > 0
                && (rounds[floored_index - 1].style.height = rounds[floored_index].clientHeight + 'px')


    // adjust scroll position to keep the same matches in the middle
            const new_scroll_middle_px = matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
            matches_vertical_scroller.scrollTop = within_range(
                new_scroll_middle_px - matches_vertical_scroller.clientHeight / 2,
                0,
                matches_vertical_scroller.scrollHeight - matches_vertical_scroller.clientHeight
            )


            redraw_canvas(
                all_data,
                store.state,
                options,
                stable_elements)

            update_buttons(stable_elements, anchor_index, all_data)

            update_scrollbar(stable_elements, options)
        },











        [REDRAW_CANVAS]: () => {
            redraw_canvas(
                all_data,
                store.state,
                options,
                stable_elements)
        },

        [HIGHLIGHT_TEAM_TITLES]: () => {
            const sides_to_unhighlight = [
                ...matches_scrollable_area.querySelectorAll('.match-info-pair.players-titles .side-info-item.highlighted')
            ]
            sides_to_unhighlight.forEach(t => t.classList.remove('highlighted'))


            if (store.state.highlighted_contestant_id === null) return

            const sides_to_higlight = [
                ...matches_scrollable_area.querySelectorAll(
                    `.match-info-pair.players-titles .side-info-item[contestant-id="${store.state.highlighted_contestant_id}"]`
                )
            ]
            sides_to_higlight.forEach(t => t.classList.add('highlighted'))
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