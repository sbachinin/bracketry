import { get_options_flattened_meta } from './options_meta_getter.mjs'
import { deep_clone_object } from '../utils/utils.mjs'
import { shout_impossible_option_value } from './validate_user_options.mjs'



const get_final_value = (name, user_options, flattened_meta) => {
    const option_meta = flattened_meta[name]
    if (!option_meta) {
        console.warn('options.get_final_value called with a non-existent option name: ', name)
        return
    }

    let result = option_meta.default_value

    const user_value = user_options[name]

    if (user_value !== undefined) {
        switch(option_meta.type) {

            case 'pixels': {
                if (typeof user_value === 'number') {
                    result = user_value
                    if (typeof option_meta.min_value === 'number') {
                        result = Math.max(result, option_meta.min_value)
                    }
                } else {
                    shout_impossible_option_value(name, user_value)
                }
                break
            }


            case 'multiline_string':
            case 'string': {
                if (typeof user_value === 'string') {
                    result = user_value
                } else {
                    shout_impossible_option_value(name, user_value)
                }
                break
            }


            case 'function_or_null': {
                if (typeof user_value === 'function' || user_value === null) {
                    result = user_value
                } else {
                    shout_impossible_option_value(name, user_value)
                }                    
                break
            }
    

            case 'boolean': {
                if (typeof user_value === 'boolean') {
                    result = user_value
                } else if (user_value === 'false') {
                    result = false
                } else if (user_value === 'true') {
                    result = true
                } else {
                    shout_impossible_option_value(name, user_value)
                }
                break
            }
            

            case 'select': {
                if (option_meta.options.find(o => is_object(o) ? (o.value === user_value) : (o === user_value))) {
                    result = user_value
                } else {
                    shout_impossible_option_value(name, user_value)
                }
                break
            }
        }
    }
    

    if (
        option_meta.type === 'pixels'
        && get_final_value('applyDevicePixelRatio', user_options, flattened_meta)
    ) {
        result *= devicePixelRatio
    }

    return result
}




export const create_options_dealer = () => {
    let user_options = {}
    const flattened_meta = get_options_flattened_meta()

    return {
        update_user_options: (new_user_options) => {
            user_options = { ...user_options, ...deep_clone_object(new_user_options) }
        },

        get_final_value: (name) => get_final_value(name, user_options, flattened_meta),
        
        get_user_options: () => user_options
    }
}