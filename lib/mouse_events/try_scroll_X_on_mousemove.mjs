import { run_every_frame, stop_running_every_frame } from '../utils/run_every_frame.mjs'

const HORIZONAL_SCROLL_WIDTH_PERCENTAGE = 25

let scroll_force = 0

const get_scroll_force = (canvas_width, mouse_event, mousemove_horizontal_scroll_speed) => {
    const percent_from_left = mouse_event.offsetX / canvas_width * 100
    if (percent_from_left < HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return (HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percent_from_left)
            * mousemove_horizontal_scroll_speed
    }
    if (percent_from_left > (100 - HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return ((100 - HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percent_from_left)
            * mousemove_horizontal_scroll_speed
    } else {
        return 0
    }
}

const get_scroll_X_with_constraints = (scroll_X, content_width, canvas_width) => {
    const width_deficit = content_width - canvas_width
    let new_scroll_X = scroll_force - scroll_X
    if (new_scroll_X < -width_deficit) {
        stop_running_every_frame()
        return -width_deficit // prevent right overscrolling
    }
    if (new_scroll_X > 0) {
        stop_running_every_frame()
        return 0 // prevent left overscrolling
    }
    return new_scroll_X
}

export const try_scroll_X_on_mousemove = (
    all_content_width,
    state,
    mousemove_horizontal_scroll_speed,
    handle_new_scroll_X,
    canvas_width,
    e
) => {
    if (all_content_width - canvas_width <= 0) return

    scroll_force = get_scroll_force(canvas_width, e, mousemove_horizontal_scroll_speed)
    if (scroll_force === 0) {
        stop_running_every_frame()
        return
    }

    const make_scroll_step = () => {
        const new_scroll_X = get_scroll_X_with_constraints(
            state.scroll_X,
            all_content_width,
            canvas_width
        );
        if (new_scroll_X !== state.scroll_X) {
            handle_new_scroll_X(new_scroll_X)
        }
    }

    run_every_frame(make_scroll_step)
}
