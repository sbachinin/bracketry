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
        horizontalScrollTriggeredBy: 'buttons' // 'buttons' | 'mousemove'
    }
))
