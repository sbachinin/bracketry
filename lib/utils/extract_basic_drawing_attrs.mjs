export const extract_basic_drawing_attrs = (rounds, options, ctx) => {
    ctx.save();
    ctx.font = `${options.team_title_font_size}px ${options.team_title_font_family}`
    let widest_team_title_width = 0
    rounds.forEach(round => {
        round.matches.forEach(match => {
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].title).width,
                ctx.measureText(match.sides[1].title).width
            )
        })
    })

    ctx.restore();
    
    return {
        widest_team_title_width
    }
}