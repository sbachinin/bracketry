import { create_element_from_Html } from '../utils/utils.mjs'

const create_scroll_buttons = (the_root_element) => {
    const left = the_root_element.querySelector('.scroll-button.non-header-button.left')
    const right = the_root_element.querySelector('.scroll-button.non-header-button.right')
    const top_left = the_root_element.querySelector('.buttons-header .scroll-button.left')
    const top_right = the_root_element.querySelector('.buttons-header .scroll-button.right')

    return {
        left,
        right,
        top_left,
        top_right,
        update_innerHTML(options) {
            left.innerHTML = options.left_scroll_button_icon
            top_left.innerHTML = options.left_scroll_button_icon
            right.innerHTML = options.right_scroll_button_icon
            top_right.innerHTML = options.right_scroll_button_icon
        },
        update_hidden(content_is_wider) {
            const method = content_is_wider ? 'remove' : 'add'
            left.classList[method]('hidden')
            top_left.classList[method]('hidden')
            right.classList[method]('hidden')
            top_right.classList[method]('hidden')
        },
        update_active(left_is_active, right_is_active) {
            left.classList[left_is_active ? 'add' : 'remove']('active')
            top_left.classList[left_is_active ? 'add' : 'remove']('active')
            right.classList[right_is_active ? 'add' : 'remove']('active')
            top_right.classList[right_is_active ? 'add' : 'remove']('active')
        }
    }
}


export const create_stable_elements = (user_wrapper_el, all_data) => {

    const round_titles_html = `<div class="round-titles-wrapper  equal-width-columns-grid">
        ${ all_data.rounds.map(r => `<div class="round-title">${r.name}</div>`).join('') }
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
                <div class="scroll-button left"></div>
                <div class="scroll-button right"></div>
            </div>
            <div class="all-but-buttons-header">
                <div class="scroll-button non-header-button left"></div>
                <div class="content-horizontal-scroller">
                    ${content_area_html}
                    <div class="scrollbar"></div>
                </div>
                <div class="scroll-button non-header-button right"></div>
            </div>
        </div>
    `)
    const content_horizontal_scroller = the_root_element.querySelector('.content-horizontal-scroller')
    const scrollbar = the_root_element.querySelector('.scrollbar')
    const content_area = the_root_element.querySelector('.content-area')
    const round_titles_wrapper = the_root_element.querySelector('.round-titles-wrapper')
    const matches_vertical_scroller = the_root_element.querySelector('.matches-vertical-scroller')
    const matches_scrollable_area = the_root_element.querySelector('.matches-scrollable-area')

    user_wrapper_el.append(the_root_element)

    return {
        the_root_element,
        content_horizontal_scroller,
        scrollbar,
        content_area,
        round_titles_wrapper,
        matches_vertical_scroller,
        matches_scrollable_area,
        scroll_buttons: create_scroll_buttons(the_root_element),
    }
}