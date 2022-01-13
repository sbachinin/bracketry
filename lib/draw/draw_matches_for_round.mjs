import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { get_round_title_height } from '../utils/sizes.mjs'
import { try_expand_match_if_hovered } from './try_expand_match_if_hovered.mjs'

const adjust_font = (options, isHighlighted) => {
    return `${
        (options.winner_is_highlighted && isHighlighted) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const draw_matches_for_round = (
    round_index,
    all_data,
    canvas_el,
    options,
    state,
) => {
    const round_data = all_data.rounds[round_index]
    round_data.matches.forEach((match_data, match_index) => {
        const { center_Y, sides } = match_data
        // match is invisible in this scrollY position
        if (center_Y < get_round_title_height(options) || center_Y > canvas_el.height) return
        
        const ctx = canvas_el.getContext('2d')
        ctx.textBaseline = 'middle'
        
        const round_left_X = round_data.left_X - state.scroll_X
        let current_X = round_left_X + options.match_padding_left
        
        const texts_offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2

        if (should_draw_seed(round_index, options.draw_seed)) {
            draw_seed(sides, options, current_X, center_Y, ctx)
            current_X += options.seed_width
        }

        // DRAW TEAMS NAMES
        ctx.textAlign = 'left'
        ctx.fillStyle = options.team_title_text_color
        ctx.font = adjust_font(options, sides[0].isWinner)
        ctx.fillText(
            sides?.[0]?.title_to_display,
            current_X,
            center_Y - texts_offset + 2)
        ctx.font = adjust_font(options, sides[1].isWinner)
        ctx.fillText(
            sides?.[1]?.title_to_display,
            current_X,
            center_Y + texts_offset + 2)

        current_X += all_data.team_title_width + options.scores_left_margin
        if (!options.show_scores_only_on_hover) {
            draw_scores(ctx, match_data, current_X, options)
        }


        try_expand_match_if_hovered(match_data, round_data, state, canvas_el, options)



// draw 'axis' of the match
        ctx.beginPath()
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color
        ctx.moveTo(round_left_X + round_data.width, center_Y)
        const connection_point = [round_left_X, center_Y]
        ctx.lineTo(...connection_point)

        if (round_index > 0) {
            draw_connecting_lines(
                all_data.rounds[round_index - 1].matches,
                match_index,
                connection_point,
                options,
                ctx
            )
        }

        ctx.stroke();
    })
}