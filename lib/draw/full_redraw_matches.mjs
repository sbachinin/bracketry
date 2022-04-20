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
        round_titles_canvas_el,
        matches_scroller,
        matches_scrollable_area,
        rounds_elements_wrapper,
        main_canvas_el,
        hor_buttons
    } = root_elements

    rounds_elements_wrapper.innerHTML = ''


// create round elements
    const round_elements = []
    all_data.rounds.forEach((round, round_index) => {
        round_elements.push(get_round_element(round, all_data.rounds.length, round_index, store.state, options))
    })
    rounds_elements_wrapper.append(...round_elements)


// shrink the positioner according to anchor round
    const new_anchor_round_height = get_round_height(
        all_data.rounds[Math.floor(store.state.anchor_round_index)],
        matches_scroller.clientHeight,
        options)
    rounds_elements_wrapper.style.height = new_anchor_round_height + 'px'


// make each rounds as wide as the widest round
    const widest_round_width = Math.max(
        ...round_elements.map(r => Math.ceil(r.getBoundingClientRect().width))
    )
    round_elements.forEach(el => el.style.flexBasis = widest_round_width + 'px')


// resize canvas to contain all rounds and redraw lines
    main_canvas_el.style.height = new_anchor_round_height + 'px'
    main_canvas_el.height = new_anchor_round_height
    main_canvas_el.width = widest_round_width * all_data.rounds.length
    draw_lines(all_data, store.state, root_elements, options)



// shift matches and round titles horizontally according to anchor index
    const marginLeft = -store.state.anchor_round_index * rounds_elements_wrapper.firstChild.clientWidth + 'px'
    matches_scrollable_area.style.marginLeft = marginLeft
    round_titles_canvas_el.style.marginLeft = marginLeft


// adjust scroll position to keep the same matches in the middle
    if (store.state.scrollY_middle_ratio !== null) {
        const new_scroll_middle_px = new_anchor_round_height * store.state.scrollY_middle_ratio
        matches_scroller.scrollTop = within_range(
            new_scroll_middle_px - matches_scroller.clientHeight / 2,
            0,
            new_anchor_round_height - matches_scroller.clientHeight
        )
    }


// resize and redraw round titles
    round_titles_canvas_el.width = widest_round_width * all_data.rounds.length
    maybe_draw_round_titles(all_data, options, root_elements)


// update hor buttons visibility
    hor_buttons.update_visibility(
        all_data,
        options,
        store.state.anchor_round_index,
        root_elements
    )
}