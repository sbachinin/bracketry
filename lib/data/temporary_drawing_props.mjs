import { measure_round_heights } from '../utils/sizes.mjs'

export const set_round_heights = (all_data, options, canvas_height) => {
    Object.assign(
        all_data,
        {
            rounds: all_data.rounds.map(round => {
                return {
                    ...round,
                    ...measure_round_heights(
                        round.matches.length,
                        options,
                        canvas_height
                    )
                }
            })
        }
    )
        
}
