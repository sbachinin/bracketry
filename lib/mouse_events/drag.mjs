import { within_range } from '../utils/utils.mjs'
import { animate_scroll_Y } from './animate_scroll_Y.mjs'

export const maybe_drag = (e, rounds, store, options) => {
    if (!store.state.dragging) return

    const update = {}

    if (options.vertical_scroll_triggered_by === 'drag') {
        let maybe_scroll_Y = store.state.drag_start_scroll_coords[1] - (e.clientY - store.state.drag_start_mouse_coords[1])
            / rounds[0].height_deficit * 100
        if (maybe_scroll_Y < -6) {
            update.scroll_Y = -2.262
        } else if (maybe_scroll_Y < 0) {
            update.scroll_Y = maybe_scroll_Y * Math.pow(0.85, -maybe_scroll_Y)
        } else if (maybe_scroll_Y > 106) {
            update.scroll_Y = 102.262
        } else if (maybe_scroll_Y > 100) {
            update.scroll_Y = 100 + (maybe_scroll_Y - 100) * Math.pow(0.85, maybe_scroll_Y - 100)
        } else {
            update.scroll_Y = maybe_scroll_Y
        }
    }

    if (options.horizontal_scroll_triggered_by === 'drag') {

    }

    Object.keys(update).length && store.update_state(update)
}

export const maybe_stop_drag = (e, store, options) => {
    store.update_state({
        dragging: false,
        drag_start_mouse_coords: [],
        drag_start_scroll_coords: []
    })
    e.target.style.cursor = 'grab'
    if (store.state.scroll_Y > 100 || store.state.scroll_Y < 0) {
        store.update_state({
            destination_scroll_Y: within_range(store.state.scroll_Y, 0, 100)
        })
        animate_scroll_Y(options, store)
    }
}


export const maybe_start_dragging = (e, store, options) => {
    if (options.horizontal_scroll_triggered_by !== 'drag' && options.vertical_scroll_triggered_by !== 'drag') return
    store.update_state({
        dragging: true,
        drag_start_scroll_coords: [store.state.scroll_X, store.state.scroll_Y],
        drag_start_mouse_coords: [e.clientX, e.clientY]
    })
    e.target.style.cursor = 'grabbing'
}