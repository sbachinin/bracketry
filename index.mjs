import { createBrackets } from './lib/lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'
import { get_options_inputs } from './options-inputs/options-inputs.mjs'

const some_test_options = {
    // highlight_team_history_on_click: false,
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
        
        document.body.prepend(get_options_inputs(
            update_brackets,
            data,
            some_test_options)
        )
    })
