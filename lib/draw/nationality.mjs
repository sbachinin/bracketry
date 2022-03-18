import { MARGIN_BTW_STATUS_AND_NATIONALITY } from '../constants.mjs'

export const draw_nationality = ({
    side, all_data, options, ctx
}) => {
    if (all_data.entry_status_width > 0) {
        ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)
    }

// 1. try dispay side.flag_url
    if (side.flag_url) {
        ctx.drawImage(
            all_data.flags_images[side.flag_url],
            0,
            -options.match_font_size/2 - options.match_info_vert_shift,
            all_data.nationality_width,
            options.match_font_size
        )
        
// 2. try run options.getFlag

// 3. try nationality_code
    } else if (side.nationality_code) {
        ctx.textAlign = 'center'
        ctx.font = `${options.match_font_size - 4}px ${options.nationality_font_family}`
        ctx.fillStyle = options.nationality_font_color

        ctx.fillText(
            side.nationality_code.slice(0,3) || '',
            all_data.nationality_width / 2,
            0
        )
    }
    
    ctx.translate(all_data.nationality_width, 0)
}
