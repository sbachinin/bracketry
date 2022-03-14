import {
    TEAM_TITLE_LEFT_MARGIN,
    SCORES_LEFT_MARGIN,
    MATCH_PADDING_LEFT
} from '../constants.mjs'
import { draw_scores } from './draw_scores.mjs'
import { should_draw_entry_status, draw_entry_status } from './entry_status.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'
import { should_draw_nationalities, draw_nationalities } from './nationalities.mjs'

export const draw_match_info = ({
    team_title_width,
    round_index,
    match,
    options,
    ctx
}) => {
    ctx.textBaseline = 'middle'
    
    ctx.translate(MATCH_PADDING_LEFT, 0)
    if (should_draw_entry_status(round_index, options)) {
        draw_entry_status({ match, options, ctx })
        ctx.translate(options.entry_status_width, 0)
    }
    
    if (should_draw_nationalities(round_index, options)) {
        draw_nationalities({ match, options, ctx })
        ctx.translate(options.nationality_width, 0)
    }

    ctx.translate(TEAM_TITLE_LEFT_MARGIN, 0)

    draw_teams_titles({ match, options, ctx })

    ctx.translate(team_title_width + SCORES_LEFT_MARGIN, 0)
    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_scores({ ctx, match, options })
    }
}