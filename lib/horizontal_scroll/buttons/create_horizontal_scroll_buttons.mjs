import { update_buttons_styles } from './update_buttons_styles.mjs'
import { create_single_button } from '../../buttons/create_single_button.mjs'
import { debounce } from '../../utils/utils.mjs'
import { get_max_scroll_round_index } from '../get_max_scroll_round_index.mjs'

export const create_horizontal_scroll_buttons = (root_id, options) => {
    update_buttons_styles(root_id, options)

    const left_button = create_single_button('left')
    const right_button = create_single_button('right')

    const update_single_button = (button, icon, new_options) => {
        button.clickable_area.innerHTML = icon
        button.clickable_area.querySelector('svg')?.setAttribute('height', new_options.horizontal_scroll_icon_size)
        button.clickable_area.querySelector('svg')?.setAttribute('width', new_options.horizontal_scroll_icon_size)
    }

    const apply_options = new_options => {
        update_single_button(left_button, new_options.horizontal_scroll_buttons_icon_left, new_options)
        update_single_button(right_button, new_options.horizontal_scroll_buttons_icon_right, new_options)
        update_buttons_styles(root_id, new_options)
    }

    const update_visibility = debounce((all_data, options, scroll_X_anchor_round_index) => {
        const left_is_visible = options.horizontal_scroll_triggered_by === 'buttons' && scroll_X_anchor_round_index > 0
        
        left_button.wrapper
            .classList[left_is_visible ? 'remove' : 'add']('inactive')

        const right_is_visible = options.horizontal_scroll_triggered_by === 'buttons'
            && scroll_X_anchor_round_index < get_max_scroll_round_index(all_data, options)
        
        right_button.wrapper
            .classList[right_is_visible ? 'remove' : 'add']('inactive')
    }, 50)

    return {
        apply_options,
        update_visibility,
        left_button,
        right_button
    }
}