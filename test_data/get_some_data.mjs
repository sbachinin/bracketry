import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'
import data3 from './ausopen-2022-mens-singles-finished.mjs'
import data4 from './ausopen-2022-live-mens-doubles.mjs'
import testdata1 from './test-tournament-data-1.mjs'
import emptydata from './empty-tournament-data.mjs'
import { prepareMockData } from './prepareMockData.mjs'

export const get_some_data = () => {
    // return Promise.resolve(testdata1)
    return prepareMockData(data3)
}
