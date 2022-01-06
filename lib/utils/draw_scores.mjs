import { get_single_score_width } from './sizes.mjs'

export const draw_scores = (
    ctx,
    match_data,
    scores_left_X,
    options
) => {
    const {
        score_hor_margin: margin_X,
        score_vert_padding: padding_Y,
        score_font_size: font_size,
        score_text_color: text_color,
        score_bg: bg,
        score_font_family: font_family,
        vert_gap_between_opponents
    } = options

    const score_width = options.score_width === 'auto' ? font_size : parseInt(options.score_width)

    ctx.save();

    let scores_middle_Y = null

    const draw_single_score = ({ main_score, tie_break }, score_index) => {
        const current_score_left_X = scores_left_X + (score_width + margin_X*2) * score_index
        if (bg) {
            ctx.fillStyle = bg;
            ctx.fillRect(
                current_score_left_X + margin_X,
                scores_middle_Y - font_size/2 - padding_Y,
                /* bg width */ score_width,
                /* bg height */ font_size + padding_Y*2
            );
        }
        ctx.fillStyle = text_color;
        ctx.textAlign = 'right';
        ctx.font = `bold ${font_size}px ${font_family}`;
        ctx.fillText(
            main_score,
            /* text X */ current_score_left_X + margin_X + score_width/2,
            /* text Y */ scores_middle_Y + 2
        );
        if (tie_break) {
            ctx.textAlign = 'left';
            ctx.font = `bold ${font_size/1.6}px ${font_family}`;
            ctx.fillText(
                tie_break,
                /* text X */ current_score_left_X + margin_X + score_width/2,
                /* text Y */ scores_middle_Y - font_size/3
            );
        }
    }

    scores_middle_Y = match_data.center_Y - vert_gap_between_opponents/2 - font_size/2
    match_data.sides?.[0]?.score?.forEach?.(draw_single_score)
    scores_middle_Y = match_data.center_Y + vert_gap_between_opponents/2 + font_size/2
    match_data.sides?.[1]?.score?.forEach?.(draw_single_score)

    ctx.restore();
}