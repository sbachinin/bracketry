export const drawBrackets = (data, canvasEl) => {
    console.log(data)
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');
        // data.forEach((item, index) => {
        //     ctx.fillStyle = 'rgb(200, 0, 0)';
        //     ctx.fillRect(10, canvasEl.height / data.length * index, 5, 5);
        // })
    }
}