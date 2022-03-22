
export const get_flag_image_source = `If you want flags to be drawn next to team titles, it will require some effort on your side.

options.get_flag_image_source function is one of two solutions for that.

It's a JavaScript function that translates nationality codes to images.

This function accepts one parameter - nationality_code (string like 'US').

You have to provide nationality_code in your data
    (every 'side' of every 'match' must contain 'nationality_code' property to make this mechanism work)

get_flag_image_source must return a Promise that contains a CanvasImageSource object
    (https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource).

EXAMPLE:

1) your data: [
        {
                name: '1st Round',
                matches: [
                        ...,
                        {
                                id: '160656',
                                sides: [
                                        {
                                                ...,
                                                nationality_code: 'US'
                                        }
                                ]
                        }
                ]
        }
]

2) your options: {
    ...,
    get_flag_image_source: nationality_code => {
        return new Promise(resolve => {
            let img = new Image
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = \`https://purecatamphetamine.github.io/country-flag-icons/3x2/\${nationality_code}.svg\`
        })
    }
}`