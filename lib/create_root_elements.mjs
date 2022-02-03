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
    round_titles_canvas_el.style.display = 'none'
    root_brackets_el.append(round_titles_canvas_el)

// create canvas for highlighted line
    const highlight_canvas_el = document.createElement('canvas')
    highlight_canvas_el.style.border = 'none'
    highlight_canvas_el.style.display = 'none'
    highlight_canvas_el.style.zIndex = 1
    highlight_canvas_el.style.position = 'absolute'
    highlight_canvas_el.style.top = 5000
    highlight_canvas_el.style.left = 0
    highlight_canvas_el.style.pointerEvents = 'none'
    root_brackets_el.append(highlight_canvas_el)

// create canvas for expanded matches
    const expand_canvas_el = document.createElement('canvas')
    expand_canvas_el.style.border = 'none'
    expand_canvas_el.style.display = 'none'
    expand_canvas_el.style.zIndex = 2
    expand_canvas_el.style.position = 'absolute'
    expand_canvas_el.style.top = 5000
    expand_canvas_el.style.left = 0
    expand_canvas_el.style.pointerEvents = 'none'
    root_brackets_el.append(expand_canvas_el)

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
        main_canvas_el.height = root_brackets_el.clientHeight
            - (options.hide_round_titles ? 0 : get_round_title_height(options))

        if (options.auto_canvas_height) {
            main_canvas_el.height = get_total_rounds_height(options, longest_round_match_count)
        }
        main_canvas_el.style.backgroundColor = options.background_color
        
        if (options.hide_round_titles) {
            round_titles_canvas_el.style.display = 'none'
        } else {
            round_titles_canvas_el.width = root_brackets_el.clientWidth
            round_titles_canvas_el.height = get_round_title_height(options)
            round_titles_canvas_el.style.display = 'block'
            round_titles_canvas_el.style.backgroundColor = options.background_color
        }

        if (options.highlight_team_history_on_click) {
            highlight_canvas_el.style.display = 'block'
            highlight_canvas_el.style.top = get_round_title_height(options)
            highlight_canvas_el.width = root_brackets_el.clientWidth
            highlight_canvas_el.height = root_brackets_el.clientHeight
        } else {
            highlight_canvas_el.style.display = 'none'
        }

        if (options.reduce_match_until_clicked || options.reduce_match_until_hovered) {
            expand_canvas_el.style.display = 'block'
            expand_canvas_el.style.top = get_round_title_height(options)
            expand_canvas_el.width = root_brackets_el.clientWidth
            expand_canvas_el.height = root_brackets_el.clientHeight
        } else {
            expand_canvas_el.style.display = 'none'
        }
    }


    return {
        root_brackets_el,
        main_canvas_el,
        round_titles_canvas_el,
        highlight_canvas_el,
        expand_canvas_el,
        update_root_elements
    }
}