import { createBrackets } from './lib/lib.mjs'
import { mockFetchData as fetch } from './mockFetchData.mjs'
import { prepareMockData } from './prepareMockData.mjs'
import { get_options_inputs } from './options-inputs/options-inputs.mjs'

const some_test_options = {
    /* get_flag_image_source: nationality_code => {
        return new Promise(resolve => {
            let img = new Image
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality_code}.svg`
        })
    } */
}

const canvas_container = document.getElementById('canvas-container')

fetch()
    .then(prepareMockData)
    .then(data => {
        console.log(data)
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
