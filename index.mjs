import { drawBrackets } from './lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'

const canvas = document.getElementById('canv');

fetch().then(data => drawBrackets(data, canvas))
