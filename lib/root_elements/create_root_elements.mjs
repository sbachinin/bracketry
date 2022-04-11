import { debounce, set_element_style } from '../utils/utils.mjs'
import {
    MAIN_CANVAS_CLASS_NAME,
    ROUND_TITLES_CANVAS_CLASS_NAME,
    ROOT_ELEMENT_CLASS_NAME,
} from '../constants.mjs'

export const create_root_elements = (user_wrapper_el, root_id, resize_cb) => {

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
        display: 'inline-flex', // just to make it expand to the full width of child canvas
        marginLeft: 0
    })
    matches_scroller.append(matches_scrollable_area)

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.className = ROUND_TITLES_CANVAS_CLASS_NAME
    set_element_style(round_titles_canvas_el, {
        border: 'none',
        display: 'none',
        marginLeft: 0
    })

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = MAIN_CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'

    const match_bodies_positioner = document.createElement('div')
    match_bodies_positioner.className = 'match-bodies-positioner'
    set_element_style(match_bodies_positioner, {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    })

    matches_scrollable_area.append(match_bodies_positioner, main_canvas_el)


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

    the_root_element.append(round_titles_canvas_el, matches_scroller)

    user_wrapper_el.append(the_root_element)

    return {
        the_root_element,
        round_titles_canvas_el,
        
        matches_scroller, // it 1) takes all height available for matches and 2) has overflow-y: scroll
        matches_scrollable_area, // it 1) takes the height of underlying canvas and 2) is being scrolled by matches_scroller
        main_canvas_el, // it 1) attains the height of all drawable matches and 2) is used to draw lines
        match_bodies_positioner, // it 1) is positioned absolutely to be displayd behind the main_canvas
        
        hor_buttons: null,
        // vert_buttons: null,
    }
}