import { within_range } from '../utils/utils.mjs'
import { update_buttons } from '../hor_scroll/update_buttons.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

export const handle_round_index = (all_data, options, state, stable_elements) => {

    const { matches_vertical_scroller,
        content_area,
        matches_scrollable_area,
        round_titles_wrapper
    } = stable_elements

    const anchor_index = state.anchor_round_index
    const floored_index = Math.floor(anchor_index)

// shift matches and round titles horizontally according to anchor index
    const hor_scroll_px = anchor_index
        * matches_vertical_scroller.scrollWidth
        / all_data.rounds.length
    content_area.style.left = -(hor_scroll_px + options.line_width) + 'px'




// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = matches_vertical_scroller.scrollTop + matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / matches_vertical_scroller.scrollHeight

// ensure that all rounds are of anchor round's height (or 0)
    const rounds = [...matches_scrollable_area.querySelectorAll('.round-wrapper')]
    rounds.forEach((r, i) => {
        r.style.height = i < floored_index ? 0 : 'auto' // squash invis rounds so that their height didn't affect the area's height:
        r.classList[i === floored_index ? 'add' : 'remove']('anchor-round')
    })
    const round_titles = [...round_titles_wrapper.children]
    round_titles.forEach((t, t_i) => {
        t.classList[t_i === floored_index ? 'add' : 'remove']('anchor-round')
    })
    floored_index > 0
        && (rounds[floored_index - 1].style.height = rounds[floored_index].clientHeight + 'px')


// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
    matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - matches_vertical_scroller.clientHeight / 2,
        0,
        matches_vertical_scroller.scrollHeight - matches_vertical_scroller.clientHeight
    )

    update_buttons(stable_elements, anchor_index, all_data, options)

    update_scrollbar(stable_elements, options)
}