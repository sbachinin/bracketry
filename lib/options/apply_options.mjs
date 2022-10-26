import { update_all_styles } from '../styles/update_all_styles.mjs'
import { get_options_flattened_meta } from './options_meta_getter.mjs'
import { is_object } from '../utils.mjs'


const update_the_DOM = (the_root_element, get_option) => {
    the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.innerHTML = get_option('leftNavigationButtonHTML'))
    the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.innerHTML = get_option('rightNavigationButtonHTML'))

    const button_up = the_root_element.querySelector('.button-up')
    button_up.innerHTML = get_option('scrollUpButtonHTML')
    const button_down = the_root_element.querySelector('.button-down')
    button_down.innerHTML = get_option('scrollDownButtonHTML')
    if (get_option('scrollButtonsPosition') === 'gutters') {
        button_up.classList.add('gutter')
        button_down.classList.add('gutter')
    } else {
        button_up.classList.remove('gutter')
        button_down.classList.remove('gutter')
    }

    const non_header_nav_buttons = the_root_element.querySelectorAll('.navigation-button.non-header-button')
    if (get_option('navButtonsPosition') === 'gutters') {
        non_header_nav_buttons.forEach(b => b.classList.add('gutter'))
    } else {
        non_header_nav_buttons.forEach(b => b.classList.remove('gutter'))
    }
}


export const apply_options = (
    new_options,
    options_dealer,
    root_id,
    { the_root_element }
) => {
    const get_option = options_dealer.get_final_value

    options_dealer.try_merge_options(new_options)

    update_the_DOM(the_root_element, get_option)

// ******* set primitive options as CSS variables
    const flattened_meta = get_options_flattened_meta()
    Object.entries(options_dealer.get_all_options()).forEach(([n, v]) => {
        const { type } = flattened_meta[n]
        if (['number', 'pixels', 'string'].includes(type)) {
            let value = v
            if (type === 'pixels') value += 'px'
            the_root_element.style.setProperty(`--${n}`, value)
        }
    })

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
