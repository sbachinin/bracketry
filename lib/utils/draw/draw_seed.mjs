export const draw_seed = (sides, options, current_X, center_Y, ctx) => {
    const offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2

    if (options.show_seed) {
        ctx.textAlign = 'center'
        ctx.font = `${options.seed_font_size}px ${options.seed_font_family}`
        ctx.fillStyle = options.seed_color
        ctx.fillText(
            typeof sides?.[0]?.seed === 'number' ? sides?.[0]?.seed : (sides?.[0].entry_status || ''),
            current_X + options.seed_width/2,
            center_Y - offset + 2)
        ctx.fillText(
            typeof sides?.[1]?.seed === 'number' ? sides?.[1]?.seed : (sides?.[1].entry_status || ''),
            current_X + options.seed_width/2,
            center_Y + offset + 2)
    }
}