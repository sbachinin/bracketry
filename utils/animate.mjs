let animationInProgress = false

export const startAnimation = fn => {
    if (animationInProgress) return
    animationInProgress = true

    const step = () => {
        if (!animationInProgress) return
        fn()
        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
}

export const stopAnimation = () => {
    animationInProgress = false
}
