import { createBracket } from '../dist/esm/index.js'
import data from './finished-singles-2021.js'

let isnumstring = val => /^\d+$/.test(val)

function getUrlQuery() {
    const entries = {}
    const query = window.location.search.substring(1)
    const vars = query.split("&").filter(s => s.length)
    for (let i = 0; i < vars.length; i++) {
        let [name, value] = vars[i].split("=")
        value = decodeURIComponent(value)
        if (isnumstring(value)) {
            value = +value
        }
        if (value === 'true') {
            value = true
        }
        if (value === 'false') {
            value = false
        }
        entries[name] = value
    }
    return entries
}

window.bracket = createBracket(
    data,
    document.querySelector('.pl-wr'),
    getUrlQuery()
)
