import { get_total_rounds_height, get_round_title_height } from '../utils/sizes.mjs'

// set updater
const update_root_elements = (elements, options, longest_round_match_count) => {
    const { wrapper, main_canvas_el,
        round_titles_canvas_el, highlight_canvas_el, expand_canvas_el } = elements
    
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

        highlight_canvas_el.style.top = get_round_title_height(options)
        highlight_canvas_el.width = wrapper.clientWidth
        highlight_canvas_el.height = wrapper.clientHeight

        expand_canvas_el.style.top = get_round_title_height(options)
        expand_canvas_el.width = wrapper.clientWidth
        expand_canvas_el.height = wrapper.clientHeight
}

export const create_updater = (elements) => {
    return (options, longest_round_match_count) => {
        update_root_elements(elements, options, longest_round_match_count)
    }
}