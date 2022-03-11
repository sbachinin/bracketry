import { get_team_texts_offset } from '../utils/sizes.mjs'

export const should_draw_entry_status = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.should_draw_entry_status === 'Never') return false
    if (options.should_draw_entry_status === 'At all rounds') return true
    if (options.should_draw_entry_status === 'At first round') return round_index === 0
}

export const draw_entry_status = ({ match, options, ctx }) => {
    const offset = get_team_texts_offset(options)

    if (options.should_draw_entry_status) {
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