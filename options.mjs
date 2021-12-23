export const OPTIONS = {
    backgroundColor: {
        type: 'string',
        default_value: '#ffffff'
    },
    horizontal_scroll_triggered_by: {
        type: 'select',
        options: [ 'buttons', 'mousemove' ],
        default_value: 'buttons'
    },
    horizontal_scroll_buttons_position: {
        type: 'select',
        options: [ 'top', 'middle', 'bottom' ],
        default_value: 'top'
    },
    horizontal_scroll_buttons_size: {
        type: 'number',
        default_value: 32
    },
    horizontal_scroll_buttons_color: {
        type: 'string',
        default_value:'#161616'
    },
    horizontal_scroll_buttons_icon_left: {
        type: 'string',
        default_value: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>'
    },
    horizontal_scroll_buttons_icon_right: {
        type: 'string',
        default_value: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
    },
    connection_lines_type: {
        type: 'select',
        options: [ 'curve', 'diagonal', 'bended-1', 'bended-2' ],
        default_value: 'bended-2'
    }
}

export const get_default_options = () => {
    const default_options = {}
    Object.entries(OPTIONS).forEach(([option_name, { default_value }]) => {
        default_options[option_name] = default_value
    })
    return default_options
}