import { update_styles } from '../utils.mjs'
import { get_rounds_styles } from './optional/rounds_styles.mjs'
import { get_general_styles } from './optional/general_styles.mjs'
import { get_buttons_styles } from './optional/buttons_styles.mjs'
import { get_scroll_buttons_styles } from './optional/scroll_buttons_styles.mjs'

export const update_all_styles = (root_id, get_option) => {
    // TODO think about using scss and removing the comments
    update_styles(root_id, 'general-styles', get_general_styles(get_option).replace(/##/g, `#${root_id}`))
    update_styles(root_id, 'buttons-styles', get_buttons_styles(get_option).replace(/##/g, `#${root_id}`))
    update_styles(root_id, 'scroll-buttons-styles', get_scroll_buttons_styles(get_option).replace(/##/g, `#${root_id}`))
    update_styles(root_id, 'rounds-styles', get_rounds_styles(get_option).replace(/##/g, `#${root_id}`))
}
