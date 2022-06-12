import { createBrackets } from './lib/lib.mjs'
import { create_options_sidebar } from './options-inputs/options-inputs.mjs'
import { sidebar_expand_button } from './options-inputs/elements.mjs'
import { get_some_data } from './test_data/get_some_data.mjs'
// import { create_external_buttons } from './external_hor_buttons_example.mjs'
import { start_mock_matches_updates } from './start_mock_matches_updates.mjs'
import { start_mock_full_data_updates } from './mock_full_data_updates.mjs'
import { BUTTONS_POSITIONS } from './lib/constants.mjs'

const some_test_options = {
    horizontal_scroll_buttons_position: BUTTONS_POSITIONS.gutters,
    // onMatchClick: (match) => {
    //     location.href = `/matches/${match.match_id}`
    // },
    // onMatchSideClick: (contestant, contestant_id, match) => {
    //     location.href = `/teams/${contestant_id}`
    // }
    use_mobile_layout: true
}

const user_container = document.getElementById('user-container')

get_some_data().then(data => {
    const { applyNewOptions, applyFullDataUpdate, applyMatchUpdates } = createBrackets(
        data,
        user_container,
        some_test_options
    )
    


    const options_sidebar = create_options_sidebar(applyNewOptions, data, some_test_options)
    document.body.prepend(options_sidebar)
    const sidebar_button = sidebar_expand_button()
    document.body.prepend(sidebar_button)
    sidebar_button.addEventListener('mouseenter', () => {
        options_sidebar.style.left = '0'
    })

    // create_external_buttons(getScrollState, scrollLeft, scrollRight)



    start_mock_matches_updates(applyMatchUpdates)

    start_mock_full_data_updates(applyFullDataUpdate)
})



