import {
    MARGIN_BTW_STATUS_AND_NATIONALITY,
} from '../constants.mjs'

export const draw_nationality = ({
    side, all_data, options, ctx
}) => {
    if (all_data.entry_status_width > 0) {
        ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)
    }

    ctx.textAlign = 'center'
    ctx.font = `${options.match_font_size - 4}px ${options.nationality_font_family}`
    ctx.fillStyle = options.nationality_font_color

    ctx.fillText(
        side.nationality_code || '',
        all_data.nationality_width / 2,
        0
    )
    
    ctx.translate(all_data.nationality_width, 0)
}