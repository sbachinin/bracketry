import { get_team_texts_offset } from '../utils/sizes.mjs'
import { visibility_options } from '../constants.mjs'

export const should_draw_nationalities = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.nationalities_visibility === visibility_options.NEVER) return false
    if (options.nationalities_visibility === visibility_options.ALL_ROUNDS) return true
    if (options.nationalities_visibility === visibility_options.FIRST_ROUND) return round_index === 0
}

export const draw_nationalities = ({
    match, options, ctx
}) => {
    const offset = get_team_texts_offset(options)

    ctx.textAlign = 'center'
    ctx.font = `${Math.floor(options.match_font_size * 0.7)}px ${options.nationality_font_family}`
    ctx.fillStyle = options.nationality_font_color
    
    ctx.fillText(
        match.sides?.[0]?.nationality_code || '',
        Math.floor(options.match_font_size),
        -offset + 2
    )
    ctx.fillText(
        match.sides?.[1]?.nationality_code || '',
        Math.floor(options.match_font_size),
        offset + 2
    )
}