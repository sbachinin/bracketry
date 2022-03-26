import { throttle, within_range } from '../utils/utils.mjs'
import { run_every_frame, stop_running_every_frame } from '../utils/run_every_frame.mjs'

// Width of the active left & right edges that will trigger scroll when hovered (in % of canvas width)
const SCROLL_THRESHOLD = 25

let scroll_force = 0

const get_scroll_force = ({ target, offsetX }, mousemove_horizontal_scroll_speed) => {
    const offset_percentage = offsetX / target.offsetWidth * 100
    let factor = 0
    if (offset_percentage < SCROLL_THRESHOLD) {
        factor = offset_percentage - SCROLL_THRESHOLD
    }
    if (offset_percentage > (100 - SCROLL_THRESHOLD)) {
        factor = offset_percentage - (100 - SCROLL_THRESHOLD)
    }
    
    // Prevent ultra speed at the very edges of canvas:
    factor = within_range(
        factor,
        - SCROLL_THRESHOLD/2,
        SCROLL_THRESHOLD/2
    )

    return factor * mousemove_horizontal_scroll_speed
}

const get_scroll_X_with_constraints = (scroll_X, content_width, root_el_width) => {
    const width_deficit = content_width - root_el_width
    let new_scroll_X = scroll_X + scroll_force
    if (new_scroll_X > width_deficit) {
        stop_running_every_frame()
        return width_deficit // prevent right overscrolling
    }
    if (new_scroll_X < 0) {
        stop_running_every_frame()
        return 0 // prevent left overscrolling
    }
    return new_scroll_X
}

export const try_scroll_X_on_mousemove = throttle((
    e,
    all_content_width,
    state,
    options,
    handle_new_scroll_X
) => {
    if (
        options.horizontal_scroll_triggered_by !== 'mousemove'
        || (all_content_width - e.target.offsetWidth <= 0)
    ) return

    scroll_force = get_scroll_force(e, options.mousemove_horizontal_scroll_speed)
    if (scroll_force === 0) {
        stop_running_every_frame()
        return
    }

    const make_scroll_step = () => {
        const new_scroll_X = get_scroll_X_with_constraints(
            state.scroll_X,
            all_content_width,
            e.target.offsetWidth
        )
        if (new_scroll_X !== state.scroll_X) {
            handle_new_scroll_X(new_scroll_X)
        }
    }

    run_every_frame(make_scroll_step)
}, 50)
