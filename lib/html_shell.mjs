import { create_element_from_Html, update_styles } from './utils.mjs'
import buttons_styles from './styles/buttons.scss'
import main_styles from './styles/main.scss'
import rounds_styles from './styles/rounds.scss'


export const create_html_shell = (user_wrapper_el) => {
    update_styles(
        'root',
        'permanent-styles',
        [buttons_styles, main_styles, rounds_styles].join('\n')
    )

    const the_root_element = create_element_from_Html(`
        <div class="bracket-root">

            <div class="navigation-button left"></div>
            <div class="navigation-button right"></div>
            <div class="scroll-button button-up"></div>
            <div class="scroll-button button-down"></div>

            <div class="round-titles-grid-item">
                <div class="round-titles-wrapper equal-width-columns-grid"></div>
            </div>

            <div class="scrollbar-parent">
                <div class="scrollbar"></div>
            </div>
            <div class="matches-scroller scroll-y-enabled with-hidden-native-scrollbar">
                <div class="matches-positioner equal-width-columns-grid"></div>
            </div>

        </div>
    `)

    user_wrapper_el.append(the_root_element)

    const find = (s) => the_root_element.querySelector(s)

    let elements = {
        the_root_element,
        scrollbar: find('.scrollbar'),
        round_titles_wrapper: find('.round-titles-wrapper'),
        matches_scroller: find('.matches-scroller'),
        matches_positioner: find('.matches-positioner'),
    }

    const uninstall = () => {
        Object.keys(elements).forEach(k => {
            if (elements[k] instanceof Element) {
                elements[k].remove()
            }
            delete elements[k]
        })
        elements = null
    }

    return {
        ...elements,
        uninstall
    }
}