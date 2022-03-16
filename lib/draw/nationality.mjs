import { visibility_options } from '../constants.mjs'
import { should_draw_entry_status } from './entry_status.mjs'
import {
    MARGIN_BTW_STATUS_AND_NATIONALITY
} from '../constants.mjs'

export const should_draw_nationalities = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.nationalities_visibility === visibility_options.NEVER) return false
    if (options.nationalities_visibility === visibility_options.ALL_ROUNDS) return true
    if (options.nationalities_visibility === visibility_options.FIRST_ROUND) return round_index === 0
}

export const draw_nationality = ({
    round_index, side, options, ctx
}) => {
    if (should_draw_entry_status(round_index, options)) {
        ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)
    }

    ctx.textAlign = 'center'
    ctx.font = `${options.match_font_size - 4}px ${options.nationality_font_family}`
    ctx.fillStyle = options.nationality_font_color
    ctx.strokeStyle = options.nationality_font_color

    ctx.strokeRect(
        0,
        -options.match_font_size * 0.5,
        options.match_font_size * 1.6,
        options.match_font_size
    )

    ctx.fillText(
        side.nationality_code || '',
        options.match_font_size * 0.8,
        0
    )
    
    ctx.translate(options.match_font_size*2, 0)
}