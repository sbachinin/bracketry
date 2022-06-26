import { createPlayoffs } from './lib/lib.mjs'
import { get_some_data } from './test_data/get_some_data.mjs'
import { start_mock_matches_updates } from './start_mock_matches_updates.mjs'
import { start_mock_full_data_updates } from './mock_full_data_updates.mjs'
import { BUTTONS_POSITIONS } from './lib/constants.mjs'

const some_test_options = {
    nav_buttons_position: BUTTONS_POSITIONS.gutters,
    // onMatchClick: (match) => {
    //     location.href = `/matches/${match.match_id}`
    // },
    // onMatchSideClick: (contestant, contestant_id, match) => {
    //     location.href = `/teams/${contestant_id}`
    // }
}

const user_container = document.getElementById('user-container')

get_some_data().then(data => {
    const { applyNewOptions, applyFullDataUpdate, applyMatchUpdates } = createPlayoffs(
        data,
        user_container,
        some_test_options
    )
    


    document.body.prepend(options_sidebar)



    start_mock_matches_updates(applyMatchUpdates)

    start_mock_full_data_updates(applyFullDataUpdate)
})



