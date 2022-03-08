import { draw_team_title } from './draw_team_title.mjs'
import { get_team_texts_offset } from '../utils/sizes.mjs'

export const draw_teams_titles = ({
    match,
    options,
    ctx,
    is_expanded = false
}) => {
    const offset = get_team_texts_offset(options)
    const title_prop_name = is_expanded ? 'short_title' : 'title_to_display'

    ctx.textAlign = 'left'
    
    draw_team_title({
        title: match.sides?.[0]?.[title_prop_name],
        y: -offset + 2,
        is_winner: !!match.sides[0].isWinner,
        options,
        ctx
    })

    draw_team_title({
        title: match.sides?.[1]?.[title_prop_name],
        y: offset + 2,
        is_winner: !!match.sides[1].isWinner,
        options,
        ctx
    })
}