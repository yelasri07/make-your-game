import { resetBall, reqAnId , updateBallPosition} from "./ball.js"
import { createBricks } from "./bricks.js"
import { ball, scoreBoard } from "./config.js"
import { updateScoreBoard, x, countDown } from "./scoreBoard.js"

export function gameStart() {
    const gameElement = document.querySelector('.game')
    const startElement = document.querySelector('.start')
    const pauseMenu = document.querySelector('.pause-menu')
    const gameResultMenu = document.querySelector('.game-result-menu')

    gameResultMenu.style.display = 'none'
    pauseMenu.style.display = 'none'
    gameElement.style.opacity = '1'
    startElement.style.display = 'none'
}

export function gameOver(type) {
    const gameResultMenu = document.querySelector('.game-result-menu')
    const gameElement = document.querySelector('.game')
    const gameOutcome = document.querySelector('.game-outcome')
    cancelAnimationFrame(reqAnId)
    clearInterval(x)
    gameResultMenu.style.display = 'flex'
    gameElement.style.opacity = '.6'
    gameOutcome.textContent = `you ${type}`
    ball.isStarted = true
}

export function gameRestart() {
    const bricksElement = document.querySelector('.bricks')
    bricksElement.remove()
    scoreBoard.timer = '05:00'
    scoreBoard.score = 0
    scoreBoard.lives = 3
    scoreBoard.minutes = 4
    scoreBoard.seconds = 60
    updateScoreBoard()
    resetBall()
    createBricks()
    gameStart()
}

export function gamePause() {
    const gameElement = document.querySelector('.game')
    const pauseMenu = document.querySelector('.pause-menu')
    const ballElement = document.querySelector('.ball')
    cancelAnimationFrame(reqAnId)
    clearInterval(x)
    if (pauseMenu.style.display === 'none') {
        gameElement.style.opacity = '.6'
        pauseMenu.style.display = 'flex'
        ball.isStarted = false
    } else if (pauseMenu.style.display === 'flex' && !ball.isStarted) {
        ball.isStarted = true
        gameStart()
        updateBallPosition(ballElement)
        countDown()
    }
}