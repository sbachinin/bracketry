import { within_range } from '../utils/utils.mjs'
import { get_height_deficit_for_round } from '../utils/sizes.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'

export const maybe_start_dragging = (e, all_data, store, options) => {
    if (e.button !== 0) return
    
    if (options.horizontal_scroll_triggered_by !== 'drag' && options.vertical_scroll_triggered_by !== 'drag') return
    if (
        options.highlight_team_history_on_click
        && find_what_under_cursor(e, all_data, store.state.scroll_X, store.state.scroll_Y, options).hovered_match
    ) return
    
    store.update_state({
        dragging: true,
        drag_start_scroll_coords: [store.state.scroll_X, store.state.scroll_Y],
        drag_start_mouse_coords: [e.clientX, e.clientY],
    })
}





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
        const max_scroll_Y_px = get_height_deficit_for_round(
            all_data.rounds[0].matches.length,
            options,
        )
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
    if (!store.state.dragging) return

    store.update_state({
        dragging: false,
        drag_start_mouse_coords: [],
        drag_start_scroll_coords: []
    })

    animate_scroll({
        store,
        destination_scroll_X: within_range(
            store.state.scroll_X,
            0,
            all_content_width - e.target.width
        ),
        destination_scroll_Y: within_range(store.state.scroll_Y, 0, 100),
        duration: 300
    })
}
