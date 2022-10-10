
# easy-playoffs

<br>

It's a JavaScript library that takes your data and draws the tree (or "draws") of a knockout tournament in the browser:  


![alt text](https://github.com/sbachinin/easy-playoffs/raw/master/images/example.jpg)

<br>

## Basic usage:

```javascript
import { createPlayoffs } from 'easy-playoffs'

createPlayoffs(your_data, your_wrapper_element)
```

_So you only need a wrapper element and (yes, this is the tricky part) some <a href="https://sbachinin.github.io/easy-playoffs-site/data">properly formatted data</a>_


---

<br>
<br>
Tennis doubles are easy:

<br>

![alt text](https://github.com/sbachinin/easy-playoffs/raw/master/images/doubles.jpg)

<br>
<br>
'Live' matches and realtime updates:  

<br>

![alt text](https://github.com/sbachinin/easy-playoffs/raw/master/images/live.jpg)

<br>

---

## Plenty of options (<a href="https://sbachinin.github.io/easy-playoffs-site/options">try</a>)

* Sizes, margins and fonts are quite flexible
* <a href="https://sbachinin.github.io/easy-playoffs-site/navigation">Navigation</a> between rounds can be adjusted or built from scratch  
* You can <a href="https://sbachinin.github.io/easy-playoffs-site/custom-markup">inject</a> your own markup here and there  
  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in fact you may choose to render matches yourself and use easy-playoffs as merely a solution for positioning of the matches:
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![alt text](https://github.com/sbachinin/easy-playoffs/raw/master/images/your-match-element.jpg)

* You can specify what happens when a match (or a side of a match) is clicked  
* You may opt to display a specific <a href="https://sbachinin.github.io/easy-playoffs-site/layout-options">number of rounds</a> at a time
* Can be easily tuned for mobile devices (<a href="https://sbachinin.github.io/easy-playoffs-site/mobile-solutions">how</a>)


<br>

---

## Installation: npm or yarn

```bash
npm install easy-playoffs
# or
yarn add easy-playoffs
```



<br>
<br>


Minified bundle is 49k, gzipped is 12k.


---

MIT licensed