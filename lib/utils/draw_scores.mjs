export const draw_scores = (
    ctx,
    match_data,
    left_X,
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

    const first_team_score = match_data.teams[0].score.map(score => score.game)
    const second_team_score = match_data.teams[1].score.map(score => score.game)

    const widest_score_text_width = ctx.measureText(
        Math.max(
            ...first_team_score,
            ...second_team_score
        )
    ).width

    const overall_single_score_width = widest_score_text_width + padding_X*2 + margin_X*2

    const scores_leftmost_X = left_X + match_width - 100 + scores_horizontal_position

    let scores_middleY = null

    const draw_single_score = (score, index) => {
        const x = scores_leftmost_X
            + overall_single_score_width * index
        
        ctx.fillStyle = bg;
        ctx.fillRect(
            x + margin_X,
            scores_middleY - size/2 - padding_Y,
            /* bg width */ widest_score_text_width + padding_X*2,
            /* bg height */ size + padding_Y*2
        );
        ctx.fillStyle = text_color;
        ctx.textAlign = 'center';
        ctx.fillText(
            score,
            /* text X */ x + margin_X + padding_X + widest_score_text_width/2,
            /* text Y */ scores_middleY + 2
        );
    }

    scores_middleY = match_data.center_Y - vert_gap_between_opponents/2 - size/2
    first_team_score.forEach(draw_single_score)
    
    scores_middleY = match_data.center_Y + vert_gap_between_opponents/2 + size/2
    second_team_score.forEach(draw_single_score)

    ctx.restore();
}