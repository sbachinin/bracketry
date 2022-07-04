import { create_element_from_Html } from '../utils/utils.mjs'

export const get_elements = (root_id) => {
    const the_root_element = document.querySelector(`#${root_id}`)
    if (!the_root_element) return null
    const find = (s) => the_root_element.querySelector(s)

    return {
        the_root_element,
        content_horizontal_scroller: find('.content-horizontal-scroller'),
        scrollbar: find('.scrollbar'),
        content_area: find('.content-area'),
        round_titles_wrapper: find('.round-titles-wrapper'),
        matches_vertical_scroller: find('.matches-vertical-scroller'),
        matches_scrollable_area: find('.matches-scrollable-area'),
    }
}

export const create_stable_elements = (user_wrapper_el, all_data) => {
    user_wrapper_el.innerHTML = ''

    const round_titles_html = `<div class="round-titles-wrapper  equal-width-columns-grid">
        ${
            all_data.rounds.map(
                (r, r_i) => {
                    return `<div class="round-title ${r_i === 0 ? 'base-round' : ''}">${r.name}</div>`
                }
            ).join('')
        }
    </div>`

    const matches_vertical_scroller_html = `<div class="matches-vertical-scroller with-hidden-scrollbar">
        <div class="matches-scrollable-area equal-width-columns-grid"></div>
    </div>`

    const content_area_html = `
        <div class="content-area">
            ${round_titles_html}
            ${matches_vertical_scroller_html}
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
                <div class="content-horizontal-scroller">
                    ${content_area_html}
                    <div class="scrollbar"></div>
                </div>
                <div class="navigation-button non-header-button right"></div>
            </div>
        </div>
    `)

    user_wrapper_el.append(the_root_element)
    
    return get_elements(all_data.root_id)
}