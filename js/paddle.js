import { paddle, containerWidth } from './config.js'

export const movementState = {
    left: false,
    right: false,
    paddleAnimationId: null
}

export function updatePaddlePosition(paddleElement) {
    movementState.paddleAnimationId = requestAnimationFrame(() => {
        updatePaddlePosition(paddleElement)
    })

    if (movementState.left && paddle.x > 0) {
        paddle.x -= 5
    }

    if (movementState.right && paddle.x + paddle.width < containerWidth) {
        paddle.x += 5
    }

    if (paddle.x <= 0) {
        paddle.x = 0
    }

    if (paddle.x + paddle.width >= containerWidth) {
        paddle.x = containerWidth - paddle.width
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
    paddleElement.style.cssText = /*style*/`
        width: ${paddle.width}px;
        height: ${paddle.height}px;
        transform: translate(${paddle.x}px, ${paddle.y}px);
    `
}