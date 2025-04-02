import { resetBall, reqAnId } from "./ball.js"
import { createBricks } from "./bricks.js"
import { ball, scoreBoard } from "./config.js"
import { updateScoreBoard, x } from "./scoreBoard.js"

export function gameStart() {
    const gameElement = document.querySelector('.game')
    const startElement = document.querySelector('.start')
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
    const gameResultMenu = document.querySelector('.game-result-menu')
    const bricksElement = document.querySelector('.bricks')
    bricksElement.remove()
    gameResultMenu.style.display = 'none'
    scoreBoard.timer = '05:00'
    scoreBoard.score = 0 
    scoreBoard.lives = 3
    updateScoreBoard()
    resetBall()
    gameStart()
    createBricks()
}
