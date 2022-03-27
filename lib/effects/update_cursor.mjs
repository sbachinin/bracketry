export const update_cursor = (state, options, main_canvas_el) => {
    let cursor = 'auto'

    if (!options.auto_canvas_size
        && (options.horizontal_scroll_triggered_by === 'drag'
        || options.vertical_scroll_triggered_by === 'drag')
    ) {
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
