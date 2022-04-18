import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'
import data3 from './ausopen-2022-mens-singles-finished.mjs'

window.mockData = data3

export const mockFetchData = () => Promise.resolve(data3)