export const animate_scroll_X_to_anchor_round = (
    all_data,
    store,
    { matches_scrollable_area, round_titles_canvas_el }
) => {
    const marginLeft = -store.state.scroll_X_anchor_round_index * all_data.width_per_round + 'px'
    matches_scrollable_area.style.marginLeft = marginLeft
    round_titles_canvas_el.style.marginLeft = marginLeft
}