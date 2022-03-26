import { get_round_title_height } from '../utils/sizes.mjs'

const get_gutter_border_color = options => {
    return (
        options.vertical_scroll_buttons_position === 'In the gutters'
        && options.scroll_gutter_border_color
    ) ? options.scroll_gutter_border_color : 'transparent'
}

const get_hor_align = position => {
    if (position === 'left') return 'flex-start'
    if (position === 'center') return 'center'
    if (position === 'right') return 'flex-end'
}


const get_up_button_styles = (root_id, options) => `
    #${root_id} .scroll-button-wrapper.up {
        top: ${get_round_title_height(options)}px;
        border-bottom: 1px solid ${get_gutter_border_color(options)};
    }
    #${root_id} .scroll-button-wrapper.up .button-clickable-area {
        background: ${ options.up_scroll_button_clickable_background }
    }
`

const get_down_button_styles = (root_id, options) => `
    #${root_id} .scroll-button-wrapper.down  {
        bottom: 0;
        border-top: 1px solid ${get_gutter_border_color(options)};
    }
    #${root_id} .scroll-button-wrapper.down .button-clickable-area {
        background: ${ options.down_scroll_button_clickable_background }
    }
`

const get_vert_buttons_shared_styles = (root_id, options) => `
    #${root_id} .scroll-button-wrapper.vertical {
        align-items: center;
        justify-content: ${get_hor_align(options.vertical_scroll_buttons_alignment)};
        left: 0;
        width: 100%;
        pointer-events: ${ options.vertical_scroll_buttons_position === 'In the gutters' ? 'auto' : 'none' };
        background: ${ options.vertical_scroll_buttons_position === 'In the gutters'
            ? options.scroll_gutter_background_color
            : 'none'
        };
        margin: ${ options.vertical_scroll_buttons_position === 'In the gutters'
            ? 0
            : options.vertical_scroll_buttons_vert_margin
        } 0;
    }

        
    #${root_id} .scroll-button-wrapper.vertical .button-clickable-area {
        width: ${options.vertical_scroll_buttons_clickable_width}px;
        height: ${options.vertical_scroll_buttons_clickable_height}px;
        margin: 0 ${ options.vertical_scroll_buttons_hor_margin };
    }

    #${root_id} .scroll-button-wrapper.vertical svg {
        fill: ${options.vertical_scroll_buttons_svg_color};
    }
`


export const get_vert_buttons_styles = (root_id, options) => `
    ${get_up_button_styles(root_id, options)}
    ${get_down_button_styles(root_id, options)}
    ${get_vert_buttons_shared_styles(root_id, options)}
`
