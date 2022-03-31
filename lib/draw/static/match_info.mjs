import {
    MATCH_PADDING_LEFT,
    MATCH_INFO_OFFSET_RATIO
} from '../../constants.mjs'
import { draw_side_info } from './side_info.mjs'

export const draw_match_info = ({
    all_data,
    match,
    highlighted_team_id,
    options,
    ctx
}) => {
    const { e: initial_X, f: initial_Y } = ctx.getTransform()
    ctx.textBaseline = 'middle'

// draw upper side
    ctx.setTransform(1, 0, 0, 1,
        initial_X + MATCH_PADDING_LEFT,
        initial_Y - options.match_font_size * MATCH_INFO_OFFSET_RATIO + options.match_info_vert_shift
    )
    draw_side_info({
        side: match.sides[0],
        all_data,
        is_highlighted: highlighted_team_id === match.sides[0].id,
        options,
        ctx
    })

// draw lower side
    ctx.setTransform(1, 0, 0, 1,
        initial_X + MATCH_PADDING_LEFT,
        initial_Y + options.match_font_size * MATCH_INFO_OFFSET_RATIO + options.match_info_vert_shift
    )
    draw_side_info({
        side: match.sides[1],
        all_data,
        is_highlighted: highlighted_team_id === match.sides[1].id,
        options,
        ctx
    })

}