export const props_to_reset_on_full_update = {
    expanded_match: null,
    previous_expanded_match: null,
    expanded_match_opacity: 0,
    canvas_scrolled_recently: false,
    cursor: 'auto',
    highlighted_team_id: undefined,
    tooltip: null,

    dragging: false, drag_start_scroll_coords: [], drag_start_mouse_coords: []
}

export const default_state = {
    scroll_Y: 0,
    destination_scroll_Y: undefined,
    scroll_X: 0,
    scroll_X_anchor_round_index: 0,
    destination_scroll_X: undefined,
    ...props_to_reset_on_full_update
}