import { draw_normal_lines } from './normal_lines.mjs'
import { maybe_draw_highlighted_line } from './highlighted_line.mjs'
import { get_round_element } from './get_round_element.mjs'
import {
    get_max_scroll_round_index,
    get_round_height
} from '../utils/sizes.mjs'
import { within_range } from '../utils/utils.mjs'

export const full_redraw_matches = (
    all_data,
    options,
    store,
    root_elements
) => {
    const {
        the_root_element,
        content_horizontal_scroller,
        round_titles,
        content_area,
        matches_vertical_scroller,
        rounds_elements_wrapper,
        lines_canvas,
        left_scroll_button, right_scroll_button
    } = root_elements

    rounds_elements_wrapper.innerHTML = ''

// remember scrollY ratio
    const scroll_middle_px = matches_vertical_scroller.scrollTop + matches_vertical_scroller.clientHeight / 2
    const scrollY_middle_ratio = scroll_middle_px / rounds_elements_wrapper.clientHeight


// create round elements
    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(get_round_element(round, all_data.rounds.length, round_index, store.state, options))
    })
    rounds_elements_wrapper.append(...round_elements)

// shrink the rounds wrapper according to anchor round
    const leftmost_visible_round_height = get_round_height(
        all_data.rounds.length - 1 - Math.floor(store.state.anchor_round_index),
        matches_vertical_scroller.clientHeight,
        options
    )

// make each rounds as wide as the widest round
    const widest_round_width = Math.max(
        ...round_elements.map(r => Math.ceil(r.getBoundingClientRect().width)),
        200 // minimal round width
    )
    round_elements.forEach(el => el.style.flexBasis = widest_round_width + 'px')


// resize canvas to contain all rounds and redraw lines
    lines_canvas.style.height = leftmost_visible_round_height + 'px'
    lines_canvas.height = leftmost_visible_round_height
    lines_canvas.width = widest_round_width * all_data.rounds.length
    draw_normal_lines(
        all_data.rounds.length,
        widest_round_width,
        root_elements.lines_canvas,
        options
    )
    maybe_draw_highlighted_line(
        all_data,
        store.state.highlighted_team_id,
        options,
        widest_round_width,
        root_elements.lines_canvas
    )


// shift matches and round titles horizontally according to anchor index
    // prevent gap btw leftmost round and the left edge of horizontal scroll parent (in case of short tournament)
    const max_scroll_X = widest_round_width * all_data.rounds.length - content_horizontal_scroller.clientWidth
    const scroll_X = Math.min(store.state.anchor_round_index * widest_round_width, max_scroll_X)
    content_area.style.left = -scroll_X + 'px'


// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = leftmost_visible_round_height * scrollY_middle_ratio
    matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - matches_vertical_scroller.clientHeight / 2,
        0,
        leftmost_visible_round_height - matches_vertical_scroller.clientHeight
    )


// resize and redraw round titles
    round_titles.innerHTML = all_data.rounds.map(r => `
        <div class="round-title" style="
            justify-content: ${options.round_title_text_align};
            width: ${widest_round_width}px;
            padding: 0 ${options.match_hor_margin * 1.5}px;
        ">${r.name}</div>
    `).join('')

// update hor buttons visibility & disabled
    const content_is_wider = widest_round_width * all_data.rounds.length > the_root_element.clientWidth
    left_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    right_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    const left_is_disabled = store.state.anchor_round_index <= 0
    left_scroll_button.classList[left_is_disabled ? 'add' : 'remove']('disabled')
    const right_is_disabled = store.state.anchor_round_index >= get_max_scroll_round_index(root_elements, all_data)
    right_scroll_button.classList[right_is_disabled ? 'add' : 'remove']('disabled')
}