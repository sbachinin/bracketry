import * as constants from './constants.mjs'

export const draw_scores = (ctx, match_data, options) => {
    const draw_single_score = (score, index, y) => {
        const x = match_data.positionX
            + constants.ROUND_WIDTH
            - 100 // perhaps should be dynamic
            + options.score_size * index
        
        ctx.fillStyle = options.score_bg;
        ctx.fillRect(
            x - options.score_hor_padding,
            y,
            ctx.measureText(score).width + options.score_hor_padding*2,
            parseInt(options.score_size, 10) + options.score_vert_padding*2
        );
        ctx.fillStyle = options.score_text_color;
        ctx.fillText(
            score,
            x,
            y + 2 + options.score_vert_padding
        );
    }

    ctx.save();
    ctx.font = `bold ${options.score_size}px ${options.score_font_family}`;
    ctx.textBaseline = 'top';

    match_data.first_team_score.forEach(
        (score, index) => draw_single_score(
            score, index,
            match_data.centerY - options.score_size - options.score_vert_padding*2
        )
    )

    match_data.second_team_score.forEach(
        (score, index) => draw_single_score(
            score, index,
            match_data.centerY
        )
    )

    ctx.restore();
}