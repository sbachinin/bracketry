import { get_team_texts_offset } from '../utils/sizes.mjs'

export const should_draw_seed = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.draw_seed === 'Never') return false
    if (options.draw_seed === 'At all rounds') return true
    if (options.draw_seed === 'At first round') return round_index === 0
}

export const draw_seed = ({ match, options, ctx }) => {
    const offset = get_team_texts_offset(options)

    if (options.draw_seed) {
        ctx.textAlign = 'center'
        ctx.font = `${options.seed_font_size}px ${options.seed_font_family}`
        ctx.fillStyle = options.seed_color
        ctx.fillText(
            match.sides?.[0]?.seed_text || '',
            Math.floor(options.match_padding_left + options.seed_width/2),
            -offset + 2
        )
        ctx.fillText(
            match.sides?.[1]?.seed_text || '',
            Math.floor(options.match_padding_left + options.seed_width/2),
            offset + 2
        )
    }
}