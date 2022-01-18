export const set_line_props = ({ is_highlighted, options, ctx }) => {
    if (is_highlighted) {
        ctx.strokeStyle = options.highlighted_connection_lines_color
        ctx.lineWidth = options.highlighted_connection_lines_width
    } else {
        ctx.strokeStyle = options.connection_lines_color
        ctx.lineWidth = options.connection_lines_width
    }
}