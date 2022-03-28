export const update_cursor = (state, options, main_canvas_el) => {
    let cursor = 'auto'

    if (options.content_is_draggable) {
        cursor = 'grab'
    }

    if (options.highlight_team_history_on_click && state.hovered_team_id !== null) {
        cursor = 'pointer'
    }

    if (state.dragging) {
        cursor = 'grabbing'
    }

    main_canvas_el.style.cursor = cursor
}
