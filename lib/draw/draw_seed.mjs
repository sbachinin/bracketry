export const should_draw_seed = (round_index, options) => {
    if (options.reduce_match_until_clicked) return false
    if (options.reduce_match_until_hovered) return false
    
    if (options.draw_seed === 'Never') return false
    if (options.draw_seed === 'At all rounds') return true
    if (options.draw_seed === 'At first round') return round_index === 0
}

export const draw_seed = (sides, current_X, match_center_Y, options, ctx) => {
    const offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2

    if (options.draw_seed) {
        ctx.textAlign = 'center'
        ctx.font = `${options.seed_font_size}px ${options.seed_font_family}`
        ctx.fillStyle = options.seed_color
        ctx.fillText(
            sides?.[0]?.seed_text || '',
            Math.floor(current_X + options.seed_width/2),
            Math.floor(match_center_Y - offset + 2)
        )
        ctx.fillText(
            sides?.[1]?.seed_text || '',
            Math.floor(current_X + options.seed_width/2),
            Math.floor(match_center_Y + offset + 2)
        )
    }
}