import { debounce, set_element_style } from '../utils/utils.mjs'
import {
    MAIN_CANVAS_CLASS_NAME,
    ROUND_TITLES_CANVAS_CLASS_NAME,
    ROOT_ELEMENT_CLASS_NAME,
} from '../constants.mjs'
import { create_horizontal_scroll_buttons } from '../horizontal_scroll/buttons/create_horizontal_scroll_buttons.mjs'

export const create_root_elements = (user_wrapper_el, root_id, resize_cb, options) => {

// create root element
    const the_root_element = document.createElement('div')
    the_root_element.id = root_id
    the_root_element.className = ROOT_ELEMENT_CLASS_NAME
    set_element_style(the_root_element, {
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        width: '100%',
    })

    const matches_scroller = document.createElement('div')
    matches_scroller.className = 'matches-scroller'
    set_element_style(matches_scroller, {
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingRight: '100px' // to hide scrollbar
    })

    
    const matches_scrollable_area = document.createElement('div')
    matches_scrollable_area.className = 'matches-scrollable-area'
    set_element_style(matches_scrollable_area, {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        width: 'max-content'
    })
    matches_scroller.append(matches_scrollable_area)

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.className = ROUND_TITLES_CANVAS_CLASS_NAME
    set_element_style(round_titles_canvas_el, {
        border: 'none',
        display: 'none',
    })

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = MAIN_CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'

    const rounds_elements_wrapper = document.createElement('div')
    rounds_elements_wrapper.className = 'rounds-elements-wrapper'
    set_element_style(rounds_elements_wrapper, {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    })

    matches_scrollable_area.append(rounds_elements_wrapper, main_canvas_el)


// set resizer
    let resizer_is_pristine = true // prevent initial call because it causes unnecessary and unsafe full redraw
    new ResizeObserver(
        debounce(() => {
            if (resizer_is_pristine) {
                resizer_is_pristine = false
                return
            }
            resize_cb()
        })
    ).observe(user_wrapper_el)

    const hor_buttons = create_horizontal_scroll_buttons(root_id, options)
    
    the_root_element.append(
        round_titles_canvas_el,
        matches_scroller,
        hor_buttons.left_button.wrapper, hor_buttons.right_button.wrapper
    )

    user_wrapper_el.append(the_root_element)

    return {
        the_root_element,
        round_titles_canvas_el,
        
        matches_scroller, // it 1) takes all height available for matches and 2) has overflow-y: scroll
        matches_scrollable_area, // it 1) takes the height of underlying canvas and 2) is being scrolled by matches_scroller
        main_canvas_el, // it 1) attains the height of all drawable matches and 2) is used to draw lines
        rounds_elements_wrapper, // it 1) is positioned absolutely to be displayd behind the main_canvas
        
        hor_buttons,
        // vert_buttons: null,
    }
}