import { get_round_height } from '../utils/sizes.mjs'
import { within_range } from '../utils/utils.mjs'

export const switch_anchor_round = (
    all_data,
    state,
    old_state,
    options,
    root_elements,
) => {
    const { matches_scroller: scroller } = root_elements

// move scrollable area to the left
    const marginLeft = -state.anchor_round_index * all_data.width_per_round + 'px'
    root_elements.matches_scrollable_area.style.marginLeft = marginLeft
    root_elements.round_titles_canvas_el.style.marginLeft = marginLeft

// shrink the positioner according to anchor round
    const new_anchor_round_height = get_round_height(
        all_data.rounds[state.anchor_round_index],
        scroller.clientHeight,
        options)
    root_elements.match_bodies_positioner.style.height = new_anchor_round_height + 'px'


// adjust scroll position to keep the same matches in the middle
    const old_anchor_round_height = get_round_height(
        all_data.rounds[old_state.anchor_round_index],
        scroller.clientHeight,
        options)
    const old_scroll_middle_px = scroller.scrollTop + scroller.clientHeight / 2
    const old_anchor_middle_ratio = old_scroll_middle_px / old_anchor_round_height
    const new_scroll_middle_px = new_anchor_round_height * old_anchor_middle_ratio

    scroller.scrollTop = within_range(
        new_scroll_middle_px - scroller.clientHeight / 2,
        0,
        new_anchor_round_height - scroller.clientHeight
    )

// update hor buttons
    root_elements.hor_buttons?.update_visibility(
        all_data, options, state.anchor_round_index)
}
