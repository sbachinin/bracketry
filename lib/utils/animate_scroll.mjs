import { animate_with_easing } from './animate_with_easing.mjs'

export const animate_scroll = ({
    store,
    destination_scroll_X,
    destination_scroll_Y,
    duration
}) => {
    
    destination_scroll_X !== undefined && store.update_state({ destination_scroll_X })
    destination_scroll_Y !== undefined && store.update_state({ destination_scroll_Y })

    const initial_scroll_X = store.state.scroll_X
    const initial_scroll_Y = store.state.scroll_Y

    const distance_X = destination_scroll_X !== undefined ? (destination_scroll_X - initial_scroll_X) : 0
    const distance_Y = destination_scroll_Y !== undefined ? (destination_scroll_Y - initial_scroll_Y) : 0

    if (distance_X === 0 && distance_Y === 0) return

    if (duration > 0) {
        animate_with_easing({
            type: 'scroll',
            handle_new_value: easing_value => {
                store.update_state({
                    scroll_X: initial_scroll_X + distance_X * easing_value,
                    destination_scroll_X: easing_value === 1 ? undefined : store.state.destination_scroll_X,
                    scroll_Y: initial_scroll_Y + distance_Y * easing_value,
                    destination_scroll_Y: easing_value === 1 ? undefined : store.state.destination_scroll_Y
                })
            },
            duration
        })
    } else {
        store.update_state({
            scroll_Y: store.state.destination_scroll_Y,
            destination_scroll_Y: undefined,
            scroll_X: store.state.destination_scroll_X,
            destination_scroll_X: undefined
        })
    }
}