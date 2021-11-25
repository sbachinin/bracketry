export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');
        data.forEach((item, index) => {
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(10, 60 * index, 50, 50);
        })
    }
}