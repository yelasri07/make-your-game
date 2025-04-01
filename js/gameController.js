import { resetBall, reqAnId } from "./ball.js"
import { ball, scoreBoard } from "./config.js"
import { updateScoreBoard } from "./scoreBoard.js"

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
    gameResultMenu.style.display = 'flex'
    gameElement.style.opacity = '.6'
    gameOutcome.textContent = `you ${type}`
    ball.isStarted = true
}

export function gameRestart() {
    const gameResultMenu = document.querySelector('.game-result-menu')
    gameResultMenu.style.display = 'none'
    scoreBoard.timer = '05:00'
    scoreBoard.score = 0 
    scoreBoard.lives = 3
    updateScoreBoard()
    resetBall()
    gameStart()
}
