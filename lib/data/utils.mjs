
// call callback 
export const once_for_each_team = (all_data, cb) => {
    all_data.rounds[0].matches.forEach(m => {
        m.sides.forEach(cb)
    })
}