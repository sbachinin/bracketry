export const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${encodeURIComponent(value)}`
    }).join('&')
}