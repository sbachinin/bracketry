export const draw_normal_lines = (stable_elements, options) => {
    return
    const ctx = stable_elements.lines_canvas.getContext('2d')
    ctx.clearRect(0, 0, stable_elements.lines_canvas.width, stable_elements.lines_canvas.height)
    ctx.lineJoin = 'round'
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.setLineDash([]) // reset dotted style just in case

    const rounds = [...stable_elements.matches_scrollable_area.querySelectorAll('.round-wrapper')]
    const rounds_top = rounds[0].getBoundingClientRect().top

    rounds.forEach(r => {
        r.querySelectorAll('.match-axis-line').forEach((m, i) => {
            const line_top = m.getBoundingClientRect().top

            ctx.beginPath()
            // /* to match left */ctx.moveTo(r.offsetLeft, line_top - rounds_top + options.connection_lines_width / 2)
            /* to match right */ctx.moveTo(r.offsetLeft + r.clientWidth, line_top - rounds_top + options.connection_lines_width / 2)
            const next_round = r.nextSibling
            if (next_round) {
                const child_line = next_round.querySelectorAll('.match-axis-line')[Math.floor(i / 2)]
                if (!child_line) return 
                const child_line_top = child_line.getBoundingClientRect().top
                /* to child left */ctx.lineTo(next_round.offsetLeft, child_line_top - rounds_top + options.connection_lines_width / 2)
            }
            ctx.stroke()
        })
    })
}