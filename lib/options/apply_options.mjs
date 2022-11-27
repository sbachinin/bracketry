import { get_options_flattened_meta } from './options_meta_getter.mjs'
import { is_object } from '../utils.mjs'


const feature_classes = {
    'with-scroll-buttons-over-matches': (o) => o.scrollButtonsPosition === 'overMatches',
    'with-hidden-nav-buttons': (o) => o.navButtonsPosition === 'hidden',
    'with-gutter-nav-buttons': (o) => o.navButtonsPosition === 'gutters',
    'with-nav-buttons-over_matches': (o) => o.navButtonsPosition === 'overMatches',
    'with-nav-buttons-before-titles': (o) => o.navButtonsPosition === 'beforeTitles',
    'with-nav-buttons-over-titles': (o) => o.navButtonsPosition === 'overTitles',
    'with-onMatchClick': (o) => typeof o.onMatchClick === 'function',
    'with-classical-layout': (o) => o.useClassicalLayout === true,
    'with-clickable-sides': (o) => typeof o.onMatchSideClick === 'function' || o.disableHighlight !== true,
    'with-vertical-scroll-buttons': (o) => o.verticalScrollMode === 'buttons' || o.verticalScrollMode === 'mixed',
    'with-native-scroll': (o) => o.verticalScrollMode === 'native',
    'fullscreen': (o) => o.fullscreen === true,
    'with-visible-scrollbar': (o) => o.showScrollbar === true
}

const update_the_DOM = (the_root_element, get_option) => {
    the_root_element.querySelector('.navigation-button.left .button-icon-wrapper')
        .innerHTML = get_option('leftNavigationButtonHTML')
    the_root_element.querySelector('.navigation-button.right .button-icon-wrapper')
        .innerHTML = get_option('rightNavigationButtonHTML')

    the_root_element.querySelector('.button-up .button-icon-wrapper')
        .innerHTML = get_option('scrollUpButtonHTML')
    the_root_element.querySelector('.button-down .button-icon-wrapper')
        .innerHTML = get_option('scrollDownButtonHTML')
}


export const apply_options = (
    new_options,
    options_dealer,
    { fullscreen_wrapper, the_root_element }
) => {
    const get_option = options_dealer.get_final_value

    options_dealer.try_merge_options(new_options)

    update_the_DOM(the_root_element, get_option)

// ******* set primitive options as CSS variables
    const flattened_meta = get_options_flattened_meta()
    const final_options = options_dealer.get_all_final_options()
    Object.entries(final_options).forEach(([n, v]) => {
        const { type } = flattened_meta[n]
        if (['pixels', 'string'].includes(type)) {
            let value = v
            if (type === 'pixels') value = parseInt(value) + 'px'
            const el = fullscreen_wrapper || the_root_element
            el.style.setProperty(`--${n}`, value)
        }
    })

// ******* set feature classes on root element
    Object.entries(feature_classes).forEach(([className, condition]) => {
        if (condition(final_options)) {
            the_root_element.classList.add(className)
        } else {
            the_root_element.classList.remove(className)
        }
    })
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
