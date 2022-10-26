const get_fullscreen_styles = (get_option) => `
    .playoffs-fullscreen-wrapper {
        background-color: ${get_option('fullscreenBgColor')};
    }

    .exit-fullscreen-button {
        width: calc((100% - ${get_option('width')}) / 2);
        height: calc((100% - ${get_option('height')}) / 2);
    }

    .exit-fullscreen-button .circle-button {
        background: ${get_option('rootBgColor')};
    }
`
export const get_general_styles = (get_option) => {
    let result = ''

    const is_fullscreen = get_option('fullscreen') === true
    const scroll_with_buttons = get_option('verticalScrollMode') === 'buttons'

    if (is_fullscreen) {
        result += get_fullscreen_styles(get_option)
    }

    result += `
        ## {
            background-color: ${get_option('rootBgColor')};
            border-color: ${get_option('mainBorderColor')};
            width: ${get_option('width')};
            height: ${get_option('height')};
        }
        
        ## .round-titles-wrapper {
            height: ${get_option('roundTitlesHeight')}px;
            font-size: ${get_option('roundTitlesFontSize')}px;
            font-family: ${get_option('roundTitlesFontFamily') || get_option('rootFontFamily')};
            color: ${get_option('roundTitleColor')};
        }
        
        ## .round-titles-wrapper:after {
            border-bottom: 1px solid ${get_option('roundTitlesBorderBottomColor')};
        }
    
        ## .vertical-scroll-button {
            display: ${scroll_with_buttons || is_fullscreen ? 'flex' : 'none'};
        }
    
        ## .matches-positioner {
            min-height: 100%;
            padding: ${get_option('mainVerticalPadding') || 0}px 0;
            font-size: ${get_option('matchFontSize')}px;
        }
    
        ## .scrollbar-parent {
            display: ${get_option('showScrollbar') === true ? 'block' : 'none'};
            width: ${get_option('scrollbarWidth')}px;
        }
    
        ## .scrollbar {
            background: ${get_option('scrollbarColor')};
            ${
                (scroll_with_buttons || is_fullscreen)
                ? `transition: top 0.2s ease-out, height 0.2s ease-out;`
                : ''
            }
        }
    
    `


    return result
}