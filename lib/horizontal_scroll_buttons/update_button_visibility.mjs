export const update_button_visibility = (
    button,
    new_leftmost_round_index,
    invisible_rounds_count
) => {
    if (button.classList.contains('scroll-rounds-button-left')) {
        if (new_leftmost_round_index <= 0) {
            button.classList.add('hidden')
        } else {
            button.classList.remove('hidden')
        }
    } else { // for right button:
        if (new_leftmost_round_index >= invisible_rounds_count) {
            button.classList.add('hidden')
        } else {
            button.classList.remove('hidden')
        }
    }
}