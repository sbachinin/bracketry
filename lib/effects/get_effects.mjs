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

let was_drawn_before = false

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
        // [SCHEDULE_FORGET_SCROLL_Y]: () => {
        //     schedule_forget_scroll_Y(store.update_state)
        // },

        justidea____handle_anchor_index: () => {
            // set new style.left to horizontal scroller
            // set new height to content_area
            // set scrollTop
            // redraw lines
            // update buttons active and disabled state
            // update scrollbar
        },










        
        [HANDLE_ROUND_INDEX]: () => {

            

    // shift matches and round titles horizontally according to anchor index
            const hor_scroll_px = store.state.anchor_round_index
                * matches_vertical_scroller.scrollWidth
                / all_data.rounds.length
            content_area.style.left = -hor_scroll_px + 'px'




    // remember scrollY ratio
            let scrollY_middle_ratio = 0
            // if (was_drawn_before) {
                const scrollY_middle_px = matches_vertical_scroller.scrollTop + matches_vertical_scroller.clientHeight / 2
                scrollY_middle_ratio = scrollY_middle_px / matches_vertical_scroller.scrollHeight
            // }

    // set anchor height: first measure natural height of anchor round, then set all rounds to this height
            const rounds_elements = [...matches_scrollable_area.querySelectorAll('.round-wrapper')]
            rounds_elements.forEach((el, i) => {
                if (i < Math.floor(store.state.anchor_round_index)) el.style.height = 0
            })
            rounds_elements.forEach((el, i) => {el.style.height = matches_scrollable_area.clientHeight + 'px'})

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

            update_buttons(stable_elements, store.state.anchor_round_index, all_data)            
            
            update_scrollbar(stable_elements, options)

            // was_drawn_before = true
        },











        [REDRAW_CANVAS]: () => {
            redraw_canvas(
                all_data,
                store.state,
                options,
                stable_elements)
        },

        [HIGHLIGHT_TEAM_TITLES]: () => {
            const { highlighted_team_id } = store.state
            const titles_to_unhighlight = [
                ...matches_scrollable_area.querySelectorAll('.team-title-item.highlighted')
            ]
            titles_to_unhighlight.forEach(t => t.classList.remove('highlighted'))
            
            
            if (highlighted_team_id === null) return


            const titles_to_higlight = [
                ...matches_scrollable_area.querySelectorAll(`.team-title-item[team-id="${highlighted_team_id}"]`)
            ]
            titles_to_higlight.forEach(t => t.classList.add('highlighted'))
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