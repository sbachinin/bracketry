import { once_for_each_team } from '../utils.mjs'
import { get_image_promise_from_url } from './get_image_promise_from_url.mjs'
import { try_get_image_promise_from_nationality } from './try_get_image_promise_from_nationality.mjs'

/*
    EXPLANATION
    HOW FLAGS ARE DISPLAYED

    on update_all:
        if there are flag_urls for sides in user data,
            request images for these urls and prepare HTMLImageElements for team ids
            { [team_id]: HTMLImageElement }
        if there are no flag urls BUT there are
            a) nationality_code for sides in user data
            AND b) get_flag_image_source function in user options,
            then {
                call this function, hopefully get an object of CanvasImageSource type
                store these objects for team ids
                { [team_id]: HTMLImageElement or any other CanvasImageSource object }
            }

    in get_permanent_widths,
        I check if at least 1 side has a flag_url or nationality_code
        If there is such a side,
            I set all_data.nationality_width to some positive value (deduced from options.match_font_size).
            And add this nationality_width to all_data.round_width
        
    in draw_nationality,
        nationality_width (if it's not 0) is in any case reserved for nationality
        1) try to find a flag image for this team id in all_data.team_ids_to_flag_images
            and draw it if found
        2) if flag not found, try draw nationality_code
        3) if no nationality_code, draw nothing
*/


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
        } else {
            image_promise = try_get_image_promise_from_nationality(team, options)
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