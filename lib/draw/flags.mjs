const failed_img_srcs = []

export const add_flags_listeners = round_el => {
    round_el.querySelectorAll('img.player-flag').forEach(image => {
        image.addEventListener('error', on_image_err)
        image.addEventListener('load', on_image_load)
    })
}

export const get_failed_img_srcs = () => [ ...failed_img_srcs ]

function on_image_err() {
    if (!failed_img_srcs.includes(this.src)) {
        failed_img_srcs.push(this.src)
    }
    this.removeEventListener('error', on_image_err)
    this.removeEventListener('load', on_image_load)
    this.remove()
}

function on_image_load() {
    this.removeEventListener('error', on_image_err)
    this.removeEventListener('load', on_image_load)
}