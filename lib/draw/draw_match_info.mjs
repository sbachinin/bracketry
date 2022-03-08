import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
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
    
    ctx.translate(options.match_padding_left, 0)
    if (should_draw_seed(round_index, options)) {
        draw_seed({ match, options, ctx })
        ctx.translate(options.seed_width, 0)
    }
    
    if (should_draw_nationalities(round_index, options)) {
        draw_nationalities({ match, options, ctx })
        ctx.translate(options.nationality_width, 0)
    }

    draw_teams_titles({ match, options, ctx })

    ctx.translate(team_title_width + options.scores_left_margin, 0)
    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_scores({ ctx, match, options })
    }
}