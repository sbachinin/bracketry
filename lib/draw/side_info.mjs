import {
    SCORES_LEFT_MARGIN
} from '../constants.mjs'
import { draw_score } from './score.mjs'
import { draw_entry_status } from './entry_status.mjs'
import { draw_team_title } from './draw_team_title.mjs'
import { draw_nationality } from './nationality.mjs'

export const draw_side_info = ({
    side,
    team_title_width,
    entry_status_width,
    options,
    ctx
}) => {
    draw_entry_status({ side, width: entry_status_width, options, ctx })

    draw_nationality({ side, options, ctx })

    draw_team_title({
        title: side.title,
        y: 0,
        is_winner: !!side.isWinner,
        options,
        ctx
    })

    ctx.translate(team_title_width + SCORES_LEFT_MARGIN, 0)
    draw_score({ side, options, ctx })
}