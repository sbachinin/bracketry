export const draw_normal_lines = (stable_elements, options) => {
    const ctx = stable_elements.lines_canvas.getContext('2d')
    ctx.clearRect(0, 0, stable_elements.lines_canvas.width, stable_elements.lines_canvas.height)
    ctx.lineJoin = 'round'
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color

    const rounds = [...stable_elements.matches_scrollable_area.querySelectorAll('.round-wrapper')]

    rounds.forEach(r => {
        r.querySelectorAll('.whole-match').forEach((m, i) => {
            ctx.beginPath()
            /* to match left */ctx.moveTo(r.offsetLeft, m.offsetTop + m.clientHeight/2)
            /* to match right */ctx.lineTo(r.offsetLeft + r.clientWidth, m.offsetTop + m.clientHeight/2)
            const next_round = r.nextSibling
            if (next_round) {
                const child_match = next_round.querySelector('.whole-matches-overlay').children[Math.floor(i / 2)]
                /* to child left */ctx.lineTo(next_round.offsetLeft, child_match.offsetTop + child_match.clientHeight/2)
            }
            ctx.stroke()
        })
    })
}