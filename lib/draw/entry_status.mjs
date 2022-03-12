import { get_team_texts_offset } from '../utils/sizes.mjs'
import { visibility_options } from '../constants.mjs'

export const should_draw_entry_status = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.entry_status_visibility === visibility_options.NEVER) return false
    if (options.entry_status_visibility === visibility_options.ALL_ROUNDS) return true
    if (options.entry_status_visibility === visibility_options.FIRST_ROUND) return round_index === 0
}

export const draw_entry_status = ({ match, options, ctx }) => {
    const offset = get_team_texts_offset(options)

    if (options.entry_status_visibility) {
        ctx.textAlign = 'center'
        ctx.font = `${options.entry_status_font_size}px ${options.entry_status_font_family}`
        ctx.fillStyle = options.entry_status_color
        ctx.fillText(
            match.sides?.[0]?.entry_status || '',
            Math.floor(options.entry_status_width/2),
            -offset + 2
        )
        ctx.fillText(
            match.sides?.[1]?.entry_status || '',
            Math.floor(options.entry_status_width/2),
            offset + 2
        )
    }
}