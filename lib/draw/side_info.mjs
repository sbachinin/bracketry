import {
    SCORES_LEFT_MARGIN
} from '../constants.mjs'
import { draw_score } from './score.mjs'
import { should_draw_entry_status, draw_entry_status } from './entry_status.mjs'
import { draw_team_title } from './draw_team_title.mjs'
import { should_draw_nationalities, draw_nationality } from './nationality.mjs'

export const draw_side_info = ({
    side,
    team_title_width,
    widest_entry_status_width,
    round_index,
    is_expanded,
    options,
    ctx
}) => {
    
    if (should_draw_entry_status(round_index, options)) {
        draw_entry_status({ side, width: widest_entry_status_width, options, ctx })
    }

    if (should_draw_nationalities(round_index, options)) {
        draw_nationality({ round_index, side, options, ctx })
    }

    draw_team_title({
        side,
        y: 0,
        is_winner: !!side.isWinner,
        is_expanded,
        options,
        ctx
    })

    ctx.translate(team_title_width + SCORES_LEFT_MARGIN, 0)
    if (!options.reduce_match_until_clicked && !options.reduce_match_until_hovered) {
        draw_score({ side, options, ctx })
    }
}