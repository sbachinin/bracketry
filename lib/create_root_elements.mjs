import { get_total_content_height } from './utils/sizes.mjs'
import { debounce } from './utils/utils.mjs'
import { CANVAS_CLASS_NAME } from './constants.mjs'

export const create_root_elements = (root_id, update_all) => {

// create root element
    const root_brackets_el = document.createElement('div')
    root_brackets_el.className = root_id + ' root_brackets_el'
    root_brackets_el.style.overflow = 'hidden'
    root_brackets_el.style.width = '100%'
    root_brackets_el.style.position = 'relative'
    root_brackets_el.style.resize = 'both'


// create canvas
    const canvas_el = document.createElement('canvas')
    canvas_el.className = CANVAS_CLASS_NAME
    canvas_el.style.border = 'none'
    root_brackets_el.append(canvas_el)

    let resizer_is_pristine = true

// set resizer
    new ResizeObserver(
        debounce(() => {
            if (resizer_is_pristine) {
                resizer_is_pristine = false
                return
            }
            update_all()
        })
    ).observe(root_brackets_el)


// set updater
    const update_root_elements = (options, longest_round_match_count) => {
        root_brackets_el.style.height = options.auto_canvas_height ? 'auto' : '100%'

        canvas_el.width = root_brackets_el.clientWidth
        canvas_el.height = root_brackets_el.clientHeight
        if (options.auto_canvas_height) {
            canvas_el.height = get_total_content_height(options, longest_round_match_count)
        }
        canvas_el.style.backgroundColor = options.background_color
    }


    return {
        root_brackets_el,
        canvas_el,
        update_root_elements
    }
}