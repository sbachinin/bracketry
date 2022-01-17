export const draw_scores = (
    ctx,
    match_data,
    scores_left_X,
    options
) => {
    const {
        score_hor_margin: margin_X,
        score_font_size: font_size,
        team_title_font_size
    } = options

    const score_width = font_size

    ctx.save();

    let scores_middle_Y = null

    const draw_single_score = ({ main_score, tie_break, main_score_width }, score_index) => {
        const current_score_left_X = scores_left_X + (score_width + margin_X*2) * score_index

        ctx.fillStyle = options.score_text_color;
        ctx.textAlign = 'center';
        ctx.font = `bold ${font_size}px ${options.score_font_family}`;
        ctx.fillText(
            main_score,
            /* text X */ current_score_left_X + margin_X + score_width/2,
            /* text Y */ scores_middle_Y + 2
        );
        if (tie_break) {
            ctx.textAlign = 'left';
            ctx.font = `bold ${font_size/1.6}px ${options.score_font_family}`;
            ctx.fillText(
                tie_break,
                /* text X */ current_score_left_X + margin_X + score_width/2 + main_score_width/2,
                /* text Y */ scores_middle_Y - font_size/3
            );
        }
    }

    const offset = options.vert_gap_between_opponents/2 + team_title_font_size/2
    scores_middle_Y = match_data.center_Y - offset
    match_data.sides?.[0]?.score?.forEach?.(draw_single_score)
    scores_middle_Y = match_data.center_Y + offset
    match_data.sides?.[1]?.score?.forEach?.(draw_single_score)

    ctx.restore();
}