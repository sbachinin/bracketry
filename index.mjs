import { createBrackets } from './lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'

fetch()
.then(prepareMockData)
.then(data => createBrackets(
    data,
    document.getElementById('canvas-container'),
    {   
        backgroundColor: '#8fd6b8',
        horizontal_scroll_triggered_by: 'buttons', // 'buttons' | 'mousemove'
        horizontal_scroll_buttons_position: 'middle', // 'top' | 'middle' | 'bottom' | { left: ..., top: ..., right: ..., bottom: ...}
    }
))
