import { create_element_from_Html, update_styles } from '../utils.mjs'
import { get_general_permanent_styles } from '../styles/permanent/general_styles.mjs'
import { get_buttons_permanent_styles } from '../styles/permanent/buttons_styles.mjs'
import { get_mobile_permanent_styles } from '../styles/permanent/mobile_styles.mjs'
import { get_rounds_permanent_styles } from '../styles/permanent/rounds_styles.mjs'

export const get_elements = (root_id) => {
    const the_root_element = document.querySelector(`#${root_id}`)
    if (!the_root_element) return null
    const find = (s) => the_root_element.querySelector(s)

    return {
        the_root_element,
        scrollbar: find('.scrollbar'),
        content_area: find('.content-area'),
        round_titles_wrapper: find('.round-titles-wrapper'),
        matches_vertical_scroller: find('.matches-vertical-scroller'),
        matches_positioner: find('.matches-positioner'),
    }
}

export const create_html_shell = (user_wrapper_el, root_id) => {
    user_wrapper_el.innerHTML = ''

    update_styles(
        root_id,
        'permanent-styles',
        (
            get_general_permanent_styles(root_id)
            + get_buttons_permanent_styles(root_id)
            + get_mobile_permanent_styles(root_id)
            + get_rounds_permanent_styles(root_id)
        )
    )

    // TODO rename root-brackets-element to maybe easy-playoffs-root
    const the_root_element = create_element_from_Html(`
        <div class="root-brackets-element" id=${root_id}>
            <div class="buttons-header">
                <div class="navigation-button left"></div>
                <div class="navigation-button right"></div>
            </div>
            <div class="all-but-buttons-header">
                <div class="navigation-button non-header-button left"></div>
                <div class="content-area">
                    <div class="round-titles-wrapper  equal-width-columns-grid"></div>
                    <div class="matches-vertical-scroller with-hidden-scrollbar">
                        <div class="matches-positioner equal-width-columns-grid"></div>
                    </div>
                    <div class="scrollbar"></div>
                </div>
                <div class="navigation-button non-header-button right"></div>
            </div>
        </div>
    `)

    user_wrapper_el.append(the_root_element)
    
    return get_elements(root_id)
}