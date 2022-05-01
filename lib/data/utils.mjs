export const find_match_data_by_id = (all_data, match_id) => {
    for (let r_i=0; r_i<=all_data.rounds.length-1; r_i++) {
        const round = all_data.rounds[r_i]
        for (let m_i=0; m_i<=round.matches.length-1; m_i++) {
            const match = round.matches[m_i]
            if (match.id === match_id) {
                return {
                    round_index: r_i,
                    round,
                    match_index: m_i,
                    match
                }
            }
        }
    }
}