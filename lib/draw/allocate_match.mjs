import { get_main_canvas_ctx } from '../utils/utils.mjs'
import { get_match_body_height } from '../utils/sizes.mjs'

export const allocate_match = (
    all_data,
    match_id,
    match_body_top_Y,
    round_scroll_X,
    options,
    offscreen_canvas
) => {
    /* get_main_canvas_ctx().fillRect(
        round_scroll_X + options.match_hor_margin,
        match_body_top_Y,
        all_data.match_width,
        get_match_body_height(options)
    ) */
    get_main_canvas_ctx().drawImage(
        offscreen_canvas.el,
        0,
        offscreen_canvas.get_static_match_center_Y(match_id) - get_match_body_height(options) / 2,
        all_data.match_width,
        get_match_body_height(options),
        Math.floor(round_scroll_X + options.match_hor_margin),
        Math.floor(match_body_top_Y),
        all_data.match_width,
        get_match_body_height(options)
    )
}