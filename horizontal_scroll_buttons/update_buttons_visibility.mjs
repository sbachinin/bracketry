export const update_buttons_visibility = (
    new_leftmost_round_index,
    invisible_rounds_count,
    leftButton, rightButton
) => {
    if (new_leftmost_round_index <= 0) {
        leftButton.classList.add('hidden')
    } else {
        leftButton.classList.remove('hidden')
    }
    if (new_leftmost_round_index >= invisible_rounds_count) {
        rightButton.classList.add('hidden')
    } else {
        rightButton.classList.remove('hidden')
    }
}