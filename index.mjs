import { createBrackets } from './lib/lib.mjs'
import { create_options_sidebar } from './options-inputs/options-inputs.mjs'
import { sidebar_expand_button } from './options-inputs/elements.mjs'
import { get_some_data } from './get_some_data.mjs'
// import { create_element_from_Html } from './lib/utils/utils.mjs'


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
    horizontal_scroll_buttons_position: "In the gutters",
    horizontal_scroll_buttons_clickable_width: 35,
    horizontal_scroll_icon_size: 100,
    // highlight_team_history_on_click: false,
    connection_lines_type: 'bended-2',
    match_hor_margin: 10,
    show_winner_mark: true
}

const canvas_container = document.getElementById('canvas-container')

get_some_data().then(data => {
    const { full_update, scroll_left, scroll_right } = createBrackets(
        data,
        canvas_container,
        some_test_options
    )
    


    const options_sidebar = create_options_sidebar(full_update, data, some_test_options)
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

// example of using scroll_left and scroll_right
/* 
    const left_button = create_element_from_Html(`<div style="font-size: 100px">&#x3c;</div>`)
    const right_button = create_element_from_Html(`<div style="font-size: 100px">&#x3e;</div>`)
    left_button.addEventListener('mouseup', scroll_left)
    right_button.addEventListener('mouseup', scroll_right)
    document.body.insertBefore(left_button, canvas_container)
    document.body.insertBefore(right_button, canvas_container)
 */
})
