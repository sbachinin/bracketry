// set updater
export const apply_options_to_stable_elements = (stable_elements, options) => {
    const {
        the_root_element,
        round_titles_wrapper,
        matches_scrollable_area,
        left_scroll_button, right_scroll_button
    } = stable_elements

    the_root_element.style.backgroundColor = options.background_color


// apply options to round titles
    if (options.hide_round_titles) {
        round_titles_wrapper.style.display = 'none'
    } else {
        round_titles_wrapper.style.display = 'flex'
        round_titles_wrapper.style.height = options.round_titles_height
        round_titles_wrapper.style.fontSize = options.round_title_font_size + 'px'
        round_titles_wrapper.style.fontFamily = options.round_title_font_family || options.root_font_family
        round_titles_wrapper.style.color = options.round_title_color
        round_titles_wrapper.style.borderBottom = `1px solid ${options.round_titles_border_bottom_color}`
    }
    const rounds_titles = [...round_titles_wrapper.querySelectorAll('.round-title')]
    rounds_titles.forEach(t => {
        t.style.justifyContent = options.round_title_text_align
        t.style.padding = `0 ${options.match_hor_margin * 1.5}px`
    })



    matches_scrollable_area.style.margin = options.main_vertical_padding + 'px 0'

// apply options to hor buttons
    const in_gutters = options.horizontal_scroll_buttons_position === 'In the gutters'
    const buttons_are_hidden = options.horizontal_scroll_buttons_position === 'Hidden'
    
    left_scroll_button.innerHTML = options.left_scroll_button_icon
    left_scroll_button.style.display = buttons_are_hidden ? 'none' : 'flex'
    left_scroll_button.style.position = in_gutters ? 'static' : 'absolute'
    left_scroll_button.style.background = options.left_scroll_button_background
    left_scroll_button.style.borderRight = in_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none'
    left_scroll_button.style.width = options.horizontal_scroll_button_size
    left_scroll_button.style.top = options.scroll_buttons_top_distance
    left_scroll_button.style.transform = in_gutters ? 'none' : 'translate(0, -50%)'
    left_scroll_button.style.minHeight = in_gutters ? '100%' : options.horizontal_scroll_button_size

    right_scroll_button.innerHTML = options.right_scroll_button_icon
    right_scroll_button.style.display = buttons_are_hidden ? 'none' : 'flex'
    right_scroll_button.style.position = in_gutters ? 'static' : 'absolute'
    right_scroll_button.style.background = options.right_scroll_button_background
    right_scroll_button.style.borderLeft = in_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none'
    right_scroll_button.style.width = options.horizontal_scroll_button_size
    right_scroll_button.style.top = options.scroll_buttons_top_distance
    right_scroll_button.style.transform = in_gutters ? 'none' : 'translate(0, -50%)'
    right_scroll_button.style.minHeight = in_gutters ? '100%' : options.horizontal_scroll_button_size

    const left_scroll_svg = left_scroll_button.querySelector('svg')
    const right_scroll_svg = right_scroll_button.querySelector('svg')
    if (left_scroll_svg) {
        left_scroll_svg.style.fill = options.horizontal_scroll_buttons_svg_color
    }
    if (right_scroll_svg) {
        right_scroll_svg.style.fill = options.horizontal_scroll_buttons_svg_color
    }

}
