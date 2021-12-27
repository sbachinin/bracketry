export const draw_scores = (ctx, match_data, {
    score_hor_padding: paddingX,
    score_hor_margin: marginX,
    score_vert_padding: paddingY,
    score_size: size,
    score_text_color: text_color,
    score_bg: bg,
    score_font_family: font_family,
    round_width,
    vert_gap_between_opponents
}) => {
    const widest_score_text_width = ctx.measureText(
        Math.max(
            ...match_data.first_team_score,
            ...match_data.second_team_score
        )
    ).width

    const overall_single_score_width = widest_score_text_width + paddingX*2 + marginX*2

    const scores_leftmost_X = match_data.positionX + round_width - 100

    const draw_single_score = (score, index, y) => {
        const x = scores_leftmost_X
            + overall_single_score_width * index
        
        ctx.fillStyle = bg;
        ctx.fillRect(
            x + marginX,
            y,
            /* bg width */ widest_score_text_width + paddingX*2,
            /* bg height */ parseInt(size, 10) + paddingY*2
        );
        ctx.fillStyle = text_color;
        ctx.fillText(
            score,
            /* text X */ x + marginX + paddingX - 1,
            /* text Y */ y + 2 + paddingY
        );
    }

    ctx.save();
    ctx.font = `bold ${size}px ${font_family}`;
    ctx.textBaseline = 'top';

    match_data.first_team_score.forEach(
        (score, index) => draw_single_score(
            score, index,
            match_data.centerY - size - paddingY*2 - vert_gap_between_opponents/2
        )
    )

    match_data.second_team_score.forEach(
        (score, index) => draw_single_score(
            score, index,
            match_data.centerY + vert_gap_between_opponents/2
        )
    )

    ctx.restore();
}