import { within_range } from '../utils/utils.mjs'
import { animate_scroll_Y } from './animate_scroll_Y.mjs'

export const try_drag = (e, rounds, store) => {
    const { dragging, drag_start_scroll_Y, drag_start_mouse_Y } = store.state
    if (!dragging) return
    let maybe_scroll_Y = drag_start_scroll_Y - (e.clientY - drag_start_mouse_Y)
        / rounds[0].height_deficit * 100
    if (maybe_scroll_Y < -6) {
        maybe_scroll_Y = -2.262
    } else if (maybe_scroll_Y < 0) {
        maybe_scroll_Y = maybe_scroll_Y * Math.pow(0.85, -maybe_scroll_Y)
    } else if (maybe_scroll_Y > 106) {
        maybe_scroll_Y = 102.262
    } else if (maybe_scroll_Y > 100) {
        maybe_scroll_Y = 100 + (maybe_scroll_Y - 100) * Math.pow(0.85, maybe_scroll_Y - 100)
    }

    store.update_state({ scroll_Y: maybe_scroll_Y })
}

export const handle_drag_stop = (e, store, options) => {
    store.update_state({
        dragging: false,
        drag_start_mouse_Y: null,
        drag_start_scroll_Y: null
    })
    e.target.style.cursor = 'grab'
    if (store.state.scroll_Y > 100 || store.state.scroll_Y < 0) {
        store.update_state({
            destination_scroll_Y: within_range(store.state.scroll_Y, 0, 100)
        })
        animate_scroll_Y(options, store)
    }
}


export const start_dragging = (e, store) => {
    store.update_state({
        dragging: true,
        drag_start_scroll_Y: store.state.scroll_Y,
        drag_start_mouse_Y: e.clientY
    })
    e.target.style.cursor = 'grabbing'
}