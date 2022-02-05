import { draw_team_title } from './draw_team_title.mjs'

export const draw_teams_titles = ({
    match,
    x,
    options,
    ctx,
    is_expanded = false
}) => {
    const texts_offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2
    const title_prop_name = is_expanded ? 'short_title' : 'title_to_display'

    ctx.textAlign = 'left'
    
    draw_team_title({
        title: match.sides?.[0]?.[title_prop_name],
        x,
        y: match.center_scroll_Y - texts_offset + 2,
        is_winner: !!match.sides[0].isWinner,
        options,
        ctx
    })

    draw_team_title({
        title: match.sides?.[1]?.[title_prop_name],
        x,
        y: match.center_scroll_Y + texts_offset + 2,
        is_winner: !!match.sides[1].isWinner,
        options,
        ctx
    })
}