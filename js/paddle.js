import {paddle, containerWidth} from './config.js'

export const movementState = {
    left: false,
    right: false,
    animationId: null
}

export function updatePaddlePosition(paddleElement) {
    movementState.animationId = requestAnimationFrame(() => {
        updatePaddlePosition(paddleElement)
    })

    if (movementState.left && paddle.x > 0) {
        paddle.x -= 5
    }

    if (movementState.right && paddle.x + paddle.width < containerWidth) {
        paddle.x += 5
    }

    updatePaddle(paddleElement)
}

export function createPaddle() {
    const gameElement = document.querySelector('.game')
    const paddleElement = document.createElement('div')
    paddleElement.className = 'paddle'
    updatePaddle(paddleElement)
    gameElement.append(paddleElement)
}

export function updatePaddle(paddleElement) {
    paddleElement.style.cssText = `
        width: ${paddle.width}px;
        height: ${paddle.height}px;
        transform: translate(${paddle.x}px, ${paddle.y}px);
    `
}