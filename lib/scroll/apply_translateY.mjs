export const apply_translateY = (matches_positioner, offset) => {

    // Whatever property holds translateY, change it.
    // Default is transform. I.e., if none was set, it will become transform. (Because on mobiles there is no swap)
    const should_apply_as_transform = matches_positioner.style.margin === ''

    if (should_apply_as_transform) {
        matches_positioner.style.transform = `translate3d(0, -${Math.floor(offset)}px, 0)`
    } else {
        matches_positioner.style.marginTop = `-${Math.floor(offset)}px`
    }
}


export const swap_translateY_to_margin = matches_positioner => {
    const translateY = matches_positioner.style.transform.match(/translate3d\(\s*[^,]+,\s*([^,]+),\s*[^)]+\)/)?.[1]
    matches_positioner.style.marginTop = translateY
    matches_positioner.style.transform = ''
}

export const swap_translateY_to_transform = matches_positioner => {
    matches_positioner.style.transform = `translate3d(0, ${matches_positioner.style.marginTop}, 0)`
    matches_positioner.style.marginTop = ''
}

