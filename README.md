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

_You only need a wrapper element and (yes, this is the tricky part) some <a href="https://sbachinin.github.io/playoffs-site/data">properly formatted data</a>_

<br>

## Some lovely features

[//]: # TODO add links to site here  
&nbsp;&nbsp; 🎾 Tennis: doubles, tiebreak, points within a game (15:30 etc), "serving" dot  
&nbsp;&nbsp; 🍏 live updates (and special "live" appearance of a match)  
&nbsp;&nbsp; 🔦 Team's path within a tournament is highlighted on click (if you want)  
&nbsp;&nbsp; 👯 Multiple instances of playoffs on a page  
&nbsp;&nbsp; 📱 Can be easily tuned for mobile devices (<a href="https://sbachinin.github.io/playoffs-site/mobile-solutions">how</a>)  
&nbsp;&nbsp; 📺 "Fullscreen" (full browser viewport) mode  

<br>

## Plenty of options (<a href="https://sbachinin.github.io/playoffs-site/options">try</a>)

* Sizes, margins and fonts are quite flexible
* <a href="https://sbachinin.github.io/playoffs-site/navigation">Navigation</a> between rounds can be adjusted or built from scratch  
* You can <a href="https://sbachinin.github.io/playoffs-site/custom-markup">inject</a> your own markup here and there  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you may choose to render matches yourself and use playoffs to position the matches and rounds
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt text](https://github.com/sbachinin/playoffs/raw/main/images/your-match-element.jpg)

* You can specify what happens when a match (or a side of a match) is clicked  
* You may opt to display a specific <a href="https://sbachinin.github.io/playoffs-site/layout-options">number of rounds</a> at a time

<br>

## Installation: npm or yarn

```bash
npm install playoffs
# or
yarn add playoffs
```

<br>

---

Minified bundle is 48k, gzipped is 12k.

---

Includes a __d.ts__ file for ease of TypeScript development

---
<br>

## Licensing

MIT