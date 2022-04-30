import { createBrackets } from './lib/lib.mjs'
import { create_options_sidebar } from './options-inputs/options-inputs.mjs'
import { sidebar_expand_button } from './options-inputs/elements.mjs'
import { get_some_data } from './test_data/get_some_data.mjs'
// import { create_external_buttons } from './external_hor_buttons_example.mjs'

const some_test_options = {
    /* get_flag_image_source: nationality_code => {
        return new Promise(resolve => {
            let img = new Image
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality_code}.svg`
        })
    } */
    main_vertical_padding: 20,
    connection_lines_type: 'bended-2',
    match_hor_margin: 10,
    show_winner_mark: true,
    min_vertical_distance_btw_matches: 100
    // horizontal_scroll_buttons_position: 'Hidden'
}

const canvas_container = document.getElementById('canvas-container')

get_some_data().then(data => {
    const { runFullUpdate, scrollLeft, scrollRight, getScrollState } = createBrackets(
        data,
        canvas_container,
        some_test_options
    )
    


    const options_sidebar = create_options_sidebar(runFullUpdate, data, some_test_options)
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

    // create_external_buttons(getScrollState, scrollLeft, scrollRight)
})
