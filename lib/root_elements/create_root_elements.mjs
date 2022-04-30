import { create_element_from_Html, update_styles } from '../utils/utils.mjs'

const get_general_styles = (root_id) => `
    #${root_id} * {
        box-sizing: border-box;
        user-select: none;
    }

    #${root_id} .with-hidden-scrollbar {
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }

    #${root_id} .with-hidden-scrollbar::-webkit-scrollbar {
        width: 0px; /* For Chrome, Safari, and Opera */
    }

    #${root_id} .round-title {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
    }
`

const get_buttons_styles = (root_id) => `
    #${root_id} .scroll-button-wrapper {
        position: relative;
        cursor: auto;
        user-select: none;
    }
    #${root_id} .scroll-button-wrapper .button-clickable-area {
        position: absolute;
        z-index: 1;
        transform: translate(0, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity ease-in-out 0.2s;
        opacity: 0.15;
    }
    #${root_id} .scroll-button-wrapper.left .button-clickable-area {
        left: 0;
    }
    #${root_id} .scroll-button-wrapper.right .button-clickable-area {
        right: 0;
    }
        
    #${root_id} .scroll-button-wrapper.hidden {
        visibility: hidden;
    }

    #${root_id} .scroll-button-wrapper.active {
        cursor: pointer;
    }

    #${root_id} .scroll-button-wrapper.active .button-clickable-area {
        opacity: 0.65;
    }
    #${root_id} .scroll-button-wrapper.active:hover .button-clickable-area {
        opacity: 1;
    }

    #${root_id} .scroll-button-wrapper .default-scroll-svg {
        width: 100%;
        height: auto;
        padding: 12%;
    }
`




export const create_root_elements = (user_wrapper_el, root_id) => {
    update_styles(
        root_id,
        'general-styles',
        get_general_styles(root_id) + get_buttons_styles(root_id)
    )
    const scroll_left_button_html = `
        <div class="scroll-button-wrapper left">
            <div class="button-clickable-area"></div>
        </div>
    `
    const scroll_right_button_html = `
        <div class="scroll-button-wrapper right">
            <div class="button-clickable-area"></div>
        </div>
    `

    const round_titles_html = `<div class="round-titles-wrapper"></div>`
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
        ">
            <div class="rounds-elements-wrapper" style="
                display: flex;
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            "></div>
            <canvas class="lines-canvas" style="border: none; user-select: none"></canvas>
        </div>
    </div>`
    
    const content_area_html = `
        <div class="content-area"
            style="
                position: absolute;
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
            "
        >
            ${content_area_html}
        </div>
    `
    
    const the_root_element = create_element_from_Html(`
        <div
            class="root_brackets_element"
            id=${root_id}
            style="
                overflow: hidden;
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
        ">
            ${scroll_left_button_html}
            ${content_horizontal_scroller_html}
            ${scroll_right_button_html}
        </div>
    `)
    const content_horizontal_scroller = the_root_element.querySelector('.content-horizontal-scroller')
    const content_area = the_root_element.querySelector('.content-area')
    const round_titles = the_root_element.querySelector('.round-titles-wrapper')
    const matches_vertical_scroller = the_root_element.querySelector('.matches-vertical-scroller')
    const lines_canvas = the_root_element.querySelector('.lines-canvas')
    const rounds_elements_wrapper = the_root_element.querySelector('.rounds-elements-wrapper')
    const left_scroll_button = the_root_element.querySelector('.scroll-button-wrapper.left')
    const right_scroll_button = the_root_element.querySelector('.scroll-button-wrapper.right')


    user_wrapper_el.append(the_root_element)

    return {
        the_root_element,
        content_horizontal_scroller,
        content_area,
        round_titles,
        matches_vertical_scroller,
        lines_canvas,
        rounds_elements_wrapper,
        left_scroll_button,
        right_scroll_button,
    }
}