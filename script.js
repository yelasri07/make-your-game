let containerWidth = 800;
let containerHeight = 800;
let paddleWidth = 160;
let paddleHeight = 20;
let paddle = {
    x: containerHeight / 2 - paddleWidth / 2,
    y: containerHeight - paddleHeight - 10
}

addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.width = containerWidth + 'px'
    container.style.height = containerHeight + 'px'
    createPaddle(container)
})

function createPaddle(container) {
    const paddleDiv = document.createElement('div')
    paddleDiv.className = 'paddle'
    paddleDiv.style.cssText = `
        width: ${paddleWidth}px;
        height: ${paddleHeight}px;
        transform: translate(${paddle.x}px, ${paddle.y}px);
    `
    container.append(paddleDiv)
}