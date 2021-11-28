import { drawBrackets } from './lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'

fetch()
.then(prepareMockData)
.then(data => drawBrackets(
    data,
    document.getElementById('canvas-container')
))
