import { create_element_from_Html } from '../utils.mjs'

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

export const create_stable_elements = (user_wrapper_el, all_data) => {
    user_wrapper_el.innerHTML = ''

    const round_titles_html = `<div class="round-titles-wrapper  equal-width-columns-grid">
        ${
            all_data.rounds.map((r, i) => {
                return `<div class="round-name">${r.name}</div>`
            }).join('')
        }
    </div>`

    const matches_vertical_scroller_html = `<div class="matches-vertical-scroller with-hidden-scrollbar">
        <div class="matches-positioner equal-width-columns-grid"></div>
    </div>`

    const content_area_html = `
        <div class="content-area">
            ${round_titles_html}
            ${matches_vertical_scroller_html}
            <div class="scrollbar"></div>
        </div>
    `

    const the_root_element = create_element_from_Html(`
        <div class="root-brackets-element" id=${all_data.root_id}>
            <div class="buttons-header">
                <div class="navigation-button left"></div>
                <div class="navigation-button right"></div>
            </div>
            <div class="all-but-buttons-header">
                <div class="navigation-button non-header-button left"></div>
                ${content_area_html}
                <div class="navigation-button non-header-button right"></div>
            </div>
        </div>
    `)

    user_wrapper_el.append(the_root_element)
    
    return get_elements(all_data.root_id)
}