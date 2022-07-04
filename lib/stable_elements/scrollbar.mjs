export const update_scrollbar = (
    { scrollbar, matches_vertical_scroller }
) => {
    if (getComputedStyle(scrollbar).display === 'none') return
    scrollbar.style.top = matches_vertical_scroller.scrollTop
        / matches_vertical_scroller.scrollHeight * 100 + '%'
    scrollbar.style.height = matches_vertical_scroller.clientHeight
        / matches_vertical_scroller.scrollHeight * 100 + '%'

    const content_is_higher = matches_vertical_scroller.scrollHeight > matches_vertical_scroller.clientHeight
    scrollbar.style.visibility = content_is_higher ? 'visible' : 'hidden'
}