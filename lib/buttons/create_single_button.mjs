import { create_element_from_Html } from '../utils/utils.mjs'
import { maybe_insert_buttons_shared_styles } from './buttons_static_shared_styles.mjs'

export const create_single_button = (root_id, button_classes) => {
    maybe_insert_buttons_shared_styles(root_id)
    
    const wrapper = create_element_from_Html(`
        <div class="scroll-button-wrapper ${button_classes.join(' ')} inactive">
            <div class="button-clickable-area">
            </div>
        </div>
    `)

    return {
        wrapper,
        clickable_area: wrapper.querySelector('.button-clickable-area')
    }
}