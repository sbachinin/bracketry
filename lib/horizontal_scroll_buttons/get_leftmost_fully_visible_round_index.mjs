export const get_leftmost_fully_visible_round_index = (scroll_X, round_width_with_margin) => {
    const outscrolled_rounds_count = scroll_X / round_width_with_margin
    // if the leftmost round is hidden by less then 10%, consider it fully visible
    if (outscrolled_rounds_count % 1 < 0.1) {
        return Math.floor(outscrolled_rounds_count)
    }
    return Math.ceil(outscrolled_rounds_count)
}