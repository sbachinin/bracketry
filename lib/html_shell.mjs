import { create_element_from_Html, update_styles } from './utils.mjs'
import buttons_styles from './styles/buttons.scss'
import main_styles from './styles/main.scss'
import rounds_styles from './styles/rounds.scss'

export const get_elements = (root_id) => {
    const the_root_element = document.querySelector(`#${root_id}`)
    if (!the_root_element) return null
    const find = (s) => the_root_element.querySelector(s)

    return {
        /* can be null */fullscreen_wrapper: the_root_element.closest('.playoffs-fullscreen-wrapper'),
        the_root_element,
        scrollbar: find('.scrollbar'),
        content_area: find('.content-area'),
        round_titles_wrapper: find('.round-titles-wrapper'),
        matches_scroller: find('.matches-scroller'),
        matches_positioner: find('.matches-positioner'),
    }
}

export const create_html_shell = (user_wrapper_el, root_id, is_fullscreen) => {
    const selector = ':scope > .playoffs-root, :scope > .playoffs-fullscreen-wrapper'
    const old_playoffs = [...user_wrapper_el.querySelectorAll(selector)]
    old_playoffs.forEach(el => el.remove())

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
                    <div class="round-titles-wrapper  equal-width-columns-grid"></div>
                    <div class="vertical-scroll-button button-up"></div>
                    <div class="matches-wrapper">
                        <div class="scrollbar-parent">
                            <div class="scrollbar"></div>
                        </div>
                        <div class="matches-scroller with-hidden-native-scrollbar">
                            <div class="matches-positioner equal-width-columns-grid"></div>
                        </div>
                    </div>
                    <div class="vertical-scroll-button button-down"></div>
                </div>
                <div class="navigation-button non-header-button right"></div>
            </div>
        </div>
    `)

    if (is_fullscreen) {
        const fullscreen_wrapper = create_element_from_Html(`
            <div class="playoffs-fullscreen-wrapper">
                <div class="exit-fullscreen-button">
                    <div class="circle-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>
                    </div>
                </div>
            </div>
        `)
        fullscreen_wrapper.append(the_root_element)
        user_wrapper_el.append(fullscreen_wrapper)
    } else {
        user_wrapper_el.append(the_root_element)
    }


    return get_elements(root_id)
}