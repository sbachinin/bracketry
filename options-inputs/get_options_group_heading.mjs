import * as elements from './elements.mjs'

export const get_options_group_heading = (options_type_name, update_inputs, names_of_expanded_groups) => {
    const text = options_type_name
        .split('_')
        .filter(word => word !== 'OPTIONS')
        .map(word => word[0].toUpperCase() + word.slice(-word.length + 1).toLowerCase())
        .join(' ')
    
    const el = elements.options_group_heading(text,
        options_type_name,
        names_of_expanded_groups)

    el.addEventListener('click', e => {
        const index = names_of_expanded_groups.indexOf(options_type_name)
        if (index > -1) {
            names_of_expanded_groups.splice(index, 1);
        } else {
            names_of_expanded_groups.push(options_type_name)
        }
        update_inputs()
    })

    return el
}