import { get_round_element } from './get_round_element.mjs'
import {
    get_max_scroll_round_index,
} from '../utils/sizes.mjs'
import { within_range } from '../utils/utils.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

let was_drawn_before = false

export const full_redraw_matches = (
    all_data,
    options,
    store,
    stable_elements
) => {
    const {
        content_horizontal_scroller,
        content_area,
        matches_vertical_scroller,
        rounds_elements_wrapper,
        left_scroll_button, right_scroll_button
    } = stable_elements

    rounds_elements_wrapper.innerHTML = ''

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    if (was_drawn_before) {
        const scrollY_middle_px = matches_vertical_scroller.scrollTop + matches_vertical_scroller.clientHeight / 2
        scrollY_middle_ratio = scrollY_middle_px / matches_vertical_scroller.scrollHeight
    }


// create and append round elements with all match info
    const round_elements = []
    all_data.rounds.forEach((_, round_index) => {
        round_elements.push(
            get_round_element(all_data, round_index, store.state, options)
        )
    })
    rounds_elements_wrapper.append(...round_elements)




// shift matches and round titles horizontally according to anchor index
    // Minimum is 0: prevent gap btw leftmost round and the left edge of horizontal scroll parent (in case of short tournament)
    const hor_scroll_px = store.state.anchor_round_index
        * rounds_elements_wrapper.clientWidth
        / all_data.rounds.length

    content_area.style.left = -hor_scroll_px + 'px'
    


// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
    matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - matches_vertical_scroller.clientHeight / 2,
        0,
        rounds_elements_wrapper.clientHeight - matches_vertical_scroller.clientHeight
    )

//
    update_scrollbar(stable_elements, options)

// update hor buttons visibility & activeness
    const content_is_wider = rounds_elements_wrapper.clientWidth > content_horizontal_scroller.clientWidth
    left_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    right_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    const left_is_active = store.state.anchor_round_index > 0
    left_scroll_button.classList[left_is_active ? 'add' : 'remove']('active')
    const right_is_active = store.state.anchor_round_index < get_max_scroll_round_index(stable_elements, all_data)
    right_scroll_button.classList[right_is_active ? 'add' : 'remove']('active')

    was_drawn_before = true
}