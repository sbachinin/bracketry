import { debounce } from '../utils/utils.mjs'
import {
    MAIN_CANVAS_CLASS_NAME,
    HIGHLIGHT_CANVAS_CLASS_NAME,
    ROUND_TITLES_CANVAS_CLASS_NAME,
    ROOT_ELEMENT_CLASS_NAME,
} from '../constants.mjs'
import { create_offscreen_canvas } from './offscreen_canvas.mjs'

export const create_root_elements = (user_wrapper_el, root_id, resize_cb) => {

// create root element
    const the_root_element = document.createElement('div')
    the_root_element.id = root_id
    the_root_element.className = ROOT_ELEMENT_CLASS_NAME
    the_root_element.style.overflow = 'hidden'
    the_root_element.style.position = 'relative'
    the_root_element.style.userSelect = 'none'
    the_root_element.style.width = '100%'


    const main_canvas_wrapper = document.createElement('div')
    main_canvas_wrapper.className = 'main-canvas-wrapper'
    main_canvas_wrapper.style.width = '100%'
    main_canvas_wrapper.style.boxSizing = 'border-box'
    main_canvas_wrapper.style.overflowY = 'scroll'
    main_canvas_wrapper.style.overflowX = 'hidden'


// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.className = ROUND_TITLES_CANVAS_CLASS_NAME
    round_titles_canvas_el.style.border = 'none'
    round_titles_canvas_el.style.display = 'none'

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = MAIN_CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'

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


    main_canvas_wrapper.append(main_canvas_el)
    the_root_element.append(round_titles_canvas_el, main_canvas_wrapper)

    user_wrapper_el.append(the_root_element)

    return {
        the_root_element,
        main_canvas_wrapper,
        main_canvas_el,
        round_titles_canvas_el,
        hor_buttons: null,
        vert_buttons: null,
        offscreen_canvas: create_offscreen_canvas()
    }
}