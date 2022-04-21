export const try_change_other_options = (option_name, option_value) => {
    if (option_name === 'horizontal_scroll_buttons_position' && option_value === 'In the gutters') {
        return {
            horizontal_scroll_buttons_alignment: 'middle'
        }
    }

    if (option_name === 'vertical_scroll_buttons_position' && option_value === 'In the gutters') {
        return {
            vertical_scroll_buttons_alignment: 'center'
        }
    }
}

export const get_reconciled_options = options => {
    const reconciled_options = Object.assign({}, options)
    Object.entries(options).forEach(([option_name, option_value]) => {
        Object.assign(
            reconciled_options,
            try_change_other_options(option_name, option_value)
        )
    })
    return reconciled_options
}