import { debounce } from '../utils/utils.mjs'
import { MAIN_CANVAS_CLASS_NAME,
    HIGHLIGHT_CANVAS_CLASS_NAME,
    ROUND_TITLES_CANVAS_CLASS_NAME,
    ROOT_ELEMENT_CLASS_NAME } from '../constants.mjs'
import { create_offscreen_canvas } from './offscreen_canvas.mjs'

export const create_root_elements = (root_id, resize_cb) => {

// create root element
    const wrapper = document.createElement('div')
    wrapper.id = root_id
    wrapper.className = ROOT_ELEMENT_CLASS_NAME
    wrapper.style.overflow = 'hidden'
    wrapper.style.width = '100%'
    wrapper.style.position = 'relative'
    wrapper.style.userSelect = 'none'

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.className = ROUND_TITLES_CANVAS_CLASS_NAME
    round_titles_canvas_el.style.border = 'none'
    round_titles_canvas_el.style.display = 'none'

// create canvas for highlight-related stuff
    const highlight_canvas_el = document.createElement('canvas')
    highlight_canvas_el.className = HIGHLIGHT_CANVAS_CLASS_NAME
    highlight_canvas_el.style.border = 'none'
    highlight_canvas_el.style.zIndex = 1
    highlight_canvas_el.style.position = 'absolute'
    highlight_canvas_el.style.left = 0
    highlight_canvas_el.style.pointerEvents = 'none'

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = MAIN_CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'

// set resizer
    let resizer_is_pristine = true
    new ResizeObserver(
        debounce(() => {
            if (resizer_is_pristine) {
                resizer_is_pristine = false
                return
            }
            resize_cb()
        })
    ).observe(wrapper)


    wrapper.append(round_titles_canvas_el, main_canvas_el, highlight_canvas_el)

    return {
        wrapper,
        main_canvas_el,
        round_titles_canvas_el,
        highlight_canvas_el,
        hor_buttons: null,
        vert_buttons: null,
        offscreen_canvas: create_offscreen_canvas()
    }
}