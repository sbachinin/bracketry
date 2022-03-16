import {
    MARGIN_BTW_STATUS_AND_NATIONALITY
} from '../constants.mjs'

export const draw_nationality = ({
    side, options, ctx
}) => {
    ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)

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