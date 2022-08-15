import { is_object } from '../utils.mjs'

export const get_permanent_drawing_props = (all_data) => {
    let have_entry_statuses = false
    let have_nationalities = false

    if (Array.isArray(all_data.matches) && is_object(all_data.contestants)) {
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
                }
            )
        )
    } 

    return {
        ...all_data,
        have_entry_statuses,
        have_nationalities,
    }
}
