import { draw_lines } from './lines.mjs'
import { get_round_element } from './get_round_element.mjs'
import { maybe_draw_round_titles } from './round_titles.mjs'
import { get_round_height } from '../utils/sizes.mjs'
import { within_range } from '../utils/utils.mjs'

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    const {
        the_root_element,
        round_titles_canvas_el,
        matches_scroller,
        matches_scrollable_area,
        rounds_elements_wrapper,
        lines_canvas,
        left_scroll_button, right_scroll_button
    } = root_elements

    rounds_elements_wrapper.innerHTML = ''

// remember scrollY ratio
    const scroll_middle_px = matches_scroller.scrollTop + matches_scroller.clientHeight / 2
    const scrollY_middle_ratio = scroll_middle_px / rounds_elements_wrapper.clientHeight


// create round elements
    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(get_round_element(round, all_data.rounds.length, round_index, store.state, options))
    })
    rounds_elements_wrapper.append(...round_elements)


// shrink the positioner according to anchor round
    const anchor_round_height = get_round_height(
        all_data.rounds[Math.floor(store.state.anchor_round_index)],
        matches_scroller.clientHeight,
        options)
    rounds_elements_wrapper.style.height = anchor_round_height + 'px'


// make each rounds as wide as the widest round
    const widest_round_width = Math.max(
        ...round_elements.map(r => Math.ceil(r.getBoundingClientRect().width))
    )
    round_elements.forEach(el => el.style.flexBasis = widest_round_width + 'px')


// resize canvas to contain all rounds and redraw lines
    lines_canvas.style.height = anchor_round_height + 'px'
    lines_canvas.height = anchor_round_height
    lines_canvas.width = widest_round_width * all_data.rounds.length
    draw_lines(all_data, store.state, root_elements, options)



// shift matches and round titles horizontally according to anchor index
    const round_width = rounds_elements_wrapper.firstChild.clientWidth
    const margin_left = -store.state.anchor_round_index * round_width + 'px'
    matches_scrollable_area.style.marginLeft = margin_left
    round_titles_canvas_el.style.marginLeft = margin_left


// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = anchor_round_height * scrollY_middle_ratio
    matches_scroller.scrollTop = within_range(
        new_scroll_middle_px - matches_scroller.clientHeight / 2,
        0,
        anchor_round_height - matches_scroller.clientHeight
    )


// resize and redraw round titles
    round_titles_canvas_el.width = widest_round_width * all_data.rounds.length
    maybe_draw_round_titles(all_data, options, root_elements)


// update hor buttons visibility & disabled
    const content_is_wider = round_width * all_data.rounds.length > the_root_element.clientWidth
    left_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    right_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    const left_is_disabled = store.state.anchor_round_index <= 0
    left_scroll_button.classList[left_is_disabled ? 'add' : 'remove']('disabled')
    const right_is_disabled = store.state.anchor_round_index >= get_max_scroll_round_index(root_elements, all_data, options)
    right_scroll_button.classList[right_is_disabled ? 'add' : 'remove']('disabled')
}