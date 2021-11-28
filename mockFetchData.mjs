import data from './ausopen-dot-com-data-2021.mjs'

window.mockData = data

export const mockFetchData = () => Promise.resolve(data)