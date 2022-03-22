import { NATIONALITY_MARGIN_LEFT_RATIO } from '../constants.mjs'

export const draw_nationality = ({
    side, all_data, options, ctx
}) => {
    if (all_data.entry_status_width > 0) {
        ctx.translate(options.match_font_size * NATIONALITY_MARGIN_LEFT_RATIO, 0)
    }

    const width = all_data.nationality_width

// 1. try draw flag
    const { flag_image } = all_data.teams[side.id]
    if (flag_image) {
        const ratio = Math.min(flag_image.height/flag_image.width, 1)
        const height = width * ratio
        ctx.drawImage(
            flag_image,
            0,
            -height/2 - options.match_info_vert_shift,
            width,
            height
        )
// 2. try draw nationality_code
    } else if (side.nationality_code) {
        ctx.textAlign = 'center'
        ctx.font = `${options.match_font_size - 4}px ${options.nationality_font_family}`
        ctx.fillStyle = options.nationality_font_color

        ctx.fillText(
            side.nationality_code.slice(0,3) || '',
            width / 2,
            0
        )
    }
    
    ctx.translate(width, 0)
}
