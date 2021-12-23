import { createBrackets } from './lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'

fetch()
.then(prepareMockData)
.then(data => createBrackets(
    data,
    document.getElementById('canvas-container'),
    {   
        // backgroundColor: '#8fd6b8',
        horizontal_scroll_triggered_by: 'mousemove', // 'buttons' | 'mousemove'
        // horizontal_scroll_buttons_position: 'top', // 'top' | 'middle' | 'bottom' | { left: ..., top: ..., right: ..., bottom: ...}
        // horizontal_scroll_buttons_size: 100,
        // horizontal_scroll_buttons_icon_right: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12l-6 3.999v-7.998l6 3.999zm0-3.999v7.998l6-3.999-6-3.999z"/></svg>`,
        // horizontal_scroll_buttons_color: 'red'
        connection_lines_type: 'diagonal' // 'curve' | 'diagonal' | 'rectangular'
    }
))

// nice to add options:
// horizontal_scroll_buttons_horizontal_margin
// horizontal_scroll_buttons_vertical_margin
