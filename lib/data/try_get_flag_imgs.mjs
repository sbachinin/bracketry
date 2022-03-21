import { once_for_each_team } from './utils.mjs'

const get_image_promise_from_url = flag_url => {
    return new Promise(resolve => {
        let img = new Image
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = flag_url
    })
}

const is_of_drawable_type = val => {
    return val instanceof HTMLImageElement
        || val instanceof SVGImageElement
        || val instanceof HTMLVideoElement
        || val instanceof HTMLCanvasElement
        || val instanceof ImageBitmap
        || val instanceof OffscreenCanvas
        || val instanceof VideoFrame
}

export const try_get_flag_imgs = (all_data, options) => {
    const id_to_image_promises = []
    
    once_for_each_team(all_data, team => {
        let image_promise = null

        if (team.flag_url) {
            image_promise = get_image_promise_from_url(team.flag_url)
        } else if (team.nationality_code && typeof options.get_flag_image_source === 'function') {
            image_promise = options.get_flag_image_source(team.nationality_code)
        }

        if (
            image_promise !== null
            && image_promise.then !== undefined // user may provide invalid fn that doesn't return a promise
        ) {
            id_to_image_promises.push(
                image_promise.then(img => {
                    if (is_of_drawable_type(img)) {
                        return { [team.id]: img }
                    } else {
                        return null
                    }
                })
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