import * as constants from './constants.mjs'

export const draw_scores = (ctx, match_data, options) => {
    const draw_single_score = (score, index, y) => {
        const x = match_data.positionX
            + constants.ROUND_WIDTH
            - 100 // perhaps should be dynamic
            + options.score_size * index
        
        ctx.fillStyle = options.score_bg;
        ctx.fillRect(
            x,
            y,
            ctx.measureText(score).width,
            parseInt(options.score_size, 10)
        );
        ctx.fillStyle = options.score_text_color;
        ctx.fillText(
            score,
            x,
            y
        );
    }

    ctx.save();
    ctx.font = `bold ${options.score_size}px serif`;
    ctx.textBaseline = 'top';

    match_data.first_team_score.forEach(
        (score, index) => draw_single_score(score, index, match_data.centerY - options.score_size)
    )

    match_data.second_team_score.forEach(
        (score, index) => draw_single_score(score, index, match_data.centerY)
    )

    ctx.restore();
}