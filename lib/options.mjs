// nice to add options:
// horizontal_scroll_buttons_horizontal_margin
// horizontal_scroll_buttons_vertical_margin

const GENERAL_OPTIONS = {
    background_color: {
        title: 'Canvas backgound color',
        type: 'string',
        default_value: '#ffffff'
    },

    padding_top: {
        title: 'Top padding',
        type: 'number',
        default_value: 34
    },

    padding_left: {
        title: 'Left padding',
        type: 'number',
        default_value: 50
    },

    padding_right: {
        title: 'Right padding',
        type: 'number',
        default_value: 70
    },

    distance_between_rounds: {
        title: 'Distance between rounds',
        type: 'number',
        default_value: 74
    },
}

const ROUND_TITLE_OPTIONS = {
    round_width: {
        title: 'Round width',
        type: 'number',
        default_value: 269
    },

    round_title_font_size: {
        title: 'Font size of a round title',
        type: 'number',
        default_value: 30
    },

    round_title_font_family: {
        title: 'Round title font family',
        type: 'string',
        default_value: 'Roboto'
    },

    round_title_color: {
        title: 'Round title color',
        type: 'string',
        default_value: '#000'
    },

    round_title_margin_left: {
        title: 'Round title margin left',
        type: 'number',
        default_value: 8
    },

    round_title_margin_bottom: {
        title: 'Round title margin bottom',
        type: 'number',
        default_value: 34
    }
}

const HORIZONTAL_SCROLL_OPTIONS = {
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
}

const CONNECTION_LINES_OPTIONS = {
    connection_lines_type: {
        title: 'Connection lines type',
        type: 'select',
        options: [ 'curve', 'diagonal', 'bended-1', 'bended-2' ],
        default_value: 'bended-1'
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
}

const MATCH_OPTIONS = {
    vert_gap_between_opponents: {
        title: 'Vertical gap between opponents',
        type: 'number',
        default_value: 7
    },

    match_padding_left: {
        title: 'Match left padding',
        type: 'number',
        default_value: 8
    },

    team_title_font_size: {
        title: 'Team title font size',
        type: 'number',
        default_value: 16
    }
}

const SCORES_OPTIONS = {
    scores_horizontal_position: {
        title: 'Scores horizontal position',
        type: 'number',
        default_value: -6
    },
    score_size: {
        title: 'Score font size',
        type: 'number',
        default_value: 16
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
        default_value: 'roboto'
    },
    score_hor_padding: {
        title: 'Score horizontal padding',
        type: 'number',
        default_value: 3
    },
    score_vert_padding: {
        title: 'Score vertical padding',
        type: 'number',
        default_value: 3
    },
    score_hor_margin: {
        title: 'Score horizontal margin',
        type: 'number',
        default_value: 2
    },
}

export const OPTIONS = {
    ...GENERAL_OPTIONS,

    ...ROUND_TITLE_OPTIONS,

    ...HORIZONTAL_SCROLL_OPTIONS,

    ...CONNECTION_LINES_OPTIONS,

    ...MATCH_OPTIONS,

    ...SCORES_OPTIONS

}
