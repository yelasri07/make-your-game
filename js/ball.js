import { ball, paddle, containerWidth, containerHeight, ballWidth, ballHeight, paddleHeight, paddleWidth, scoreBoard } from './config.js';
import { breakBrick } from './bricks.js';
import { updateScoreBoard, x } from './scoreBoard.js';
import { updatePaddle } from './paddle.js';

export let reqAnId

export function updateBallPosition(ballElement) {
    reqAnId = requestAnimationFrame(() => {
        updateBallPosition(ballElement)
    })

    if (ball.x + ball.width >= containerWidth || ball.x <= 0) {
        ball.dx = -ball.dx
    }

    if (ball.y <= 0) {
        ball.dy = -ball.dy
    }   

    if (ball.y + ball.height >= paddle.y && ball.x + ball.width >= paddle.x && ball.x <= paddle.x + paddle.width) {
        let collidePoint = ball.x - (paddle.x + paddle.width / 2)
        collidePoint = collidePoint / (paddle.width / 2)
        let angle = collidePoint * (Math.PI / 3)
        ball.dx = 6 * Math.sin(angle)
        ball.dy = -(6 * Math.cos(angle))
    } else if (ball.y + ball.height >= containerHeight) {
        scoreBoard.lives--
        resetBall()
        updateScoreBoard()
        return
    }

    ball.x += ball.dx
    ball.y += ball.dy

    updateBall(ballElement)

    breakBrick()
}

export function createBall() {
    const gameElement = document.querySelector('.game')
    const ballElement = document.createElement('div')
    ballElement.className = 'ball'
    updateBall(ballElement)
    gameElement.append(ballElement)
}

function updateBall(ballElement) {
    ballElement.style.cssText = `
        width: ${ball.width}px;
        height: ${ball.height}px;
        transform: translate(${ball.x}px, ${ball.y}px);
`
}

export function resetBall() {
    cancelAnimationFrame(reqAnId)
    clearInterval(x)
    ball.x = containerWidth / 2 - ballWidth / 2;
    ball.y = paddle.y - ballHeight * 1.2;
    ball.dx = 6 * (Math.random() * 2 - 1);
    ball.dy = -5;
    paddle.x = containerHeight / 2 - paddleWidth / 2
    paddle.y = containerHeight - paddleHeight - 5
    const paddleElement = document.querySelector('.paddle')
    const ballElement = document.querySelector('.ball')
    updatePaddle(paddleElement)
    updateBall(ballElement)
    ball.isStarted = false
}