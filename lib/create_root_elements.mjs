import { get_total_rounds_height, get_round_title_height } from './utils/sizes.mjs'
import { debounce } from './utils/utils.mjs'
import { CANVAS_CLASS_NAME } from './constants.mjs'

export const create_root_elements = (root_id, update_all) => {

// create root element
    const root_brackets_el = document.createElement('div')
    root_brackets_el.className = root_id + ' root_brackets_el'
    root_brackets_el.style.overflow = 'hidden'
    root_brackets_el.style.width = '100%'
    root_brackets_el.style.position = 'relative'
    root_brackets_el.style.userSelect = 'none'

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.style.border = 'none'
    root_brackets_el.append(round_titles_canvas_el)

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'
    root_brackets_el.append(main_canvas_el)

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

        main_canvas_el.width = root_brackets_el.clientWidth
        main_canvas_el.height = root_brackets_el.clientHeight - get_round_title_height(options)
        if (options.auto_canvas_height) {
            main_canvas_el.height = get_total_rounds_height(options, longest_round_match_count)
        }
        if (options.horizontal_scroll_triggered_by === 'drag' || options.vertical_scroll_triggered_by === 'drag') {
            main_canvas_el.style.cursor = 'grab'
        }
        main_canvas_el.style.backgroundColor = options.background_color
        
        round_titles_canvas_el.width = root_brackets_el.clientWidth
        round_titles_canvas_el.height = get_round_title_height(options)
        round_titles_canvas_el.style.backgroundColor = options.background_color
    }


    return {
        root_brackets_el,
        main_canvas_el,
        round_titles_canvas_el,
        update_root_elements
    }
}