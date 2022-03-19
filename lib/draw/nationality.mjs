import { MARGIN_BTW_STATUS_AND_NATIONALITY } from '../constants.mjs'

export const draw_nationality = ({
    side, all_data, options, ctx
}) => {
    if (all_data.entry_status_width > 0) {
        ctx.translate(MARGIN_BTW_STATUS_AND_NATIONALITY, 0)
    }

// 1. try dispay side.flag_url
    if (side.flag_url && all_data.flags_urls_to_images[side.flag_url]) {
        ctx.drawImage(
            all_data.flags_urls_to_images[side.flag_url],
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


/*
    on library initialization,
        1) put all side's flag_urls array to data summary (analyze_data)
        2) get all images for flag_urls using Image src and onload
            and put all url-image pairs to flags_urls_to_images obj
            If request to image fails, it's just ignored and isn't put to this obj

    in get_permanent_widths,
        I check if at least 1 side has a flag_url or nationality_code
        If there is such a side,
            I set all_data.nationality_width to some positive value (deduced from options.match_font_size).
            And add this nationality_width to all_data.round_width
        
    in draw/nationality,
        if flag or nationality_code is present for a given side,
            flag or code is drawn using nationality_width.
            nationality_width is occupied anyway (by flag, or code, or emptiness)
*/