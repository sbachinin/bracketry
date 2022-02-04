import { get_total_rounds_height, get_round_title_height } from '../utils/sizes.mjs'
import { debounce } from '../utils/utils.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'
import { create_offscreen_canvas } from './offscreen_canvas.mjs'

export const create_root_elements = (root_id, update_all) => {

// create root element
    const wrapper = document.createElement('div')
    wrapper.className = root_id
    wrapper.style.overflow = 'hidden'
    wrapper.style.width = '100%'
    wrapper.style.position = 'relative'
    wrapper.style.userSelect = 'none'

// create canvas for round titles
    const round_titles_canvas_el = document.createElement('canvas')
    round_titles_canvas_el.style.border = 'none'
    round_titles_canvas_el.style.display = 'none'
    wrapper.append(round_titles_canvas_el)

// create canvas for highlighted line
    const highlight_canvas_el = document.createElement('canvas')
    highlight_canvas_el.style.border = 'none'
    highlight_canvas_el.style.display = 'none'
    highlight_canvas_el.style.zIndex = 1
    highlight_canvas_el.style.position = 'absolute'
    highlight_canvas_el.style.top = 5000
    highlight_canvas_el.style.left = 0
    highlight_canvas_el.style.pointerEvents = 'none'
    wrapper.append(highlight_canvas_el)

// create canvas for expanded matches
    const expand_canvas_el = document.createElement('canvas')
    expand_canvas_el.style.border = 'none'
    expand_canvas_el.style.display = 'none'
    expand_canvas_el.style.zIndex = 2
    expand_canvas_el.style.position = 'absolute'
    expand_canvas_el.style.top = 5000
    expand_canvas_el.style.left = 0
    expand_canvas_el.style.pointerEvents = 'none'
    wrapper.append(expand_canvas_el)

// create canvas
    const main_canvas_el = document.createElement('canvas')
    main_canvas_el.className = CANVAS_CLASS_NAME
    main_canvas_el.style.border = 'none'
    main_canvas_el.style.userSelect = 'none'
    wrapper.append(main_canvas_el)

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
    ).observe(wrapper)


// set updater
    const update = (options, longest_round_match_count) => {
        wrapper.style.height = options.auto_canvas_height ? 'auto' : '100%'

        main_canvas_el.width = wrapper.clientWidth
        main_canvas_el.height = wrapper.clientHeight
            - (options.hide_round_titles ? 0 : get_round_title_height(options))

        if (options.auto_canvas_height) {
            main_canvas_el.height = get_total_rounds_height(options, longest_round_match_count)
        }
        main_canvas_el.style.backgroundColor = options.background_color
        
        if (options.hide_round_titles) {
            round_titles_canvas_el.style.display = 'none'
        } else {
            round_titles_canvas_el.width = wrapper.clientWidth
            round_titles_canvas_el.height = get_round_title_height(options)
            round_titles_canvas_el.style.display = 'block'
            round_titles_canvas_el.style.backgroundColor = options.background_color
        }

        if (options.highlight_team_history_on_click) {
            highlight_canvas_el.style.display = 'block'
            highlight_canvas_el.style.top = get_round_title_height(options)
            highlight_canvas_el.width = wrapper.clientWidth
            highlight_canvas_el.height = wrapper.clientHeight
        } else {
            highlight_canvas_el.style.display = 'none'
        }

        if (options.reduce_match_until_clicked || options.reduce_match_until_hovered) {
            expand_canvas_el.style.display = 'block'
            expand_canvas_el.style.top = get_round_title_height(options)
            expand_canvas_el.width = wrapper.clientWidth
            expand_canvas_el.height = wrapper.clientHeight
        } else {
            expand_canvas_el.style.display = 'none'
        }
    }


    return {
        wrapper,
        main_canvas_el,
        round_titles_canvas_el,
        highlight_canvas_el,
        expand_canvas_el,
        update,

        offscreen_canvas: create_offscreen_canvas()
    }
}