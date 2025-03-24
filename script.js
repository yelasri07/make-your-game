let containerWidth = 800;
let containerHeight = 800;
let paddleWidth = 160;
let paddleHeight = 20;
let paddle = {
    x: containerHeight / 2 - paddleWidth / 2,
    y: containerHeight - paddleHeight - 10,
    width: paddleWidth,
    height: paddleHeight,
}

addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.width = containerWidth + 'px'
    container.style.height = containerHeight + 'px'
    const paddleDiv = createPaddle(container)
    addEventListener('keydown', (event) => {
        movePaddle(event, paddleDiv)
    })
})

function createPaddle(container) {
    const paddleDiv = document.createElement('div')
    paddleDiv.className = 'paddle'
    paddleDiv.style.cssText = `
        width: ${paddle.width}px;
        height: ${paddle.height}px;
        transform: translate(${paddle.x}px, ${paddle.y}px);
    `
    container.append(paddleDiv)

    return paddleDiv
}

function movePaddle(event, paddleDiv) {
    if (event.key === 'ArrowLeft') {
        console.log(event.key)
    }

    if (event.key === 'ArrowRight') {
        console.log(event.key)
    }
}