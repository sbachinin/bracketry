export const update_scrollbar = (
    { scrollbar, matches_vertical_scroller },
    get_option
) => {
    scrollbar.style.top = matches_vertical_scroller.scrollTop
        / matches_vertical_scroller.scrollHeight * 100 + '%'
    scrollbar.style.height = matches_vertical_scroller.clientHeight
        / matches_vertical_scroller.scrollHeight * 100 + '%'

    const content_is_higher = matches_vertical_scroller.scrollHeight > matches_vertical_scroller.clientHeight
    scrollbar.style.visibility = content_is_higher && get_option('showScrollbar') ? 'visible' : 'hidden'
}