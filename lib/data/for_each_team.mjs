export const for_each_team = (all_data, cb) => {
    all_data.rounds.forEach(r => {
        r.matches.forEach(m => {
            m.sides.forEach(cb)
        })
    })
}