const GENERAL_OPTIONS = {
    background_color: {
        title: 'Canvas backgound color',
        type: 'string',
        default_value: '#ffffff'
    },

    padding_left: {
        title: 'Left padding (before first round)',
        type: 'number',
        default_value: 50
    },
    
    padding_right: {
        title: 'Right padding (after last round)',
        type: 'number',
        default_value: 70
    },
    
    matches_padding_top: {
        title: 'Top padding (before first match)',
        type: 'number',
        default_value: 0
    },

    matches_padding_bottom: {
        title: 'Bottom padding (after last match)',
        type: 'number',
        default_value: 30
    },

    distance_between_rounds: {
        title: 'Distance between rounds',
        type: 'number',
        default_value: 74
    },

    auto_canvas_height: {
        title: 'Auto canvas height (as high as the entire content)',
        type: 'switch',
        default_value: false
    }
}

export const ROUND_TITLE_OPTIONS = {
    round_titles_padding_top: {
        title: 'Padding above round titles',
        type: 'number',
        default_value: 34
    },

    hide_round_titles: {
        title: 'Hide round titles',
        type: 'switch',
        default_value: false
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

    round_title_text_align: {
        title: 'Round title text align',
        type: 'select',
        options: [ 'left', 'center', 'right' ],
        default_value: 'center'
    },

    round_title_hor_margin: {
        title: 'Round title horizontal margin',
        type: 'number',
        default_value: 8
    },

    round_title_margin_bottom: {
        title: 'Round title margin bottom',
        type: 'number',
        default_value: 34
    }
}

export const HORIZONTAL_SCROLL_OPTIONS = {
    horizontal_scroll_triggered_by: {
        title: 'Bracket scrolled horizontally by',
        type: 'select',
        options: [ 'buttons', 'mousemove', 'drag' ],
        default_value: 'buttons'
    },
    mousemove_horizontal_scroll_speed: {
        title: 'Horizontal scroll speed on mousemove',
        type: 'number',
        default_value: 2,
        disable_if: options => options.horizontal_scroll_triggered_by === 'buttons'
    },
    horizontal_scroll_buttons_position: {
        title: 'Horizontal scroll buttons positioned at',
        type: 'select',
        options: [ 'top', 'middle', 'bottom' ],
        default_value: 'top',
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_size: {
        title: 'Horizontal scroll buttons size',
        type: 'number',
        default_value: 50,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_color: {
        title: 'Horizontal scroll buttons color',
        type: 'string',
        default_value:'#161616',
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_hor_padding: {
        title: 'Horizontal scroll buttons horizontal padding',
        type: 'number',
        default_value: 29,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_vert_padding: {
        title: 'Horizontal scroll buttons vertical padding',
        type: 'number',
        default_value: 2,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_icon_left: {
        title: 'Icon for left horizontal scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <div class="default-scroll-button">
                <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
            </div>
        `,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_buttons_icon_right: {
        title: 'Icon for right horizontal scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <div class="default-scroll-button">
                <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
            </div>
        `,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    always_show_horizontal_scroll_buttons: {
        title: 'Always show horizontal scroll buttons (otherwise only when canvas is hovered)',
        type: 'switch',
        default_value: true,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    },
    horizontal_scroll_duration: {
        title: 'Horizontal scroll duration on button clicks',
        type: 'number',
        default_value: 300,
        disable_if: options => options.horizontal_scroll_triggered_by === 'mousemove'
    }
}

export const VERTICAL_SCROLL_OPTIONS = {
    vertical_scroll_triggered_by: {
        title: 'Bracket scrolled vertically by',
        type: 'select',
        options: [ 'wheel', 'drag' ],
        default_value: 'wheel'
    },

    vertical_scroll_animation_duration: {
        title: 'Vertical scroll animation duration',
        type: 'number', 
        default_value: 250
    },

    vertical_scroll_amount: {
        title: `Vertical scroll amount (if set to 0, defaults to 'Minimal height per match')`,
        type: 'number',
        default_value: 0
    },
}

export const CONNECTION_LINES_OPTIONS = {
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
    highlighted_connection_lines_color: {
        title: 'Highlighted connection lines color',
        type: 'string',
        default_value: '#0078be'
    },
    highlighted_connection_lines_width: {
        title: 'Highlighted connection lines width (if empty, default to regular line width)',
        type: 'number',
        default_value: '2'
    }
}

export const MATCH_OPTIONS = {
    min_height_per_match: {
        title: 'Minimal height per match',
        type: 'number',
        default_value: 70
    },

    reduce_match_until_clicked: {
        title: 'Reduce match info to only teams titles until CLICKED',
        type: 'switch',
        default_value: false,
        modify_other_options: new_value => {
            return new_value ? {
                reduce_match_until_hovered: false,
                highlight_team_history_on_click: false
            } : {}
        }
    },

    reduce_match_until_hovered: {
        title: 'Reduce match info to only teams titles until HOVERED',
        type: 'switch',
        default_value: false,
        modify_other_options: new_value => {
            return new_value ? {
                reduce_match_until_clicked: false,
                highlight_team_history_on_click: false
            } : {}
        }
    },
    
    expanded_match_border_color: {
        title: `Border color of an 'expanded' match`,
        type: 'string',
        default_value: '#000',
        disable_if: options => !options.reduce_match_until_clicked && !options.reduce_match_until_hovered
    },
    
    expanded_match_background_color: {
        title: `Background color of an 'expanded' match`,
        type: 'string',
        default_value: '',
        disable_if: options => !options.reduce_match_until_clicked && !options.reduce_match_until_hovered
    },

    highlight_team_history_on_click: {
        title: 'Highlight team history on click',
        type: 'switch',
        default_value: true,
        modify_other_options: new_value => {
            return new_value ? {
                reduce_match_until_clicked: false,
                reduce_match_until_hovered: false
            } : {}
        }
    },

    highlighted_team_text_color: {
        title: 'Highlighted team text color',
        type: 'string',
        default_value: '#00578a',
        disable_if: options => !options.highlight_team_history_on_click
    },

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

    match_padding_right: {
        title: 'Match right padding',
        type: 'number',
        default_value: 12
    },

    draw_seed: {
        title: 'Show seed (or entry_status)',
        type: 'select',
        options: [ 'At first round', 'At all rounds', `Don't show, unless match is expanded on hover or click` ],
        default_value: 'At first round'
    },

    seed_width: {
        title: 'Seed width',
        type: 'number',
        default_value: 33
    },

    seed_color: {
        title: 'Seed color',
        type: 'string',
        default_value: '#b7b7b7'
    },

    seed_font_size: {
        title: 'Seed font size',
        type: 'number',
        default_value: '14'
    },
    
    seed_font_family: {
        title: 'Seed font family',
        type: 'string',
        default_value: 'roboto'
    },
}

export const TEAM_TITLE_OPTIONS = {
    team_title_max_width: {
        title: `Team title maximum width`,
        type: 'number',
        default_value: 200
    },

    team_title_font_size: {
        title: 'Team title font size',
        type: 'number',
        default_value: 16
    },
    
    team_title_font_family: {
        title: 'Team title font family',
        type: 'string',
        default_value: 'roboto'
    },

    team_title_text_color: {
        title: 'Team title text color',
        type: 'string',
        default_value: '#000'
    },

    winner_is_highlighted: {
        title: 'Should highlight a winner',
        type: 'switch',
        default_value: true
    },

    show_full_title_tooltip: {
        title: 'When team is under cursor, show a tooltip with full team title (if title was shortened due to "Team title maximum width" option)',
        type: 'switch',
        default_value: true
    }
}

export const SCORES_OPTIONS = {
    scores_left_margin: {
        title: 'Scores left margin',
        type: 'number',
        default_value: 30
    },
    score_font_size: {
        title: 'Score font size',
        type: 'number',
        default_value: 16
    },
    score_text_color: {
        title: 'Score text color',
        type: 'string',
        default_value: '#000'
    },
    score_font_family: {
        title: 'Score font-family',
        type: 'string',
        default_value: 'roboto'
    },
    score_hor_margin: {
        title: 'Score horizontal margin',
        type: 'number',
        default_value: 2
    },
}

export const OPTIONS = {
    GENERAL_OPTIONS,
    ROUND_TITLE_OPTIONS,
    HORIZONTAL_SCROLL_OPTIONS,
    VERTICAL_SCROLL_OPTIONS,
    CONNECTION_LINES_OPTIONS,
    MATCH_OPTIONS,
    TEAM_TITLE_OPTIONS,
    SCORES_OPTIONS
}