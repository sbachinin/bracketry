import { createBrackets } from './lib/lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'
import { get_options_inputs } from './options-inputs/options-inputs.mjs'

const some_test_options = {   
    // backgroundColor: '#8fd6b8',
    // horizontal_scroll_triggered_by: 'drag', // 'buttons' | 'mousemove' | 'drag'
    // horizontal_scroll_buttons_position: 'middle', // 'top' | 'middle' | 'bottom' | { left: ..., top: ..., right: ..., bottom: ...}
    // reduce_match_until_clicked: true,
    // team_title_max_width: 100,
    // horizontal_scroll_buttons_size: 100,
    /* horizontal_scroll_buttons_icon_right: `
        <div style="padding: 100px">
            <svg style="fill: red" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="12"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg>
        </div>
    `, */
    // horizontal_scroll_buttons_color: 'red'
    connection_lines_type: 'curve', // 'curve' | 'diagonal' | 'bended-1' | 'bended-2'
    distance_between_rounds: 90,
    connection_lines_width: 2,
    connection_lines_color: '#ccc',
    // background_color: '#fbffc7'
    // auto_canvas_height: true
    // seed_width :300
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
