export const draw_entry_status = ({ side, width, options, ctx }) => {
    ctx.textAlign = 'center'
    ctx.font = `${options.match_font_size - 2}px ${options.entry_status_font_family}`

    ctx.fillStyle = options.entry_status_color
    ctx.fillText(
        side.entry_status || '',
        width / 2,
        0
    )
    ctx.translate(width, 0)
}