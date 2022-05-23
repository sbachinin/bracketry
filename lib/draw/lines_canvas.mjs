import { draw_normal_lines } from './normal_lines.mjs'
import { maybe_draw_highlighted_line } from './highlighted_line.mjs'

export const refresh_canvas = (
    all_data,
    state,
    options,
    stable_elements
) => {
    console.log('refresh canvas')
    const width = Math.floor(stable_elements.matches_scrollable_area.clientWidth)
    const height = Math.floor(stable_elements.matches_scrollable_area.clientHeight)
    stable_elements.lines_canvas.style.width = width + 'px'
    stable_elements.lines_canvas.style.height = height + 'px'
    stable_elements.lines_canvas.width = width
    stable_elements.lines_canvas.height = height
    draw_normal_lines(stable_elements, options)
    maybe_draw_highlighted_line(
        all_data,
        state,
        options,
        stable_elements
    )
}
