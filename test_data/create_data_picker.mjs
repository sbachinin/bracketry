import { datas, INITIAL_TEST_DATA_INDEX } from './get_some_data.mjs'
import { create_element_from_Html } from '../lib/utils/utils.mjs'

const icons = {
    empty: '<div style="font-size: 36px; line-height: 24px; margin-top: -4px;" >&#128453;</div>',
    tennis: '<img width=24 height=24 src="/pages/tennis-ball.jpg" />',
}

const create_data_button = (data, cb) => {
    const button = create_element_from_Html(`
        <div class="data-picker-button ${datas.indexOf(data) === INITIAL_TEST_DATA_INDEX ? 'selected' : ''}">
            ${icons[data.type]}
            <div class="data-picker-button-tooltip">${data.title}</div>
        </div>
    `)
    button.addEventListener('click', () => {
        ([...button.parentElement.children]).forEach(c => c.classList.remove('selected'))
        button.classList.add('selected')
        data.resolver().then(cb)
    })

    let should_show_tooltip = false
    button.addEventListener('mousemove', () => {
        should_show_tooltip = true
        setTimeout(() => {
            should_show_tooltip && button.querySelector('.data-picker-button-tooltip').classList.add('visible')
        }, 100)
    })
    button.addEventListener('mouseleave', () => {
        should_show_tooltip = false
        button.querySelector('.data-picker-button-tooltip').classList.remove('visible')
    })
    return button
}

export const create_data_picker = (el, cb) => {
    el.append(
        ...datas.map(d => create_data_button(d, cb))
    )
}