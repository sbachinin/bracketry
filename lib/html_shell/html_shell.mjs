import { create_element_from_Html, update_styles } from '../utils.mjs'
import buttons_styles from '../styles/permanent/buttons.scss'
import main_styles from '../styles/permanent/main.scss'
import rounds_styles from '../styles/permanent/rounds.scss'

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
        content_horizontal_scroller: find('.content-horizontal-scroller')
    }
}

export const create_html_shell = (user_wrapper_el, root_id) => {
    [...user_wrapper_el.querySelectorAll('.playoffs-root')].forEach(epr => epr.remove())

    update_styles(
        'root',
        'permanent-styles',
        [buttons_styles, main_styles, rounds_styles].join('\n')
    )

    const the_root_element = create_element_from_Html(`
        <div class="playoffs-root" id=${root_id}>
            <div class="buttons-header">
                <div class="navigation-button left"></div>
                <div class="navigation-button right"></div>
            </div>
            <div class="all-but-buttons-header">
                <div class="navigation-button non-header-button left"></div>
                <div class="content-area">
                    <div class="content-horizontal-scroller">
                        <div class="round-titles-wrapper  equal-width-columns-grid"></div>
                        <div class="matches-vertical-scroller with-hidden-scrollbar">
                            <div class="matches-positioner equal-width-columns-grid"></div>
                        </div>
                    </div>
                    <div class="scrollbar-parent">
                        <div class="scrollbar"></div>
                    </div>
                </div>
                <div class="navigation-button non-header-button right"></div>
            </div>
        </div>
    `)

    user_wrapper_el.append(the_root_element)

    return get_elements(root_id)
}