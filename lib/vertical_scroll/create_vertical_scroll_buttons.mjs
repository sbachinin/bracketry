import { create_single_button } from '../buttons/create_single_button.mjs'

export const create_vertical_scroll_buttons = (
    // all_data,
    root_brackets_el,
    // options,
    store,
    // root_id,
) => {
    

    // update_buttons_styles(root_id, options)

    const update_round_index = change => {
        store.update_state({
            scroll_Y: store.state.scroll_Y + (options.vertical_scroll_amount * change)
        })
    }

    const left_button = create_single_button('up')
    const right_button = create_single_button('down')
    
    root_brackets_el.append(left_button, right_button)




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