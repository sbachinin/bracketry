import { get_team_texts_offset } from '../utils/sizes.mjs'

export const should_draw_nationalities = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.draw_nationalities === 'Never') return false
    if (options.draw_nationalities === 'At all rounds') return true
    if (options.draw_nationalities === 'At first round') return round_index === 0
}

export const draw_nationalities = ({
    match, options, ctx
}) => {
    const offset = get_team_texts_offset(options)

    ctx.textAlign = 'center'
    ctx.font = `${options.nationality_font_size}px ${options.nationality_font_family}`
    ctx.fillStyle = options.nationality_font_color
    
    ctx.fillText(
        match.sides?.[0]?.nationality || '',
        Math.floor(options.nationality_width/2),
        -offset + 2
    )
    ctx.fillText(
        match.sides?.[1]?.nationality || '',
        Math.floor(options.nationality_width/2),
        offset + 2
    )
}