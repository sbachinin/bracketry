import { animate_with_easing } from '../utils/animate_with_easing.mjs'

export const animate_scroll_Y = (initial_scroll_Y, destination_scroll_Y, options, update_state) => {
    const distance = destination_scroll_Y - initial_scroll_Y
    if (distance === 0) return

    if (options.vertical_scroll_animation_duration > 0) {
        animate_with_easing({
            type: 'scroll_Y',
            handle_new_value: easing_value => {
                update_state({ scroll_Y: initial_scroll_Y + distance * easing_value })
            },
            duration: options.vertical_scroll_animation_duration
        })
    } else {
        update_state({ scroll_Y: destination_scroll_Y })
    }
}