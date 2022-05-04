import { draw_normal_lines } from './normal_lines.mjs'
import { maybe_draw_highlighted_line } from './highlighted_line.mjs'
import { get_round_element } from './get_round_element.mjs'
import {
    get_max_scroll_round_index,
    get_round_height
} from '../utils/sizes.mjs'
import { within_range } from '../utils/utils.mjs'
import { update_scrollbar } from '../root_elements/scrollbar.mjs'

let was_drawn_before = false

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    const {
        the_root_element,
        content_horizontal_scroller,
        content_area,
        matches_vertical_scroller,
        rounds_elements_wrapper,
        lines_canvas,
        left_scroll_button, right_scroll_button
    } = root_elements

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

// shrink the rounds wrapper according to anchor round
    const leftmost_visible_round_height = get_round_height(
        all_data.rounds.length - 1 - Math.floor(store.state.anchor_round_index),
        matches_vertical_scroller.clientHeight,
        options
    )
    const height_with_paddings = leftmost_visible_round_height + options.main_vertical_padding * 2



// resize canvas to contain all rounds and redraw lines
    lines_canvas.style.height = leftmost_visible_round_height + 'px'
    lines_canvas.height = leftmost_visible_round_height
    lines_canvas.style.width = store.state.first_round_width * all_data.rounds.length
    lines_canvas.width = store.state.first_round_width * all_data.rounds.length

    draw_normal_lines(
        all_data.rounds.length,
        store.state.first_round_width,
        root_elements.lines_canvas,
        options
    )
    maybe_draw_highlighted_line(
        all_data,
        store.state,
        options,
        root_elements.lines_canvas
    )


// shift matches and round titles horizontally according to anchor index
    // Minimum is 0: prevent gap btw leftmost round and the left edge of horizontal scroll parent (in case of short tournament)
    const max_scroll_X = Math.max(0, store.state.first_round_width * all_data.rounds.length - content_horizontal_scroller.clientWidth)
    const hor_scroll_px = Math.min(store.state.anchor_round_index * store.state.first_round_width, max_scroll_X)
    content_area.style.left = -hor_scroll_px + 'px'
    


// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = height_with_paddings * scrollY_middle_ratio
    matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - matches_vertical_scroller.clientHeight / 2,
        0,
        height_with_paddings - matches_vertical_scroller.clientHeight
    )


//
    update_scrollbar(root_elements, options)

// update hor buttons visibility & activeness
    const content_is_wider = store.state.first_round_width * all_data.rounds.length > the_root_element.clientWidth
    left_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    right_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    const left_is_active = store.state.anchor_round_index > 0
    left_scroll_button.classList[left_is_active ? 'add' : 'remove']('active')
    const right_is_active = store.state.anchor_round_index < get_max_scroll_round_index(root_elements, all_data, store.state)
    right_scroll_button.classList[right_is_active ? 'add' : 'remove']('active')

    was_drawn_before = true
}