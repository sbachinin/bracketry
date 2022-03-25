import { get_image_promise_from_url } from './get_image_promise_from_url.mjs'
import { try_get_image_promise_from_nationality } from './try_get_image_promise_from_nationality.mjs'
import { get_extension_from_filename, is_firefox } from '../../utils/utils.mjs'
/*
    EXPLANATION
    HOW FLAGS ARE DISPLAYED

    on update_all - try request flag images and store them in data.teams
    (try_add_flag_images):
        if there are flag_urls in data.teams,
            request images for these urls and save resulting HTMLImageElements for each team in data.teams
        if there are no flag urls BUT there are
            a) nationality_codes in data.teams
            AND b) get_flag_image_source function in user options,
            then {
                call this function, hopefully get an object of CanvasImageSource type
                save these objects (HTMLImageElements or other CanvasImageSource objects) for each team in data.teams
            }

    in get_permanent_widths,
        check if at least 1 side has a flag_url or nationality_code
        If yes,
            set all_data.nationality_width to some positive value (deduced from options.match_font_size).
            And add this nationality_width to all_data.round_width
        
    in draw_nationality,
        nationality_width (if it's not 0) is in any case reserved for nationality
        1) if there is flag_image for current team, draw flag
        2) if flag not found, try draw nationality_code
        3) if no nationality_code, draw nothing
*/


const is_of_drawable_type = val => {
    return val instanceof HTMLImageElement
        || val instanceof SVGImageElement
        || val instanceof HTMLVideoElement
        || val instanceof HTMLCanvasElement
        || ('ImageBitmap' in window && val instanceof ImageBitmap)
        || ('OffscreenCanvas' in window && val instanceof OffscreenCanvas)
        || ('VideoFrame' in window && val instanceof VideoFrame)
}

const is_firefox_svg_fuckup = (image) => {
    // FF has a bug of not drawing some svgs on canvas:
    // https://stackoverflow.com/a/28692538
    return is_firefox()
        && image.src
        && get_extension_from_filename(image.src) === 'svg'
        && image.height === 0
}

const is_drawable = val => {
    // console.log('fuckup? ', is_firefox_svg_fuckup(val))
    return is_of_drawable_type(val) && !is_firefox_svg_fuckup(val)
}

export const try_add_flag_images = (all_data, options) => {
    const id_to_image_promises = []
    
    Object.entries(all_data.teams).forEach(([team_id, team]) => {
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
                    return { [team_id]: img }
                })
            )
        }
    })

    return Promise.all(id_to_image_promises).then(id_to_image_arr => {
        id_to_image_arr.filter(Boolean).forEach(
            id_to_image => {
                const [ team_id, flag_image ] = Object.entries(id_to_image)[0]
                if (is_drawable(flag_image)) {
                    Object.assign(all_data.teams[team_id], { flag_image })
                }
            }
        )
    })

}