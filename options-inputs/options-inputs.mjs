import { OPTIONS } from '../lib/options/options_meta.mjs'
import { get_default_options } from '../lib/options/get_default_options.mjs'
import { get_option_input } from './get-option-input.mjs'
import * as elements from './elements.mjs'
import { get_options_group_heading } from './get_options_group_heading.mjs'
import { switchStyle } from './switch-style.mjs'
import { throttle_with_trailing } from '../lib/utils/utils.mjs'
import { create_user_options_text } from './user_options_text.mjs'

const names_of_expanded_groups = []
const all_inputs = []

const update_inputs = (options_to_values) => {
    Object.keys(OPTIONS).forEach(options_type_name => {
        document.querySelector(`.${options_type_name}-arrow`).style.transform = (
            names_of_expanded_groups.includes(options_type_name) ? 'rotate(180deg)' : 'none'
        )
        document.querySelector(`.${options_type_name}`).style.height = (
            names_of_expanded_groups.includes(options_type_name) ? 'auto' : 0
        )
    })
    all_inputs.forEach(i => i.update(options_to_values))
}

const render_inputs = (data, user_options_to_values, sidebar_el, apply_new_options) => {
    sidebar_el.innerHTML = ''

    const options_to_values = { ...get_default_options(), ...user_options_to_values}

    const onchange = throttle_with_trailing((option_name, option_value) => {
        Object.assign(
            options_to_values,
            { [option_name]: option_value },
        )

        update_user_options_text(options_to_values)
        update_inputs(options_to_values)
        apply_new_options(options_to_values)
    }, 300)

    const get_inputs_of_type = (options, options_type_name) => {
        const group_inputs = Object.entries(options)
            .map(([option_name, option_info]) => {
                const input = get_option_input(
                    option_name,
                    option_info,
                    options_to_values[option_name],
                    onchange
                )
                all_inputs.push(input)
                return input.el
            })

        const group_wrapper_el = elements.grouped_inputs_wrapper(options_type_name, names_of_expanded_groups)
        group_wrapper_el.append(...group_inputs)
        return group_wrapper_el
    }

    Object.entries(OPTIONS)
        .forEach(([options_type_name, options_of_type]) => {
            sidebar_el.append(
                get_options_group_heading(
                    options_type_name,
                    () => update_inputs(options_to_values),
                    names_of_expanded_groups
                ),
                get_inputs_of_type(options_of_type, options_type_name)
            )
        })

    
    const {
        user_options_text_el, update_user_options_text
    } = create_user_options_text(user_options_to_values)
    sidebar_el.append(user_options_text_el)
    
/* 
    sidebar_el.append(get_options_group_heading(
        'DATA_TEXTAREA',
        () => render_inputs(data, options_to_values, sidebar_el, update_brackets),
        names_of_expanded_groups
    ))

    if (names_of_expanded_groups.includes('DATA_TEXTAREA')) {
        const data_textarea = create_element_from_Html(`
            <textarea disabled style="width: 100%; height: 1000px;">${JSON.stringify(data, null, 2)}</textarea>
        `)
        data_textarea.addEventListener('input', e => {
            update_brackets(JSON.parse(e.target.value), options_to_values)
        })
        sidebar_el.append(data_textarea)
    } */
}

export const create_options_sidebar = (
    apply_new_options,
    data,
    user_options_to_values
) => {
    const sidebar_el = elements.inputs_root_wrapper()


    render_inputs(
        data,
        user_options_to_values,
        sidebar_el,
        apply_new_options
    )
    document.head.insertAdjacentHTML('beforeend', `<style>${switchStyle}</style>`)

    document.body.prepend(sidebar_el)
    const sidebar_button = elements.sidebar_expand_button()
    document.body.prepend(sidebar_button)
    sidebar_button.addEventListener('mouseenter', () => {
        sidebar_el.style.left = '0'
    })

    return sidebar_el
}
