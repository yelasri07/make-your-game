import { resetBall, ballAnimationId, updateBallPosition } from "./ball.js"
import { createBricks } from "./bricks.js"
import { ball, scoreBoard, user } from "./config.js"
import { updateScoreBoard, x, countDown } from "./scoreBoard.js"
import { movementState } from "./paddle.js"
import { Input } from "./input.js"
import { scoreHandling } from "./scoreHandling.js"

export function gameStart() {
    const gameElement = document.querySelector('.game')
    const intro = document.querySelector(".intro");

    gameElement.style.opacity = '1'
    intro.style.display = 'none';
}

export function gameOver(type) {
    const gameResultMenu = document.querySelector('.game-result-menu')
    const victory = document.querySelector('.victory')
    const gameElement = document.querySelector('.game')
    victory.innerHTML = ''
    cancelAnimationFrame(ballAnimationId)
    clearInterval(x)
    gameResultMenu.style.display = 'flex'
    gameElement.style.opacity = '.6'
    if (type === 'win') {
        if (user.firstGame) {
            Input(victory, 'win')
        } else {
            scoreHandling(victory, 'win')
        }
    } else {
        if (user.firstGame) {
            Input(victory, 'lose')
        } else {
            scoreHandling(victory, 'lose')
        }
    }
    ball.isStarted = true
}

export function gameRestart() {
    const bricksElement = document.querySelector('.bricks')
    const pauseMenu = document.querySelector('.pause-menu')
    const gameResultMenu = document.querySelector('.game-result-menu')
    const intro = document.querySelector(".intro");

    gameResultMenu.style.display = 'none'
    pauseMenu.style.display = 'none'
    intro.style.display = 'flex';

    bricksElement.remove()
    scoreBoard.timer = '03:00'
    scoreBoard.score = 0
    scoreBoard.lives = 3
    scoreBoard.minutes = 2
    scoreBoard.seconds = 60
    scoreBoard.ms = 10
    user.from = 0
    updateScoreBoard()
    resetBall()
    createBricks()
}

export function gamePause() {
    const gameElement = document.querySelector('.game')
    const pauseMenu = document.querySelector('.pause-menu')
    const ballElement = document.querySelector('.ball')
    const gameResultMenu = document.querySelector('.game-result-menu')

    cancelAnimationFrame(movementState.paddleAnimationId);
    movementState.paddleAnimationId = null;
    cancelAnimationFrame(ballAnimationId)
    clearInterval(x)

    if (pauseMenu.style.display === 'none' && gameResultMenu.style.display !== 'flex') {
        gameElement.style.opacity = '.6'
        pauseMenu.style.display = 'flex'
        ball.isStarted = false
    } else if (pauseMenu.style.display === 'flex' && !ball.isStarted) {
        ball.isStarted = true
        ball.isReset = false
        gameResultMenu.style.display = 'none'
        pauseMenu.style.display = 'none'
        gameStart()
        updateBallPosition(ballElement)
        countDown()
    }
}