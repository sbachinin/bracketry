import { startAnimation } from './animate.mjs'
import * as constants from './constants.mjs'

let make_scroll_step = () => {}
let scroll_force = 0

const get_scroll_force = (canvas_width, mouse_event) => {
    const percent_from_left = mouse_event.offsetX / canvas_width * 100
    if (percent_from_left < constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percent_from_left
    }
    if (percent_from_left > (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return (100 - constants.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percent_from_left
    } else {
        return 0
    }
}

const get_scroll_X_with_constraints = (state, content_width, canvas_width) => {
    const width_deficit = content_width - canvas_width.width
    let new_scroll_X = state.scroll_X + scroll_force
    if (new_scroll_X < -width_deficit) {
        return -width_deficit // prevent right overscrolling
    } else {
        return Math.min(state.scroll_X + scroll_force, 0) // prevent left
    }
}

export const try_scroll_X = (
    all_content_width,
    state,
    handle_new_scroll_X,
    canvas_width,
    e
) => {
    if (all_content_width - canvas_width <= 0) return

    scroll_force = get_scroll_force(canvas_width, e)

    make_scroll_step = () => {
        const new_scroll_X = get_scroll_X_with_constraints(
            state,
            all_content_width,
            canvas_width
        );
        if (new_scroll_X !== state.scroll_X) {
            handle_new_scroll_X(new_scroll_X)
        }
    }

    startAnimation(make_scroll_step)
}
