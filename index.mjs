import { drawBrackets } from './lib.mjs'

const mockFetch = () => Promise.resolve([1, 2, 3])

const canvas = document.getElementById('canvas');

mockFetch('some-data').then(data => drawBrackets(data, canvas))
