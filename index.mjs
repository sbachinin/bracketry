import { createBrackets } from './lib/lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'
import { get_options_inputs } from './options-inputs/options-inputs.mjs'

const some_test_options = {   
    // backgroundColor: '#8fd6b8',
    horizontal_scroll_triggered_by: 'mousemove', // 'buttons' | 'mousemove'
    // horizontal_scroll_buttons_position: 'top', // 'top' | 'middle' | 'bottom' | { left: ..., top: ..., right: ..., bottom: ...}
    // horizontal_scroll_buttons_size: 100,
    // horizontal_scroll_buttons_icon_right: `<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="12"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg>`,
    // horizontal_scroll_buttons_color: 'red'
    // connection_lines_type: 'bended-2', // 'curve' | 'diagonal' | 'bended-1' | 'bended-2'
    // background_color: '#fbffc7'
    auto_canvas_height: true
}

const renderAll = options => {
    const canvas_container = document.getElementById('canvas-container')
    canvas_container.innerHTML = ''

    fetch()
    .then(prepareMockData)
    .then(data => createBrackets(
        data,
        canvas_container,
        options
    ))
}

document.body.prepend(get_options_inputs(renderAll, some_test_options))

renderAll(some_test_options)