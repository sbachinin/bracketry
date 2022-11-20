<img src="https://github.com/sbachinin/playoffs/raw/main/images/logo.png" align="right" height="150px">

# [playoffs](https://sbachinin.github.io/playoffs-site) &middot; [![test workflow](https://github.com/sbachinin/playoffs/actions/workflows/action.yml/badge.svg)](https://github.com/sbachinin/playoffs/actions/) [![npm](https://img.shields.io/npm/v/playoffs.svg?style=flat-square)](https://www.npmjs.com/package/playoffs) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/sbachinin/playoffs/blob/main/LICENSE.md)

JavaScript library that takes your data and draws the tree of a knockout tournament in the browser.  
Suitable (hopefully) for any kind of sport

<br>


![alt text](https://github.com/sbachinin/playoffs/raw/main/images/example.jpg)

<br>

## Basic usage

```javascript
import { createPlayoffs } from 'playoffs'

createPlayoffs(your_data, your_wrapper_element)
```

_You only need a wrapper element and (yes, it's the tricky part) some <a href="https://sbachinin.github.io/playoffs-site/data-shape">properly formatted data</a>_

<br>

## Some lovely features

&nbsp;&nbsp; 🎾 Tennis: doubles, tiebreak, points within a game (15:30 etc), "serving" dot  
&nbsp;&nbsp; 🍏 <a href="https://sbachinin.github.io/playoffs-site/live-updates">Live updates</a> (and special "live" appearance of a match)  
&nbsp;&nbsp; 🔦 Team's path within a tournament is <a href="https://sbachinin.github.io/playoffs-site/highlight-history">highlighted</a> on click (if you want)  
&nbsp;&nbsp; 👯 Multiple instances of playoffs on a page  
&nbsp;&nbsp; 📱 Can be easily tuned for <a href="https://sbachinin.github.io/playoffs-site/mobile">mobile</a> devices  
&nbsp;&nbsp; 📺 "<a href="https://sbachinin.github.io/playoffs-site/fullscreen">Fullscreen</a>" (full browser viewport) mode  
&nbsp;&nbsp; 📜 <a href="https://sbachinin.github.io/playoffs-site/scroll-modes">Vertical scroll</a> can work with mousewheel or buttons or both

<br>

## Plenty of options (<a href="https://sbachinin.github.io/playoffs-site/options">try</a>)

* Sizes, margins and fonts are quite <a href="https://sbachinin.github.io/playoffs-site/fonts-colors-sizes">flexible</a>
* Navigation between rounds can be <a href="https://sbachinin.github.io/playoffs-site/adjust-nav-buttons">adjusted</a> or <a href="https://sbachinin.github.io/playoffs-site/external-navigation">built from scratch</a>  
* You can <a href="https://sbachinin.github.io/playoffs-site/inject-markup">inject</a> your own markup here and there  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you may choose to render matches yourself and use playoffs only as a positioning mechanism
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt text](https://github.com/sbachinin/playoffs/raw/main/images/your-match-element.jpg)

* You can specify what happens when a match (or a side of a match) is <a href="https://sbachinin.github.io/playoffs-site/click-handlers">clicked</a>  
* You may opt to display a specific <a href="https://sbachinin.github.io/playoffs-site/n-rounds">number of rounds</a> at a time

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