import { create_single_button } from '../buttons/create_single_button.mjs'
import { insert_styles } from '../utils/utils.mjs'
import { VERT_BUTTONS_STYLES_ID } from '../constants.mjs'

export const create_vertical_scroll_buttons = (
    root_id,
    options
) => {

    insert_styles(root_id, VERT_BUTTONS_STYLES_ID, `jopa`)

    const up_button = create_single_button(root_id, ['vertical', 'up'])
    const down_button = create_single_button(root_id, ['vertical', 'down'])
    
    return { up_button, down_button }




    // const update_single_button = (button, side) => {
    //     button.innerHTML = side === 'left'
    //             ? options.horizontal_scroll_buttons_icon_left
    //             : options.horizontal_scroll_buttons_icon_right
    //     button.querySelector('svg')?.setAttribute('height', options.horizontal_scroll_icon_size)
    //     button.querySelector('svg')?.setAttribute('width', options.horizontal_scroll_icon_size)
    // }

    // const apply_options = () => {
    //     update_single_button(left_button, 'left')
    //     update_single_button(right_button, 'right')
    //     update_buttons_styles(root_id, options)
    // }

    // const update_visibility = debounce(() => {
    //     const left_is_visible = options.horizontal_scroll_triggered_by === 'buttons' && store.state.scroll_X > 0
    //     left_button.classList[left_is_visible ? 'remove' : 'add']('hidden')
    //     const right_is_visible = options.horizontal_scroll_triggered_by === 'buttons'
    //         && store.state.scroll_X + root_brackets_el.clientWidth < (all_data.all_content_width)
    //     right_button.classList[right_is_visible ? 'remove' : 'add']('hidden')
    // }, 50)

    // return {
    //     apply_options,
    //     update_visibility
    // }
}