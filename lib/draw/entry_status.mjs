import { visibility_options } from '../constants.mjs'

export const should_draw_entry_status = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.entry_status_visibility === visibility_options.NEVER) return false
    if (options.entry_status_visibility === visibility_options.ALL_ROUNDS) return true
    if (options.entry_status_visibility === visibility_options.FIRST_ROUND) return round_index === 0
}

export const draw_entry_status = ({ side, width, options, ctx }) => {
    ctx.textAlign = 'center'
    ctx.font = `${options.match_font_size - 2}px ${options.entry_status_font_family}`

    if (options.entry_status_visibility) {
        ctx.fillStyle = options.entry_status_color
        ctx.fillText(
            side.entry_status || '',
            Math.floor(width/2),
            0
        )
    }
    ctx.translate(width, 0)
}