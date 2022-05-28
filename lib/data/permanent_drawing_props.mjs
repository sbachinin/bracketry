import { add_match_props } from './add_match_props.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_permanent_drawing_props = (all_data) => {
    let have_entry_statuses = false
    let have_nationalities = false

    all_data.matches.forEach(
        m => m.sides.forEach(
            s => {
                if (typeof all_data.contestants[s.contestant_id]?.entry_status === 'string') {
                    have_entry_statuses = true
                }

                all_data.contestants[s.contestant_id]?.players.forEach(p => {
                    if (typeof p.flag_url === 'string' || typeof p.nationality_code === 'string') {
                        have_nationalities = true
                    }
                })
            }))

    return {
        ...all_data,
        have_entry_statuses,
        have_nationalities,
        rounds: all_data.rounds.map((round, round_index) => {
            return {
                ...round,
                title: round.name || get_default_round_title(all_data.rounds.length, round_index),
            }
        }),
        matches: all_data.matches.map(m => add_match_props(all_data, m))
    }
}
