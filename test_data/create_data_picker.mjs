import { datas } from './get_some_data.mjs'

const icons = {
    empty: '&#128453;',
    tennis: '<img width=24 height=24 src="/pages/tennis-ball.jpg" />',
}

const create_data_button = (data, cb) => {
    const button = document.createElement('div')
    button.className = 'data-picker-button'
    button.innerHTML = icons[data.type]
    button.addEventListener('click', () => data.resolver().then(cb))
    return button
}

export const create_data_picker = (el, cb) => {
    el.append(
        ...datas.map(d => create_data_button(d, cb))
    )
}