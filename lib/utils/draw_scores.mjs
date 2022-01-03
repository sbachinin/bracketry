export const draw_scores = (
    ctx,
    match_data,
    round_left_X,
    {
        score_hor_padding: padding_X,
        score_hor_margin: margin_X,
        score_vert_padding: padding_Y,
        score_size: size,
        score_text_color: text_color,
        score_bg: bg,
        score_font_family: font_family,
        scores_horizontal_position,
        match_width,
        vert_gap_between_opponents
    }
) => {
    ctx.save();
    ctx.font = `bold ${size}px ${font_family}`;

    const first_team_score = match_data.sides[0].score
    const second_team_score = match_data.sides[1].score

    // (moved every time by the width of next pair of scores)
    let current_X = round_left_X + match_width - 100 + scores_horizontal_position

    let scores_middle_Y = null

    const draw_single_score = (score, widest_score_text_width) => {
        ctx.fillStyle = bg;
        ctx.fillRect(
            current_X + margin_X,
            scores_middle_Y - size/2 - padding_Y,
            /* bg width */ widest_score_text_width + padding_X*2,
            /* bg height */ size + padding_Y*2
        );
        ctx.fillStyle = text_color;
        ctx.textAlign = 'center';
        ctx.fillText(
            score,
            /* text X */ current_X + margin_X + padding_X + widest_score_text_width/2,
            /* text Y */ scores_middle_Y + 2
        );
    }

    first_team_score.forEach(
        (score, i) => {
            const widest_score_text_width = ctx
                .measureText(Math.max(score, second_team_score[i])).width
            scores_middle_Y = match_data.center_Y - vert_gap_between_opponents/2 - size/2
            draw_single_score(first_team_score[i], widest_score_text_width)
            scores_middle_Y = match_data.center_Y + vert_gap_between_opponents/2 + size/2
            draw_single_score(second_team_score[i], widest_score_text_width)

            current_X += (widest_score_text_width + padding_X*2 + margin_X*2)
        }
    )

    ctx.restore();
}