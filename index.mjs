import { drawBrackets } from './lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'

fetch()
.then(data => drawBrackets(
    data,
    document.getElementById('canvas-container')
))
