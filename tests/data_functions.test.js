/**
 * @jest-environment jsdom
 */

 global.ResizeObserver = require('resize-observer-polyfill')
 const { easyPlayoffs } = require('../index.js');
 const finished_ucl = require('./ucl-finished.js').default
 
 const init = () => {
     document.body.innerHTML = ''
     const wrapper = document.createElement('div')
     document.body.append(wrapper)
     return wrapper
 }
 
 
 test('tells all data via getAllData', () => {
     const wrapper = init()
 
     const { getAllData } = easyPlayoffs.createPlayoffs(
         { rounds: [ { id: 'r1', name: 'round 1'} ], matches: [], contestants: {} },
         wrapper,
         {}
     )
    
    //  expect(getAllData()).toMatchObject({ visibleRoundsCount: 2 })
 })
 

// applyFullDataUpdate: (new_data: Data) => void;
//     applyMatchesUpdates: (matches_data: Match[]) => void;
//     getAllData: () => Data;

