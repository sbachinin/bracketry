// formula     http://easings.net/
// description https://stackoverflow.com/questions/8316882/what-is-an-easing-function
// x: percent
// t: current time,
// b: beginning value,
// c: change in value,
// d: duration
function easeInOutQuad(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
}

let fps = 60,
    duration = 0.3 // seconds
    // distance = destinationValue - initialValue,
    // increment = distance / (duration * fps),
    
    
export const animate_with_ease = (initialValue, destinationValue, redraw) => {
    let handler
    let time = 0
    let position = 0
    let start = 0
    let finish = destinationValue - initialValue

    function move() {
        //position += increment;
        time += 1 / fps;
        position = easeInOutQuad(time * 100 / duration, time, start, finish, duration);
    
        if (Math.abs(position) >= Math.abs(finish)) {
            clearInterval(handler);
            redraw(position)
            return;
        }
        redraw(position)
    }
    
    handler = setInterval(move, 1000 / fps);
}


// export const animate_with_easing = (redraw) => {
//     const make_animation_step = () => {
                
//         redraw()
//         requestAnimationFrame(make_animation_step)
//     }
//     requestAnimationFrame(make_animation_step)
// }