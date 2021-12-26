// nice to add options:
// horizontal_scroll_buttons_horizontal_margin
// horizontal_scroll_buttons_vertical_margin

export const OPTIONS = {
    background_color: {
        title: 'Canvas backgound color',
        type: 'string',
        default_value: '#ffffff'
    },
    horizontal_scroll_triggered_by: {
        title: 'Bracket scrolled horizontally by',
        type: 'select',
        options: [ 'buttons', 'mousemove' ],
        default_value: 'buttons'
    },
    horizontal_scroll_buttons_position: {
        title: 'Horizontal scroll buttons positioned at',
        type: 'select',
        options: [ 'top', 'middle', 'bottom' ],
        default_value: 'top'
    },
    horizontal_scroll_buttons_size: {
        title: 'Horizontal scroll buttons size',
        type: 'number',
        default_value: 50
    },
    horizontal_scroll_buttons_color: {
        title: 'Horizontal scroll buttons color',
        type: 'string',
        default_value:'#161616'
    },
    horizontal_scroll_buttons_hor_padding: {
        title: 'Horizontal scroll buttons horizontal padding',
        type: 'number',
        default_value: 29
    },
    horizontal_scroll_buttons_vert_padding: {
        title: 'Horizontal scroll buttons vertical padding',
        type: 'number',
        default_value: 29
    },
    horizontal_scroll_buttons_icon_left: {
        title: 'Icon for left horizontal scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <div class="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </div>
        `
    },
    horizontal_scroll_buttons_icon_right: {
        title: 'Icon for right horizontal scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <div class="button-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
        `
    },
    always_show_horizontal_scroll_buttons: {
        title: 'Always show horizontal scroll buttons (otherwise only when canvas is hovered)',
        type: 'switch',
        default_value: true
    },
    connection_lines_type: {
        title: 'Connection lines type',
        type: 'select',
        options: [ 'curve', 'diagonal', 'bended-1', 'bended-2' ],
        default_value: 'bended-2'
    },
    connection_lines_width: {
        title: 'Connection lines width',
        type: 'number',
        default_value: 1
    },
    connection_lines_color: {
        title: 'Connection lines color',
        type: 'string',
        default_value: '#bbbbbb'
    },


    score_size: {
        title: 'Score font size',
        type: 'number',
        default_value: 18
    },
    score_bg: {
        title: 'Score background color',
        type: 'string',
        default_value: '#000'
    },
    score_text_color: {
        title: 'Score text color',
        type: 'string',
        default_value: '#fff'
    },
    score_font_family: {
        title: 'Score font-family',
        type: 'string',
        default_value: 'monospace'
    },
    score_hor_padding: {
        title: 'Score horizontal padding',
        type: 'number',
        default_value: 5
    },
    score_vert_padding: {
        title: 'Score vertical padding',
        type: 'number',
        default_value: 3
    },



}

export const get_default_options = () => {
    const default_options = {}
    Object.entries(OPTIONS).forEach(([option_name, { default_value }]) => {
        default_options[option_name] = default_value
    })
    return default_options
}