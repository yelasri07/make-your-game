import { resetBall, ballAnimationId, updateBallPosition } from "./ball.js"
import { createBricks } from "./bricks.js"
import { ball, scoreBoard } from "./config.js"
import { updateScoreBoard, x, countDown } from "./scoreBoard.js"
import { movementState } from "./paddle.js"

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
    const victory = document.querySelector('.victory')
    const gameElement = document.querySelector('.game')
    cancelAnimationFrame(ballAnimationId)
    clearInterval(x)
    gameResultMenu.style.display = 'flex'
    gameElement.style.opacity = '.6'
    if (type === 'win') {
        victory.innerHTML = /*html*/`
        <h3>🫡 Mission accomplished, Soldier!</h3>
        <p>🎯 You’ve shattered every brick with sniper precision.
            ❤️ You kept all your lives safe — not a single mistake.
            🇲🇦 The Moroccan snipers salute you.
            🐗 You are now a HOG – Hunter of Gunmen.
            🏆 Welcome to the elite.</p>

        <img src="images/ta7iyatL3alam.png" alt="solider">
    `
    } else {
        victory.innerHTML = /*html*/`
        <h3>☠️ Mission failed, Soldier...</h3>
        <p>💔 You lost your lives before the job was done.
        Precision requires discipline, and today... you fell short.
        🔄 But a real sniper never gives up.
        ⚔️ Return to training. Try again. And come back stronger.</p>

        <img src="images/ta7iyatL3alam.png" alt="solider">
    `
    }
    ball.isStarted = true
}

export function gameRestart() {
    const bricksElement = document.querySelector('.bricks')
    bricksElement.remove()
    scoreBoard.timer = '03:00'
    scoreBoard.score = 0
    scoreBoard.lives = 3
    scoreBoard.minutes = 2
    scoreBoard.seconds = 60
    scoreBoard.ms = 10
    updateScoreBoard()
    resetBall()
    createBricks()
    gameStart()
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
        gameStart()
        updateBallPosition(ballElement)
        countDown()
    }
}