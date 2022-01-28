import { within_range } from '../utils/utils.mjs'
import { animate_scroll } from './animate_scroll.mjs'

const dampen = n => (n > 100) ? 36.5 : n * Math.pow(0.99, n)

const maybe_dampen_overscroll = (new_scroll_px, max_scroll_px) => {
    if (new_scroll_px < 0) {
        return -dampen(Math.abs(new_scroll_px))
    }
    if (new_scroll_px > max_scroll_px) {
        return max_scroll_px + dampen(new_scroll_px - max_scroll_px)
    }
    return new_scroll_px
}


export const maybe_drag = (e, all_data, store, options) => {
    if (!store.state.dragging) return

    const update = {}

    if (options.vertical_scroll_triggered_by === 'drag') {
        const max_scroll_Y_px = all_data.rounds[0].height_deficit
        const init_scroll_Y_px = max_scroll_Y_px / 100 * store.state.drag_start_scroll_coords[1]
        const new_scroll_Y_px = init_scroll_Y_px - (e.clientY - store.state.drag_start_mouse_coords[1])
        update.scroll_Y = maybe_dampen_overscroll(new_scroll_Y_px, max_scroll_Y_px) / max_scroll_Y_px * 100
    }

    if (options.horizontal_scroll_triggered_by === 'drag') {
        let new_scroll_X = store.state.drag_start_scroll_coords[0] - (e.clientX - store.state.drag_start_mouse_coords[0])
        update.scroll_X = maybe_dampen_overscroll(new_scroll_X, all_data.all_content_width - e.target.width)
    }

    Object.keys(update).length && store.update_state(update)
}

export const maybe_stop_drag = (e, all_content_width, store) => {
    store.update_state({
        dragging: false,
        drag_start_mouse_coords: [],
        drag_start_scroll_coords: []
    })
    e.target.style.cursor = 'grab'

    const destination_scroll_Y = (store.state.scroll_Y < 0 || store.state.scroll_Y > 100)
        ? within_range(store.state.scroll_Y, 0, 100)
        : undefined

    const max_scroll_X = all_content_width - e.target.width
    const destination_scroll_X = (store.state.scroll_X < 0 || store.state.scroll_X > max_scroll_X)
        ? within_range(store.state.scroll_X, 0, max_scroll_X)
        : undefined

    animate_scroll({
        store,
        destination_scroll_Y,
        destination_scroll_X,
        duration: 300
    })

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