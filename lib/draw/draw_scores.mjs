import { get_team_texts_offset } from '../utils/sizes.mjs'

export const draw_scores = ({
    ctx,
    match,
    options
}) => {
    const {
        score_hor_margin: margin_X,
        score_font_size: font_size,
    } = options

    const score_width = font_size

    ctx.save();

    const draw_single_score = (middle_Y, { main_score, tie_break, main_score_width }, score_index) => {
        const current_score_left_X = (score_width + margin_X*2) * score_index
        ctx.textAlign = 'center';
        ctx.font = `bold ${font_size}px ${options.score_font_family}`;
        ctx.fillText(
            main_score,
            /* text X */ Math.floor(current_score_left_X + margin_X + score_width/2),
            /* text Y */ Math.floor(middle_Y + 2)
        );
        if (tie_break) {
            ctx.textAlign = 'left';
            ctx.font = `bold ${font_size/1.6}px ${options.score_font_family}`;
            ctx.fillText(
                tie_break,
                /* text X */ Math.floor(current_score_left_X + margin_X + score_width/2 + main_score_width/2),
                /* text Y */ Math.floor(middle_Y - font_size/3)
            );
        }
    }

    const offset = get_team_texts_offset(options)
    ctx.fillStyle = options.score_text_color
    match.sides?.[0]?.score?.forEach?.(draw_single_score.bind(null, -offset))

    ctx.fillStyle = options.score_text_color
    match.sides?.[1]?.score?.forEach?.(draw_single_score.bind(null, offset))

    ctx.restore();
}