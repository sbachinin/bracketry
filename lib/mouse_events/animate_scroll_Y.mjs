import { animate_with_easing } from '../utils/animate_with_easing.mjs'

export const animate_scroll_Y = (options, { state, update_state }) => {
    const initial_scroll_Y = state.scroll_Y
    const distance = state.destination_scroll_Y - initial_scroll_Y
    if (distance === 0) return

    if (options.vertical_scroll_animation_duration > 0) {
        animate_with_easing({
            type: 'scroll_Y',
            handle_new_value: easing_value => {
                update_state({
                    scroll_Y: initial_scroll_Y + distance * easing_value,
                    destination_scroll_Y: easing_value === 1 ? undefined : state.destination_scroll_Y
                })
            },
            duration: options.vertical_scroll_animation_duration
        })
    } else {
        update_state({
            scroll_Y: state.destination_scroll_Y,
            destination_scroll_Y: undefined
        })
    }
}