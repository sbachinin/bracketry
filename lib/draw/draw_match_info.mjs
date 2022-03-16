import {
    MATCH_PADDING_LEFT,
} from '../constants.mjs'
import { draw_side_info } from './side_info.mjs'

export const draw_match_info = ({
    team_title_width,
    widest_entry_status_width,
    round_index,
    match,
    options,
    ctx
}) => {
    const { e: initial_X, f: initial_Y } = ctx.getTransform()
    ctx.textBaseline = 'middle'

// draw upper side
    ctx.setTransform(1, 0, 0, 1,
        initial_X + MATCH_PADDING_LEFT,
        initial_Y - options.match_font_size*0.8
    )
    draw_side_info({
        side: match.sides[0],
        team_title_width,
        widest_entry_status_width,
        round_index,
        options,
        ctx
    })

// draw lower side
    ctx.setTransform(1, 0, 0, 1,
        initial_X + MATCH_PADDING_LEFT,
        initial_Y + options.match_font_size*0.8
    )
    draw_side_info({
        side: match.sides[1],
        team_title_width,
        widest_entry_status_width,
        round_index,
        options,
        ctx
    })

}