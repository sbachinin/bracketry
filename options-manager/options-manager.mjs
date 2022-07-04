import { OPTIONS } from '../lib/options/options_meta.mjs'
import { get_default_options } from '../lib/options/options_meta_getter.mjs'
import { get_option_input } from './get-option-input.mjs'
import * as elements from './elements.mjs'
import { get_options_group_heading } from './get_options_group_heading.mjs'
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

const create_inputs = (user_options_to_values, sidebar_el, apply_new_options) => {
    sidebar_el.innerHTML = ''

    const options_to_values = { ...get_default_options(), ...user_options_to_values}

    const onchange = throttle_with_trailing((option_name, option_value) => {
        Object.assign(
            options_to_values,
            { [option_name]: option_value },
        )

        update_user_options_text(options_to_values)
        update_inputs(options_to_values)
        apply_new_options({ [option_name]: option_value })
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
    
}

export const add_options_manager = (
    opener_el,
    apply_new_options,
    user_options_to_values
) => {
    const sidebar_el = elements.inputs_root_wrapper()

    create_inputs(
        user_options_to_values,
        sidebar_el,
        apply_new_options
    )

    sidebar_el.prepend(elements.sidebar_close_button())

    document.body.prepend(sidebar_el)

    opener_el.addEventListener('click', () => {
        sidebar_el.style.right = parseInt(getComputedStyle(sidebar_el).right) === 0 ? '-1000px' : '0px'
    })

    elements.create_tooltip()

    return sidebar_el
}
