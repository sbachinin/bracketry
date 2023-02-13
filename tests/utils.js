"use strict";

const { createBracket } = require('../dist/cjs/index.js')

const deep_clone_object = obj => {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    let temp = new obj.constructor()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deep_clone_object(obj[key])
        }
    }
    return temp
}

const create_wrapper = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}

const init = (data, options) => {
    const wrapper = create_wrapper()
    return {
        bracket: createBracket(data, wrapper, options),
        wrapper
    }
}


exports.deep_clone_object = deep_clone_object
exports.create_wrapper = create_wrapper
exports.init = init