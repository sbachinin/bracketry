const adjust_font = (options, isHighlighted) => {
    return `${
        (options.winner_is_highlighted && isHighlighted) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const draw_teams_titles = (
    sides,
    current_X,
    center_Y,
    highlighted_team_id,
    options,
    ctx,
    is_expanded = false
) => {
    const texts_offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2
    const title_prop_name = is_expanded ? 'short_title' : 'title_to_display'

    ctx.textAlign = 'left'
    ctx.fillStyle = (typeof highlighted_team_id === 'string' && sides[0].id === highlighted_team_id)
        ? options.highlighted_team_text_color
        : options.team_title_text_color
    ctx.font = adjust_font(options, sides[0].isWinner)
    ctx.fillText(
        sides?.[0]?.[title_prop_name],
        Math.floor(current_X),
        Math.floor(center_Y - texts_offset + 2))

    ctx.fillStyle = (typeof highlighted_team_id === 'string' && sides[1].id === highlighted_team_id)
        ? options.highlighted_team_text_color
        : options.team_title_text_color
    ctx.font = adjust_font(options, sides[1].isWinner)
    ctx.fillText(
        sides?.[1]?.[title_prop_name],
        Math.floor(current_X),
        Math.floor(center_Y + texts_offset + 2))
}