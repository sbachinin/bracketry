const url_to_image_promises = {}

export const get_image_promise_from_url = flag_url => {
    if (url_to_image_promises[flag_url]) {
        return url_to_image_promises[flag_url]
    }

    const promise = new Promise(resolve => {
        let img = new Image
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = flag_url
    })

    url_to_image_promises[flag_url] = promise

    return promise
}