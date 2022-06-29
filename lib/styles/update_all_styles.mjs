import { update_styles } from '../utils/utils.mjs'
import { get_rounds_styles } from './round_styles.mjs'
import { get_general_styles } from './general_styles.mjs'
import { get_buttons_styles } from './buttons_styles.mjs'
import { get_mobile_styles } from './mobile_styles.mjs'

export const update_all_styles = (root_id, get_option) => {
    update_styles(root_id, 'general-styles', get_general_styles(root_id, get_option))
    update_styles(root_id, 'buttons-styles', get_buttons_styles(root_id, get_option))
    update_styles(root_id, 'rounds-styles', get_rounds_styles(root_id, get_option))
    update_styles(root_id, 'mobile-styles', get_mobile_styles(root_id, get_option))
}
