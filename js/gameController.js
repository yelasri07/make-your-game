import { resetBall, reqAnId } from "./ball.js"

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
}

export function gameRestart() {
    const gameResultMenu = document.querySelector('.game-result-menu')
    gameResultMenu.style.display = 'none'
    resetBall()
    gameStart()
}
