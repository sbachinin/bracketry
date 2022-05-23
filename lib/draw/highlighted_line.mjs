export const maybe_draw_highlighted_line = (
    all_data,
    state,
    options,
    stable_elements
) => {
    if (state.highlighted_contestant_id === null) return

    const matches_to_highlight = all_data.rounds
        .map(r => r.matches.find(
            m => m.sides.find(s => s.contestant_id === state.highlighted_contestant_id)
        ))
        .filter(m => m !== undefined)
        .map(m => document.querySelector(`.match-wrapper[match-id="${m.id}"]`))

    if (!matches_to_highlight.length) return


    const ctx = stable_elements.lines_canvas.getContext('2d')

    ctx.beginPath()
    ctx.strokeStyle = options.highlight_color
    ctx.fillStyle = options.highlight_color
    ctx.lineWidth = options.highlighted_connection_lines_width
    ctx.lineJoin = 'round'

    if (options.highlighted_connection_lines_are_dashed) {
        ctx.setLineDash([
            options.highlighted_connection_lines_width * 2,
            options.highlighted_connection_lines_width * 2.5
        ])
    }

    for (let i=matches_to_highlight.length-1; i>=0; i--) {
        const el = matches_to_highlight[i]
        const round_offset_left = el.closest('.round-wrapper').offsetLeft
        ctx.lineTo(round_offset_left + el.clientWidth, el.offsetTop + el.clientHeight / 2)
        ctx.lineTo(round_offset_left, el.offsetTop + el.clientHeight / 2)
    }

    ctx.stroke();
}