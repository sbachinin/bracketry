import { debounce } from '../utils/utils.mjs'
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
    the_root_element.style.overflow = 'hidden'
    the_root_element.style.position = 'relative'
    the_root_element.style.userSelect = 'none'
    the_root_element.style.width = '100%'

    const matches_scroller = document.createElement('div')
    matches_scroller.className = 'matches-scroller'
    matches_scroller.style.width = '100%'
    matches_scroller.style.overflowY = 'scroll'
    matches_scroller.style.overflowX = 'hidden'
    matches_scroller.style.paddingRight = '100px' // to hide scrollbar

    
    const matches_scrollable_area = document.createElement('div')
    matches_scrollable_area.className = 'matches-scrollable-area'
    matches_scrollable_area.style.position = 'relative'
    matches_scrollable_area.style.display = 'inline-flex' // just to make it expand to the full width of child canvas
    matches_scrollable_area.style.marginLeft = 0
    matches_scroller.append(matches_scrollable_area)

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.className = ROUND_TITLES_CANVAS_CLASS_NAME
    round_titles_canvas_el.style.border = 'none'
    round_titles_canvas_el.style.display = 'none'
    round_titles_canvas_el.style.marginLeft = 0

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = MAIN_CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'

    const match_bodies_positioner = document.createElement('div')
    match_bodies_positioner.className = 'match-bodies-positioner'
    match_bodies_positioner.style.position = 'absolute'
    match_bodies_positioner.style.display = 'flex'
    match_bodies_positioner.style.top = 0
    match_bodies_positioner.style.left = 0
    match_bodies_positioner.style.width = '100%'
    match_bodies_positioner.style.height = '100%'

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