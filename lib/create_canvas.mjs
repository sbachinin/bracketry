import { get_total_content_height } from './utils/sizes.mjs'
import { CANVAS_CLASS_NAME } from './constants.mjs'

export const create_canvas = (root_brackets_el) => {
    // create canvas to fill a given element
    const canvas_el = document.createElement('canvas')
    canvas_el.className = CANVAS_CLASS_NAME
    
    canvas_el.style.border = 'none'

    root_brackets_el.append(canvas_el)

    const update_canvas = (options, longest_round_match_count) => {
        canvas_el.width = root_brackets_el.clientWidth
        canvas_el.height = root_brackets_el.clientHeight
        if (options.auto_canvas_height) {
            canvas_el.height = get_total_content_height(options, longest_round_match_count)
        }
        canvas_el.style.backgroundColor = options.background_color
    }

    return {
        canvas_el,
        update_canvas
    }
}
