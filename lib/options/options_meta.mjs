import { visibility_options } from '../constants.mjs'

const GENERAL_OPTIONS = {
    background_color: {
        title: 'Canvas background color',
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
        default_value: 74,
        min_value: 20
    },

    auto_canvas_height: {
        title: 'Auto canvas height (as high as the entire content)',
        type: 'boolean',
        default_value: false
    }
}

export const ROUND_TITLE_OPTIONS = {
    round_titles_padding_top: {
        title: 'Padding above round titles',
        type: 'number',
        default_value: 34,
        min_value: 0
    },

    hide_round_titles: {
        title: 'Hide round titles',
        type: 'boolean',
        default_value: false
    },

    round_title_font_size: {
        title: 'Font size of a round title',
        type: 'number',
        default_value: 30,
        min_value: 8
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
        default_value: 34,
        min_value: 0
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
        min_value: 1,
        disable_if: options => options.horizontal_scroll_triggered_by === 'buttons'
    },
    horizontal_scroll_buttons_alignment: {
        title: 'Horizontal scroll buttons aligned at',
        type: 'select',
        options: [ 'top', 'middle', 'bottom' ],
        default_value: 'top',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },
    horizontal_scroll_buttons_position: {
        title: 'Horizontal scroll buttons position',
        type: 'select',
        options: [ 'On top of canvas', 'In the gutters' ],
        default_value: 'On top of canvas',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },
    scroll_gutter_border_color: {
        title: 'Scroll gutter border color',
        type: 'string',
        default_value: '#bbbbbb',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position !== 'In the gutters'
    },
    scroll_gutter_background_color: {
        title: 'Scroll gutter background color',
        type: 'string',
        default_value: '#ffffff',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position !== 'In the gutters'
    },
    horizontal_scroll_icon_size: {
        title: 'Horizontal scroll buttons size',
        type: 'number',
        default_value: 50,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },
    horizontal_scroll_buttons_svg_color: {
        title: 'Horizontal scroll buttons color',
        type: 'string',
        default_value:'#161616',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },
    horizontal_scroll_buttons_clickable_width: {
        title: 'Horizontal scroll buttons clickable width',
        type: 'number',
        default_value: 96,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },

    horizontal_scroll_buttons_clickable_height: {
        title: 'Horizontal scroll buttons clickable height',
        type: 'number',
        default_value: 96,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    },

    left_scroll_button_clickable_background: {
        title: 'Left scroll button clickable area background',
        type: 'string',
        default_value: 'linear-gradient(to left, transparent, #fff 50%)',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    },

    right_scroll_button_clickable_background: {
        title: 'Right scroll button clickable area background',
        type: 'string',
        default_value: 'linear-gradient(to right, transparent, #fff 50%)',
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    },

    horizontal_scroll_buttons_hor_margin: {
        title: 'Horizontal scroll buttons horizontal margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    },

    horizontal_scroll_buttons_vert_margin: {
        title: 'Horizontal scroll buttons vertical margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },

    left_scroll_button_icon: {
        title: 'Icon for LEFT scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        `,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },
    right_scroll_button_icon: {
        title: 'Icon for RIGHT scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        `,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    },

    horizontal_scroll_duration: {
        title: 'Horizontal scroll duration on button clicks',
        type: 'number',
        default_value: 300,
        disable_if: options => options.horizontal_scroll_triggered_by !== 'buttons'
    }
}

export const VERTICAL_SCROLL_OPTIONS = {
    vertical_scroll_triggered_by: {
        title: 'Bracket scrolled vertically by',
        type: 'select',
        options: [ 'buttons', 'wheel', 'drag' ],
        default_value: 'wheel',
        disable_if: options => options.auto_canvas_height
    },

    vertical_scroll_animation_duration: {
        title: 'Vertical scroll animation duration',
        type: 'number', 
        default_value: 350,
        disable_if: options => options.auto_canvas_height
    },

    vertical_scroll_amount: {
        title: `Vertical scroll amount (if set to 0, defaults to 'Minimal height per match')`,
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_canvas_height
    },

    vertical_scroll_buttons_position: {
        title: 'Vertical scroll buttons position',
        type: 'select',
        options: [ 'On top of canvas', 'In the gutters' ],
        default_value: 'On top of canvas',
        disable_if: options => options.auto_canvas_height
            ||options.vertical_scroll_triggered_by !== 'buttons'
    },
    up_scroll_button_clickable_background: {
        title: 'Up scroll button clickable area background',
        type: 'string',
        default_value: 'none',
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    down_scroll_button_clickable_background: {
        title: 'Down scroll button clickable area background',
        type: 'string',
        default_value: 'none',
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_alignment: {
        title: 'Vertical scroll buttons aligned at',
        type: 'select',
        options: [ 'left', 'center', 'right' ],
        default_value: 'left',
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_vert_margin: {
        title: 'Vertical scroll buttons vertical margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_clickable_width: {
        title: 'Vertical scroll buttons clickable width',
        type: 'number',
        default_value: 96,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_clickable_height: {
        title: 'Vertical scroll buttons clickable height',
        type: 'number',
        default_value: 96,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_hor_margin: {
        title: 'Vertical scroll buttons horizontal margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_svg_color: {
        title: 'Vertical scroll buttons color',
        type: 'string',
        default_value:'#161616',
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    up_scroll_button_icon: {
        title: 'Icon for UP scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
        `,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    down_scroll_button_icon: {
        title: 'Icon for DOWN scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
        `,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_icon_size: {
        title: 'Vertical scroll buttons size',
        type: 'number',
        default_value: 50,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_shift_on_button_clicks: {
        title: 'Vertical shift on button clicks, %',
        type: 'number',
        default_value: 5,
        disable_if: options => options.auto_canvas_height
            || options.vertical_scroll_triggered_by !== 'buttons'
    }
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
        default_value: 1,
        min_value: 0,
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
        default_value: 2,
        min_value: 0,
    },
    highlighted_connection_lines_are_dashed: {
        title: 'Highlighted connection lines are dashed',
        type: 'boolean',
        default_value: false
    }
}

export const MATCH_OPTIONS = {
    min_height_per_match: {
        title: 'Minimal height per match',
        type: 'number',
        default_value: 70,
        min_value: 20,
    },

    reduce_match_until_clicked: {
        title: 'Reduce match info to only teams titles until CLICKED',
        type: 'boolean',
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
        type: 'boolean',
        default_value: false,
        modify_other_options: new_value => {
            return new_value ? {
                reduce_match_until_clicked: false,
                highlight_team_history_on_click: false
            } : {}
        }
    },
    
    animate_match_expand: {
        title: 'Animate expand/collapse',
        type: 'boolean',
        default_value: true,
        disable_if: options => !options.reduce_match_until_clicked && !options.reduce_match_until_hovered
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
        type: 'boolean',
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
        default_value: 10,
        min_value: 0,
    },

    match_padding_left: {
        title: 'Match left padding',
        type: 'number',
        default_value: 4,
        min_value: 0,
    },

    match_padding_right: {
        title: 'Match right padding',
        type: 'number',
        default_value: 12,
        min_value: 0,
    },

    entry_status_visibility: {
        title: 'Show entry status',
        type: 'select',
        options: [
            { title: 'At all rounds', value: visibility_options.ALL_ROUNDS },
            { title: 'At first round', value: visibility_options.FIRST_ROUND },
            { title: `Don't show, unless match is expanded on hover or click`,
                value: visibility_options.ONLY_EXPANDED_MATCH },
            { title: 'Never', value: visibility_options.NEVER }
        ],
        default_value: visibility_options.FIRST_ROUND
    },

    entry_status_width: {
        title: 'Entry status width',
        type: 'number',
        default_value: 32,
        min_value: 0,
    },

    entry_status_color: {
        title: 'Entry status color',
        type: 'string',
        default_value: '#b7b7b7'
    },

    entry_status_font_size: {
        title: 'Entry status font size',
        type: 'number',
        default_value: 14,
        min_value: 8,
    },
    
    entry_status_font_family: {
        title: 'Entry status font family',
        type: 'string',
        default_value: 'roboto'
    },



    nationalities_visibility: {
        title: 'Show nationality',
        type: 'select',
        options: [
            { title: 'At all rounds', value: visibility_options.ALL_ROUNDS },
            { title: 'At first round', value: visibility_options.FIRST_ROUND },
            { title: `Don't show, unless match is expanded on hover or click`,
                value: visibility_options.ONLY_EXPANDED_MATCH },
            { title: 'Never', value: visibility_options.NEVER }
        ],
        default_value: visibility_options.FIRST_ROUND
    },

    nationality_width: {
        title: 'Nationality width',
        type: 'number',
        default_value: 34,
        min_value: 0,
    },

    nationality_font_size: {
        title: 'Nationality font size (if no flag)',
        type: 'number',
        default_value: 12,
        min_value: 8,
    },

    nationality_font_family: {
        title: 'Nationality font family (if no flag)',
        type: 'string',
        default_value: 'roboto'
    },

    nationality_font_color: {
        title: 'Nationality color (if no flag)',
        type: 'string',
        default_value: '#838383'
    },

}

export const TEAM_TITLE_OPTIONS = {
    team_title_left_margin: {
        title: 'Team title left margin',
        type: 'number',
        default_value: 5,
        min_value: 0,
    },

    team_title_max_width: {
        title: `Team title maximum width`,
        type: 'number',
        default_value: 200,
        min_value: 0,
    },

    team_title_font_size: {
        title: 'Team title font size',
        type: 'number',
        default_value: 16,
        min_value: 8,
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
        type: 'boolean',
        default_value: true
    },

    show_full_title_tooltip: {
        title: 'When team is under cursor, show a tooltip with full team title (if title was shortened due to "Team title maximum width" option)',
        type: 'boolean',
        default_value: true
    }
}

export const SCORES_OPTIONS = {
    scores_left_margin: {
        title: 'Scores left margin',
        type: 'number',
        default_value: 30,
        min_value: 0,
    },
    score_font_size: {
        title: 'Score font size',
        type: 'number',
        default_value: 16,
        min_value: 8,
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
        title: 'Horizontal margin between scores',
        type: 'number',
        default_value: 2,
        min_value: -3,
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