import { SCORES_MARGIN_LEFT_RATIO } from '../constants.mjs'
import { draw_score } from './score.mjs'
import { draw_entry_status } from './entry_status.mjs'
import { draw_team_title } from './draw_team_title.mjs'
import { draw_nationality } from './nationality.mjs'

export const draw_side_info = ({
    side,
    all_data,
    is_highlighted,
    options,
    ctx
}) => {
    draw_entry_status({ side, width: all_data.entry_status_width, options, ctx })

    draw_nationality({ side, all_data, options, ctx })

    draw_team_title({
        title: side.title,
        is_winner: !!side.isWinner,
        is_highlighted,
        options,
        ctx
    })

    ctx.translate(all_data.team_title_width + SCORES_MARGIN_LEFT_RATIO * options.match_font_size, 0)
    draw_score({ side, options, ctx })
}