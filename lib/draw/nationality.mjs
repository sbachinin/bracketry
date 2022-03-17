import {
    MARGIN_BTW_STATUS_AND_NATIONALITY,
    FLAG_WIDTH_FACTOR
} from '../constants.mjs'

export const draw_nationality = ({
    side, options, ctx
}) => {
    ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)

    ctx.textAlign = 'center'
    ctx.font = `${options.match_font_size - 4}px ${options.nationality_font_family}`
    ctx.fillStyle = options.nationality_font_color

    ctx.fillText(
        side.nationality_code || '',
        options.match_font_size * FLAG_WIDTH_FACTOR / 2,
        0
    )
    
    ctx.translate(options.match_font_size * FLAG_WIDTH_FACTOR, 0)
}