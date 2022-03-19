export const try_get_flag_imgs = flag_urls => {
    const promises = flag_urls.map(url => {
        return new Promise(async resolve => {
            let img = new Image
            img.onload = () => resolve({ [url]: img })
            img.onerror = () => resolve(null)
            img.src = url
        })
    })
    
    return Promise.all(promises).then(arr => {
        // here flatten array of url_to_img objects into one object:
        const obj = {}
        arr.filter(Boolean).forEach(url_to_img => Object.assign(obj, url_to_img))
        return obj
    })
}