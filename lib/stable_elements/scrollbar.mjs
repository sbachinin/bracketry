export const update_scrollbar = (
    { scrollbar, matches_vertical_scroller },
    options
) => {
    scrollbar.style.top = matches_vertical_scroller.scrollTop
        / matches_vertical_scroller.scrollHeight * 100 + '%'
    scrollbar.style.height = matches_vertical_scroller.clientHeight
        / matches_vertical_scroller.scrollHeight * 100 + '%'
        
    scrollbar.style.background = options.scrollbar_color

    const content_is_higher = matches_vertical_scroller.scrollHeight > matches_vertical_scroller.clientHeight
    scrollbar.style.visibility = content_is_higher && options.show_scrollbar ? 'visible' : 'hidden'
}