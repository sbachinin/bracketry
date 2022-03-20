import { for_each_team } from './for_each_team.mjs'

const get_image_promise_from_url = flag_url => {
    return new Promise(resolve => {
        let img = new Image
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = flag_url
    })
}

const get_image_promise_from_nationality = (code, user_defined_getter) => {
    return new Promise(resolve => {
        user_defined_getter(code).then(image_source => resolve(image_source))
    })
}


export const try_get_flag_imgs = (all_data, options) => {
    const id_to_image_promises = []
    
    for_each_team(all_data, team => {
        let image_promise = null

        if (team.flag_url) {
            image_promise = get_image_promise_from_url(team.flag_url)
        } else if (team.nationality_code && options.get_flag_image_source) {
            image_promise = get_image_promise_from_nationality(team.nationality_code, options.get_flag_image_source)
        }

        if (image_promise !== null) {
            id_to_image_promises.push(
                image_promise.then(img => ({ [team.id]: img }))
            )
        }
    })
 
    return Promise.all(id_to_image_promises).then(id_to_image_arr => {
        // here flatten an array of objects into one object:
        const obj = {}
        id_to_image_arr.filter(Boolean).forEach(
            id_to_img => Object.assign(obj, id_to_img)
        )
        return obj
    })

}