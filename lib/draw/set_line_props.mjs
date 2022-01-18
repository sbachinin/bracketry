export const set_line_props = ({ is_highlighted, options, ctx }) => {
    if (is_highlighted) {
        ctx.strokeStyle = options.higlighted_connection_lines_color
    } else {
        ctx.strokeStyle = options.connection_lines_color
    }
}