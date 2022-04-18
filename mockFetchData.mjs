import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'

window.mockData = data1

export const mockFetchData = () => Promise.resolve(data1)