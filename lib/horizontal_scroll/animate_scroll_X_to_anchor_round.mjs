export const animate_scroll_X_to_anchor_round = (all_data, store, main_canvas_el) => {
    main_canvas_el.style.marginLeft = -store.state.scroll_X_anchor_round_index * all_data.width_per_round + 'px'
}