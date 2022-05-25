const GENERAL_OPTIONS = {
    background_color: {
        title: 'Main background color',
        type: 'string',
        default_value: '#ffffff'
    },

    main_vertical_padding: {
        title: 'Main vertical padding (before first match and after last match), in pixels',
        type: 'number',
        default_value: 20
    },
/* // declined to add this option because it made it difficult to handle horizontal scroll;
    // instead of such custom padding, a match_hor_margin is added on the left and right
    main_horizontal_padding: {
        title: 'Main horizontal padding (before first round and after last round), in pixels',
        type: 'number',
        default_value: 20
    },
 */
    match_hor_margin: {
        title: 'Match horizontal margins, in pixels',
        type: 'number',
        default_value: 36,
        min_value: 0
    },

    show_scrollbar: {
        title: 'Should show scrollbar',
        type: 'boolean',
        default_value: true
    },

    scrollbar_width: {
        title: 'Scrollbar width, px',
        type: 'number',
        default_value: '5',
    },

    scrollbar_color: {
        title: 'Scrollbar color',
        type: 'string',
        default_value: '#d3d3d3'
    }
}

export const ROUND_TITLE_OPTIONS = {
    round_titles_height: {
        title: 'Round titles height, in any units',
        type: 'string',
        default_value: '50px'
    },

    round_titles_border_bottom_color: {
        title: 'Round titles bottom border-color',
        type: 'string',
        default_value: 'transparent'
    },

    // round_titles_padding_top: {
    //     title: 'Padding above round titles',
    //     type: 'number',
    //     default_value: 34,
    //     min_value: 0
    // },

    hide_round_titles: {
        title: 'Hide round titles',
        type: 'boolean',
        default_value: false
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

    round_title_horizontal_padding: {
        title: 'Round title horizontal padding',
        type: 'number',
        default_value: 30
    },
}

export const HORIZONTAL_SCROLL_OPTIONS = {
    horizontal_scroll_buttons_position: {
        title: 'Horizontal scroll buttons position',
        type: 'select',
        options: [ 'On top of matches', 'In the gutters', 'Hidden' ],
        default_value: 'In the gutters',
        // disable_if: options => options.auto_content_size
    },

    scroll_buttons_top_distance: {
        title: 'Horizontal scroll buttons distance from content top, in any units',
        type: 'string',
        default_value: '50%',
        disable_if: options => options.horizontal_scroll_buttons_position === 'In the gutters'
    },

    /* horizontal_scroll_buttons_alignment: {
        title: 'Horizontal scroll buttons aligned at',
        type: 'select',
        options: [ 'top', 'middle', 'bottom' ],
        default_value: 'top',
        disable_if: options => options.auto_content_size
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    }, */
    scroll_gutter_border_color: {
        title: 'Scroll gutter border color',
        type: 'string',
        default_value: '#bbbbbb',
        disable_if: options => options.horizontal_scroll_buttons_position !== 'In the gutters' /* || options.auto_content_size */
    },

    horizontal_scroll_button_size: {
        title: 'Horizontal scroll buttons size, in any units',
        type: 'string',
        default_value: '50px',
        // disable_if: options => options.auto_content_size
    },
    horizontal_scroll_buttons_svg_color: {
        title: 'Horizontal scroll buttons color',
        type: 'string',
        default_value:'#161616',
        // disable_if: options => options.auto_content_size
    },

    left_scroll_button_background: {
        title: 'Left scroll button background',
        type: 'string',
        default_value: 'transparent', // 'linear-gradient(to left, transparent, #fff 50%)',
        // disable_if: options => options.auto_content_size
    },

    right_scroll_button_background: {
        title: 'Right scroll button background',
        type: 'string',
        default_value: 'transparent', // 'linear-gradient(to right, transparent, #fff 50%)',
        // disable_if: options => options.auto_content_size
    },
/* 
    horizontal_scroll_buttons_hor_margin: {
        title: 'Horizontal scroll buttons horizontal margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_content_size
            || options.horizontal_scroll_buttons_position === 'In the gutters'
    },
 */

    left_scroll_button_icon: {
        title: 'Icon for LEFT scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        `,
        // disable_if: options => options.auto_content_size
    },
    right_scroll_button_icon: {
        title: 'Icon for RIGHT scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        `,
        // disable_if: options => options.auto_content_size
    },
}
/* 
export const VERTICAL_SCROLL_OPTIONS = {
    vertical_scroll_triggered_by: {
        title: 'Bracket scrolled vertically by',
        type: 'select',
        options: [ 'buttons', 'wheel' ],
        default_value: 'wheel',
        disable_if: options => options.auto_content_size
    },

    vertical_scroll_animation_duration: {
        title: 'Vertical scroll animation duration',
        type: 'number', 
        default_value: 350,
        disable_if: options => options.auto_content_size
    },

    vertical_scroll_amount: {
        title: `Vertical scroll amount (if set to 0, defaults to 'Minimal height per match')`,
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_content_size
    },

    vertical_scroll_buttons_position: {
        title: 'Vertical scroll buttons position',
        type: 'select',
        options: [ 'On top of matches', 'In the gutters' ],
        default_value: 'On top of matches',
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_alignment: {
        title: 'Vertical scroll buttons aligned at',
        type: 'select',
        options: [ 'left', 'center', 'right' ],
        default_value: 'left',
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    up_scroll_button_clickable_background: {
        title: 'Up scroll button clickable area background',
        type: 'string',
        default_value: 'none',
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    down_scroll_button_clickable_background: {
        title: 'Down scroll button clickable area background',
        type: 'string',
        default_value: 'none',
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_vert_margin: {
        title: 'Vertical scroll buttons vertical margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_clickable_width: {
        title: 'Vertical scroll buttons clickable width',
        type: 'number',
        default_value: 96,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_clickable_height: {
        title: 'Vertical scroll buttons clickable height',
        type: 'number',
        default_value: 96,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_buttons_hor_margin: {
        title: 'Vertical scroll buttons horizontal margin',
        type: 'number',
        default_value: 0,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
            || options.vertical_scroll_buttons_position === 'In the gutters'
    },
    vertical_scroll_buttons_svg_color: {
        title: 'Vertical scroll buttons color',
        type: 'string',
        default_value:'#161616',
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    up_scroll_button_icon: {
        title: 'Icon for UP scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
        `,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    down_scroll_button_icon: {
        title: 'Icon for DOWN scroll button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-scroll-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
        `,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_scroll_icon_size: {
        title: 'Vertical scroll buttons size',
        type: 'number',
        default_value: 50,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    },
    vertical_shift_on_button_clicks: {
        title: 'Vertical shift on button clicks, px',
        type: 'number',
        default_value: 250,
        disable_if: options => options.auto_content_size
            || options.vertical_scroll_triggered_by !== 'buttons'
    }
} */

export const CONNECTION_LINES_OPTIONS = {
    connection_lines_width: {
        title: 'Connection lines width',
        type: 'number',
        default_value: 1,
        min_value: 0,
    },
    connection_lines_color: {
        title: 'Connection lines color',
        type: 'string',
        default_value: '#ddd'
    },
}

export const MATCH_OPTIONS = {

    min_vertical_distance_btw_matches: {
        title: 'Minimal vertical distance between matches, in pixels',
        type: 'number',
        default_value: 25,
    },

    distance_from_match_axis: {
        title: `Vertical distance between match axis and each side of a match`,
        type: 'number',
        default_value: 4
    },

    highlight_color: {
        title: 'Highlight color',
        type: 'string',
        default_value: '#0078be'
    },

    live_match_border_color: {
        title: 'Live match border color',
        type: 'string',
        default_value: '#44c985'
    },

    live_match_background_color: {
        title: 'Live match background color',
        type: 'string',
        default_value: 'transparent'
    }
    

/* 
    match_info_vert_shift: {
        title: 'Match info vertical shift',
        type: 'number',
        default_value: 1
    },
    highlight_player_history_on_click: {
        title: 'Highlight contestant history on click',
        type: 'boolean',
        default_value: true,
    },
    highlighted_player_text_color: {
        title: 'Highlighted contestant text color',
        type: 'string',
        default_value: '#00578a',
        disable_if: options => !options.highlight_player_history_on_click
    },

    entry_status_color: {
        title: 'Entry status color',
        type: 'string',
        default_value: '#b7b7b7'
    },
    
    entry_status_font_family: {
        title: 'Entry status font family',
        type: 'string',
        default_value: 'roboto'
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

    get_flag_image_source: {
        title: 'Function to get flag image source',
        type: 'function_or_null',
        default_value: null,
        explanation: explanations.get_flag_image_source,
        just_an_example: nationality_code => {
            return new Promise(resolve => {
                let img = new Image
                img.onload = () => resolve(img)
                img.onerror = () => resolve(null)
                img.src = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${nationality_code}.svg`
            })
        }
    }
*/
}

export const FONTS_OPTIONS = {
    root_font_family: {
        title: 'Root font-family (applied to blocks with an "inherit" font-family)',
        type: 'string',
        default_value: 'open sans'
    },

    round_title_font_family: {
        title: 'Round title font family',
        type: 'string',
        default_value: 'inherit'
    },

    player_title_font_family: {
        title: 'Player title font family',
        type: 'string',
        default_value: 'inherit'
    },

    match_text_color: {
        title: 'Match text color',
        type: 'string',
        default_value: '#000'
    },

    score_font_family: {
        title: 'Score font-family (provide "inherit" to use root_font_family option)',
        type: 'string',
        default_value: 'inherit'
    },


    
    round_title_font_size: {
        title: 'Round title font-size, in pixels',
        type: 'number',
        default_value: 30,
        min_value: 8
    },

    match_root_font_size: {
        title: 'Match font-size, in pixels',
        type: 'number',
        default_value: 16,
        min_value: 8,
    },
}

export const SCORES_OPTIONS = {
    distance_between_scores: {
        title: 'Distance between scores (e.g. between sets in tennis), in pixels',
        type: 'number',
        default_value: 14,
        min_value: 0,
    },
}

export const OPTIONS = {
    GENERAL_OPTIONS,
    ROUND_TITLE_OPTIONS,
    HORIZONTAL_SCROLL_OPTIONS,
    FONTS_OPTIONS,
    CONNECTION_LINES_OPTIONS,
    MATCH_OPTIONS,
    SCORES_OPTIONS
}