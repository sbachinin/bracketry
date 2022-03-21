const codes_to_image_promises = {} // it's to run flag getter only once per nationality_code

export const try_get_image_promise_from_nationality = (team, options) => {
    if (!team.nationality_code) return null
    if (typeof options.get_flag_image_source !== 'function') return null
    if (codes_to_image_promises[team.nationality_code]) {
        return codes_to_image_promises[team.nationality_code]
    }

    let promise = null

    try {
        promise = options.get_flag_image_source(team.nationality_code)
    } catch(e) {
        console.error(e)
        return null
    }

    codes_to_image_promises[team.nationality_code] = promise

    return promise
}
