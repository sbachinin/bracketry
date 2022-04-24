import { get_default_options } from './get_default_options.mjs'

const warn = (option_name, option_value) => {
    console.warn(
        `Impossible value %c${JSON.stringify(option_value, null, 2)}%c provided for ${option_name} option.`
        + ` Default value of %c${get_default_options()[option_name]}%c will be used instead`,
        'background: pink',
        '',
        'background: #c7ffc9',
        ''
    )
}

