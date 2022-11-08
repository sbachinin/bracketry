import { throttle_with_trailing } from './utils.mjs'

export const handle_images = (content_area, repaint) => {
    const throttled_repaint = throttle_with_trailing(repaint, 300)

    const repaint_on_image_load = (e) => {
        // listen to any user images (without explicit style.width and height) loaded within content-area and repaint (not too often)
        const path = e.composedPath()
        if (path[0]
            && path[0] instanceof HTMLImageElement
            && path[0].closest(`.playoffs-root .content-area`) === content_area
            && (path[0]?.style.width === '' || path[0]?.style.height === '')
        ) {
            throttled_repaint()
        }
    }

    document.addEventListener('load', repaint_on_image_load, true)

    const try_remove_image = (e) => {
        const path = e.composedPath()
        if (path[0]
            && path[0] instanceof HTMLImageElement
            && path[0].closest(`.playoffs-root .content-area`) === content_area
        ) {
            path[0].remove()
        }
    }

    document.addEventListener('error', try_remove_image, true)

    return () => {
        document.removeEventListener('load', repaint_on_image_load, true)
        document.removeEventListener('error', try_remove_image, true)
    }
}