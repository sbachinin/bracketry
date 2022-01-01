let animationInProgress = false

export const run_every_frame = fn => {
    if (animationInProgress) return
    animationInProgress = true

    const step = () => {
        if (!animationInProgress) return
        fn()
        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
}

export const stop_running_every_frame = () => {
    animationInProgress = false
}
