import { update_all_styles } from '../styles/update_all_styles.mjs'
import { get_options_flattened_meta } from './options_meta_getter.mjs'
import { is_object } from '../utils.mjs'


export const apply_options = (
    new_options,
    options_dealer,
    root_id,
    { the_root_element }
) => {
    const get_option = options_dealer.get_final_value

    options_dealer.try_merge_options(new_options)

    the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.innerHTML = get_option('leftNavigationButtonHTML'))
    the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.innerHTML = get_option('rightNavigationButtonHTML'))

    the_root_element.querySelector('.button-up').innerHTML = get_option('scrollUpButtonHTML')
    the_root_element.querySelector('.button-down').innerHTML = get_option('scrollDownButtonHTML')

    update_all_styles(root_id, get_option)
}


export const filter_updatable_options = (options) => {
    const meta = get_options_flattened_meta()
    const updatable_options = {}
    
    is_object(options)
        && Object.entries(options).forEach(([n, v]) => {
            if (
                meta[n]?.type === 'function_or_null'
                || meta[n].non_updatable === true
            ) {
                console.warn(`${n} option can't be updated via applyNewOptions`)
            } else {
                updatable_options[n] = v
            }
        })
    
    return updatable_options
}
