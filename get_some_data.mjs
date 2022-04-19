import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'
import data3 from './ausopen-2022-mens-singles-finished.mjs'
import data4 from './test-tournament-data-1.mjs'
import { prepareMockData } from './prepareMockData.mjs'

export const get_some_data = () => {
    // return Promise.resolve(data4)
    return prepareMockData(data2)
}
