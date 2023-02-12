<img src="https://github.com/sbachinin/playoffs/blob/main/images/logo1.png?raw=true" align="right" height="150px">

# [playoffs](https://sbachinin.github.io/playoffs-site) &middot; [![test workflow](https://github.com/sbachinin/playoffs/actions/workflows/main.yml/badge.svg)](https://github.com/sbachinin/playoffs/actions/) [![npm](https://img.shields.io/npm/v/playoffs.svg?style=flat-square)](https://www.npmjs.com/package/playoffs) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/sbachinin/playoffs/blob/main/LICENSE.md)

JavaScript library that takes your data and draws the tree of a knockout tournament in the browser. Suitable (hopefully) for any kind of sport

<br>


![alt text](https://github.com/sbachinin/playoffs/blob/main/images/example.jpg?raw=true)

<br>

## Basic usage

```javascript
import { createPlayoffs } from 'playoffs'

createPlayoffs(your_data, your_wrapper_element)
```

_You only need a wrapper element and some <a href="https://playoffs-js.com/data-shape">properly formatted data</a>_

<br>

## Some lovely features

&nbsp;&nbsp; 🎾 Tennis: doubles, tiebreak, points within a game (15:30 etc), "serving" dot  
&nbsp;&nbsp; 🍏 <a href="https://playoffs-js.com/live-updates">Live updates</a>  
&nbsp;&nbsp; 🔦 Team's path within a tournament is <a href="https://playoffs-js.com/highlight-history">highlighted</a> on click (if you want)  
&nbsp;&nbsp; 👯 Multiple instances of playoffs on a page  
&nbsp;&nbsp; 📱 Can be easily tuned for <a href="https://playoffs-js.com/mobile">mobile</a> devices  
&nbsp;&nbsp; 📺 "<a href="https://playoffs-js.com/fullscreen">Fullscreen</a>" (full browser viewport) mode

<br>

## Plenty of options (<a href="https://playoffs-js.com/options">try</a>)

* Sizes, margins and fonts are quite <a href="https://playoffs-js.com/fonts-colors-sizes">flexible</a>
* Navigation between rounds can be <a href="https://playoffs-js.com/adjust-nav-buttons">adjusted</a> or <a href="https://playoffs-js.com/external-navigation">built from scratch</a>  
* <a href="https://playoffs-js.com/scroll-modes">Vertical scroll</a> can work with mousewheel or buttons or both  
* You can <a href="https://playoffs-js.com/inject-markup">inject</a> your own markup here and there  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you may choose to render matches yourself and use playoffs only as a positioning mechanism
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt text](https://github.com/sbachinin/playoffs/blob/main/images/your-match-element.jpg?raw=true)

* You can attach <a href="https://playoffs-js.com/click-handlers">click handlers</a> to matches (or their sides)  
* It's possible to specify a <a href="https://playoffs-js.com/rounds-count">number of rounds</a> visible at a time

<br>

## Installation: npm or yarn

```bash
npm install playoffs
# or
yarn add playoffs
```

<br>


Minified bundle is 49k, gzipped is 12k.


Includes a __d.ts__ file for ease of TypeScript development

<br>

## Licensing

MIT