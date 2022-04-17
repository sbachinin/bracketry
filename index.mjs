import { createBrackets } from './lib/lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'
import { create_options_sidebar } from './options-inputs/options-inputs.mjs'
import { sidebar_expand_button } from './options-inputs/elements.mjs'

const some_test_options = {
    /* get_flag_image_source: nationality_code => {
        return new Promise(resolve => {
            let img = new Image
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality_code}.svg`
        })
    } */
    horizontal_scroll_duration: 3000,
    main_vertical_padding: 20,
    use_classical_layout: true,
    round_titles_padding_top: 25,
    round_title_font_size: 27,
    round_title_margin_bottom: 10,
    horizontal_scroll_buttons_position: "In the gutters",
    horizontal_scroll_buttons_clickable_width: 35,
    vertical_scroll_buttons_position: "In the gutters",
    vertical_scroll_buttons_clickable_height: 35,
    scroll_gutter_background_color: "rgba(0,0,0,.02)",
    scroll_gutter_border_color: "rgba(0,0,0,.04)",
    connection_lines_type: 'bended-2',
    match_hor_margin: 10,
}

const canvas_container = document.getElementById('canvas-container')

fetch()
    .then(prepareMockData)
    .then(data => {
        const update_brackets = createBrackets(
            data,
            canvas_container,
            some_test_options
        )
        


        const options_sidebar = create_options_sidebar(update_brackets, data, some_test_options)
        document.body.prepend(options_sidebar)
        const sidebar_button = sidebar_expand_button()
        document.body.append(sidebar_button)
        sidebar_button.addEventListener('click', () => {
            if (parseInt(options_sidebar.style.width) === 0) {
                options_sidebar.style.width = '400px'
            } else {
                options_sidebar.style.width = '0'
            }
        })
    })
