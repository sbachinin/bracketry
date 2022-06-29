import { get_max_anchor_round_index } from '../utils/sizes.mjs'

export const update_buttons = (
    stable_elements,
    anchor_round_index,
    all_data,
    get_option
) => {
    const {
        matches_vertical_scroller,
        content_horizontal_scroller,
        navigation_buttons
    } = stable_elements

    const content_is_wider = matches_vertical_scroller.scrollWidth > content_horizontal_scroller.clientWidth
    navigation_buttons.update_hidden(content_is_wider, get_option)
    
    const left_is_active = anchor_round_index > 0
    const right_is_active = get_max_anchor_round_index(stable_elements, all_data, get_option) - anchor_round_index > 0.01
    navigation_buttons.update_active(left_is_active, right_is_active)
}