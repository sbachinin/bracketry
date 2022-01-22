export const create_root_el = root_id => {
    const root_brackets_el = document.createElement('div')
    root_brackets_el.className = root_id + ' root_brackets_el'
    root_brackets_el.style.overflow = 'hidden'
    root_brackets_el.style.width = '100%'
    root_brackets_el.style.position = 'relative'
    root_brackets_el.style.resize = 'both'
    return root_brackets_el
}