import { create_element_from_Html } from '../utils/utils.mjs'


export const create_stable_elements = (user_wrapper_el, all_data) => {

    const scroll_left_button_html = `<div class="scroll-button left"></div>`
    const scroll_right_button_html = `<div class="scroll-button right"></div>`

    const round_titles_html = `<div class="round-titles-wrapper  equal-width-columns-grid">
        ${ all_data.rounds.map(r => `<div class="round-title">${r.name}</div>`).join('') }
    </div>`

    const matches_vertical_scroller_html = `<div class="matches-vertical-scroller with-hidden-scrollbar"
        style="
            display: flex;
            flex: 1;
            position: relative;
            overflow-y: scroll;
            overflow-x: hidden;
        "
    >
        <div class="matches-scrollable-area" style="
            position: relative;
            display: flex;
            height: max-content;
            overflow: hidden;
            min-height: 100%;
        ">
            <div class="rounds-elements-wrapper equal-width-columns-grid"></div>
            <canvas class="lines-canvas" style="
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                border: none;
                user-select: none;
                pointer-events: none;
            "></canvas>
        </div>
    </div>`
    
    const content_area_html = `
        <div class="content-area"
            style="
                position: absolute;
                left: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
            "
        >
            ${round_titles_html}
            ${matches_vertical_scroller_html}
        </div>
    `

    const content_horizontal_scroller_html = `
        <div class="content-horizontal-scroller"
            style="
                position: relative;
                flex: 1;
                height: 100%;
                overflow: hidden;
                min-height: 300px;
            "
        >
            ${content_area_html}
            <div class="scrollbar" style="
                position: absolute;
                z-index: 2;
                right: 0;
                width: 5px;
            "></div>
        </div>
    `
    
    const the_root_element = create_element_from_Html(`
        <div
            class="root_brackets_element"
            id=${all_data.root_id}
            style="
                overflow: hidden;
                position: relative;
                width: 100%;
                min-width: 300px;
                height: 100%;
                display: flex;
        ">
            ${scroll_left_button_html}
            ${content_horizontal_scroller_html}
            ${scroll_right_button_html}
        </div>
    `)
    const content_horizontal_scroller = the_root_element.querySelector('.content-horizontal-scroller')
    const scrollbar = the_root_element.querySelector('.scrollbar')
    const content_area = the_root_element.querySelector('.content-area')
    const round_titles_wrapper = the_root_element.querySelector('.round-titles-wrapper')
    const matches_vertical_scroller = the_root_element.querySelector('.matches-vertical-scroller')
    const lines_canvas = the_root_element.querySelector('.lines-canvas')
    const rounds_elements_wrapper = the_root_element.querySelector('.rounds-elements-wrapper')
    const left_scroll_button = the_root_element.querySelector('.scroll-button.left')
    const right_scroll_button = the_root_element.querySelector('.scroll-button.right')
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
        lines_canvas,
        rounds_elements_wrapper,
        left_scroll_button,
        right_scroll_button,
    }
}