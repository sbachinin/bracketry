import { startAnimation } from './animate.mjs'
import * as constants from './constants.mjs'

let make_scroll_step = () => {}
let scroll_force = 0

const get_scroll_force = (canvas_el, mouse_event) => {
    const percent_from_left = mouse_event.offsetX / canvas_el.width * 100
    if (percent_from_left < constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percent_from_left
    }
    if (percent_from_left > (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percent_from_left
    } else {
        return 0
    }
}

const get_scrollX_with_constraints = (state, content_width, canvas_el) => {
    const width_deficit = content_width - canvas_el.width
    let new_scrollX = state.scrollX + scroll_force
    if (new_scrollX < -width_deficit) {
        return -width_deficit // prevent right overscrolling
    } else {
        return Math.min(state.scrollX + scroll_force, 0) // prevent left
    }
}

export const try_scroll_X = (
    all_content_width,
    state,
    handle_new_scrollX,
    canvas_el,
    e
) => {
    if (all_content_width - canvas_el.width <= 0) return

    scroll_force = get_scroll_force(canvas_el, e)

    make_scroll_step = () => {
        const new_scrollX = get_scrollX_with_constraints(state, all_content_width, canvas_el);
        if (new_scrollX !== state.scrollX) {
            handle_new_scrollX(new_scrollX)
        }
    }

    startAnimation(make_scroll_step)
}
