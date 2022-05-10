import { get_max_scroll_round_index } from '../utils/sizes.mjs'

export const update_buttons = (
    stable_elements,
    anchor_round_index,
    all_data
) => {
    const {
        matches_vertical_scroller,
        content_horizontal_scroller,
        left_scroll_button,
        right_scroll_button
    } = stable_elements

    const content_is_wider = matches_vertical_scroller.scrollWidth > content_horizontal_scroller.clientWidth
    left_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    right_scroll_button.classList[content_is_wider ? 'remove' : 'add']('hidden')
    const left_is_active = anchor_round_index > 0
    left_scroll_button.classList[left_is_active ? 'add' : 'remove']('active')
    const right_is_active = anchor_round_index < get_max_scroll_round_index(stable_elements, all_data)
    right_scroll_button.classList[right_is_active ? 'add' : 'remove']('active')
}