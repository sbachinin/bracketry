import { create_single_button } from '../buttons/create_single_button.mjs'
import { debounce, insert_styles, update_styles } from '../utils/utils.mjs'
import { VERT_BUTTONS_STYLES_ID } from '../constants.mjs'
import { get_vert_buttons_styles } from './get_vert_buttons_styles.mjs'

export const create_vertical_scroll_buttons = (
    root_id,
    options
) => {
    insert_styles(root_id, VERT_BUTTONS_STYLES_ID, get_vert_buttons_styles(root_id, options))

    const up_button = create_single_button(root_id, ['vertical', 'up'])
    const down_button = create_single_button(root_id, ['vertical', 'down'])
    
    const update_single_button = (button, icon, new_options) => {
        button.clickable_area.innerHTML = icon
        button.clickable_area.querySelector('svg')?.setAttribute('height', new_options.vertical_scroll_icon_size)
        button.clickable_area.querySelector('svg')?.setAttribute('width', new_options.vertical_scroll_icon_size)
    }

    const apply_options = new_options => {
        update_single_button(up_button, new_options.up_scroll_button_icon, new_options)
        update_single_button(down_button, new_options.down_scroll_button_icon, new_options)
        update_styles(root_id, VERT_BUTTONS_STYLES_ID, get_vert_buttons_styles(root_id, new_options))
    }

    const update_visibility = debounce((options, destination_scroll_Y) => {
        const should_show = !options.auto_canvas_size
            && !options.content_is_draggable
            && options.vertical_scroll_triggered_by === 'buttons'
        up_button.wrapper.classList[destination_scroll_Y <= 0 ? 'add' : 'remove']('disabled')
        up_button.wrapper
            .classList[should_show ? 'remove' : 'add']
            ('hidden')
        
        down_button.wrapper.classList[destination_scroll_Y >= 100 ? 'add' : 'remove']('disabled')
        down_button.wrapper
            .classList[should_show ? 'remove' : 'add']
            ('hidden')
    }, 50)

    return {
        apply_options,
        update_visibility,
        up_button,
        down_button
    }
}