import { datas, INITIAL_TEST_DATA_INDEX } from './get_some_data.mjs'
import { create_element_from_Html, get_root_folder, user_agent_is_mobile } from '../lib/utils/utils.mjs'

const icons = {
    empty: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z"/></svg>',
    tennis: `<img width=24 height=24 src="/${get_root_folder()}pages/tennis-ball.jpg" />`,
}

const create_data_button = (data, cb) => {
    const is_mobile = user_agent_is_mobile()

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
        should_show_tooltip = !is_mobile
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