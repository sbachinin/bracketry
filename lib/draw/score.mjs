export const draw_score = ({
    ctx,
    side,
    options
}) => {
    const {
        score_hor_margin: margin_X,
        match_font_size: font_size,
    } = options

    const score_width = font_size

    ctx.save();

    const draw_single_score = (
        { main_score, tie_break, main_score_width },
        score_index
    ) => {
        const current_score_left_X = (score_width + margin_X*2) * score_index
        ctx.textAlign = 'center';
        ctx.font = `bold ${font_size}px ${options.score_font_family}`;
        ctx.fillText(
            main_score,
            /* text X */ Math.floor(current_score_left_X + margin_X + score_width/2),
            /* text Y */ 0
        );
        if (tie_break) {
            ctx.textAlign = 'left';
            ctx.font = `bold ${font_size/1.6}px ${options.score_font_family}`;
            ctx.fillText(
                tie_break,
                /* text X */ Math.floor(current_score_left_X + margin_X + score_width/2 + main_score_width/2),
                /* text Y */ Math.floor(-font_size/3)
            );
        }
    }

    ctx.fillStyle = options.score_text_color
    side.score?.forEach?.(draw_single_score)

    ctx.restore();
}