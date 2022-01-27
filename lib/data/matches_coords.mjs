export const set_matches_center_Ys = (all_data, scroll_Y, options) => {
    Object.assign(
        all_data,
        {
            rounds: all_data.rounds.map(round => {
                const round_scroll_Y = round.height_deficit > 0
                    ? Math.floor(round.height_deficit / 100 * scroll_Y)
                    : 0
                
                return {
                    ...round,
                    matches: round.matches.map(match_data => {
                        return {
                            ...match_data,
                            // relative to canvas 0 Y:
                            center_Y: round.height_per_match * (match_data.order - 0.5)
                                - round_scroll_Y
                        }
                    })
                }
            })
        }
    )
}
