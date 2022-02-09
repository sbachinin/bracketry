import { update_buttons_styles } from './update_buttons_styles.mjs'
import { create_single_button } from '../../buttons/create_single_button.mjs'
import { debounce, get_main_canvas } from '../../utils/utils.mjs'

export const create_horizontal_scroll_buttons = (root_id, options) => {
    update_buttons_styles(root_id, options)

    const left_button = create_single_button('left', () => update_round_index(-1))
    const right_button = create_single_button('right', () => update_round_index(+1))


    const update_single_button = (button, side) => {
        button.innerHTML = side === 'left'
                ? options.horizontal_scroll_buttons_icon_left
                : options.horizontal_scroll_buttons_icon_right
        button.querySelector('svg')?.setAttribute('height', options.horizontal_scroll_buttons_size)
        button.querySelector('svg')?.setAttribute('width', options.horizontal_scroll_buttons_size)
    }

    const apply_options = new_options => {
        update_single_button(left_button, 'left')
        update_single_button(right_button, 'right')
        update_buttons_styles(root_id, new_options)
    }

    const update_visibility = debounce((all_content_width, options, scroll_X) => {
        const left_is_visible = options.horizontal_scroll_triggered_by === 'buttons' && scroll_X > 0
        left_button.classList[left_is_visible ? 'remove' : 'add']('hidden')
        const right_is_visible = options.horizontal_scroll_triggered_by === 'buttons'
            && (scroll_X + get_main_canvas().width) < all_content_width
        right_button.classList[right_is_visible ? 'remove' : 'add']('hidden')
    }, 50)

    return {
        apply_options,
        update_visibility,
        left_button,
        right_button
    }
}