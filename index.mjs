import { createBrackets } from './lib/lib.mjs'
import { create_options_sidebar } from './options-inputs/options-inputs.mjs'
import { sidebar_expand_button } from './options-inputs/elements.mjs'
import { get_some_data } from './test_data/get_some_data.mjs'
// import { create_external_buttons } from './external_hor_buttons_example.mjs'

const some_test_options = {
    // onMatchClick: (match, round) => {
    //     location.href = `/matches/${match.id}`
    // },
    // onMatchSideClick: (contestant, contestant_id, match, round) => {
    //     location.href = `/teams/${contestant_id}`
    // }
}

const user_container = document.getElementById('user-container')

get_some_data().then(data => {
    const { applyNewOptions, scrollLeft, scrollRight, getScrollState } = createBrackets(
        data,
        user_container,
        some_test_options
    )
    


    const options_sidebar = create_options_sidebar(applyNewOptions, data, some_test_options)
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
