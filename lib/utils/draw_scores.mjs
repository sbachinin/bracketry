export const draw_scores = (ctx, match_data, {
    score_hor_padding: paddingX,
    score_hor_margin: marginX,
    score_vert_padding: paddingY,
    score_size: size,
    score_text_color: text_color,
    score_bg: bg,
    score_font_family: font_family,
    scores_horizontal_position,
    match_width,
    vert_gap_between_opponents
}) => {
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

    const overall_single_score_width = widest_score_text_width + paddingX*2 + marginX*2

    const scores_leftmost_X = match_data.left_X + match_width - 100 + scores_horizontal_position

    let scores_middleY = null

    const draw_single_score = (score, index) => {
        const x = scores_leftmost_X
            + overall_single_score_width * index
        
        ctx.fillStyle = bg;
        ctx.fillRect(
            x + marginX,
            scores_middleY - size/2 - paddingY,
            /* bg width */ widest_score_text_width + paddingX*2,
            /* bg height */ size + paddingY*2
        );
        ctx.fillStyle = text_color;
        ctx.textAlign = 'center';
        ctx.fillText(
            score,
            /* text X */ x + marginX + paddingX + widest_score_text_width/2,
            /* text Y */ scores_middleY + 2
        );
    }

    scores_middleY = match_data.center_Y - vert_gap_between_opponents/2 - size/2
    first_team_score.forEach(draw_single_score)
    
    scores_middleY = match_data.center_Y + vert_gap_between_opponents/2 + size/2
    second_team_score.forEach(draw_single_score)

    ctx.restore();
}