import { updatePaddlePosition, movementState } from './paddle.js';
import { ballAnimationId, updateBallPosition } from './ball.js';
import { gamePause, gameRestart, gameStart } from './gameController.js';
import { countDown } from './scoreBoard.js';
import { ball } from './config.js';

export function setupEventListeners() {
    const ballElement = document.querySelector('.ball')
    const paddleElement = document.querySelector('.paddle')
    const restartButton = document.querySelectorAll('.restart-button')
    const continueButton = document.querySelector('.continue-button')
    const pauseMenu = document.querySelector('.pause-menu')
    const gameResultMenu = document.querySelector('.game-result-menu')
    let devlo = document.querySelector('.devlo')

    addEventListener('keydown', (event) => {
        if (event.key === ' ' && !ball.isStarted) {
            gameResultMenu.style.display = 'none'
            pauseMenu.style.display = 'none'
            devlo.style.display = 'none'

            ball.isStarted = true
            ball.isReset = false
            gameStart()
            countDown()
            updateBallPosition(ballElement)
        } else if (ball.isStarted) {
            if (event.key === 'ArrowLeft') {
                movementState.right = false;
                movementState.left = true;
            }

            if (event.key === 'ArrowRight') {
                movementState.left = false;
                movementState.right = true;
            }

            if (!movementState.paddleAnimationId) {
                updatePaddlePosition(paddleElement);
            }
        }

        if (event.key === 'Escape' && ballAnimationId && (devlo.style.display === '' || devlo.style.display === 'none' )) {
            gamePause()
        }

        if (event.key === 'r') {
            if (pauseMenu.style.display === 'flex' || gameResultMenu.style.display === 'flex') {
                gameRestart()
            }
        }
    })

    addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') movementState.left = false;
        if (event.key === 'ArrowRight') movementState.right = false;

        if (!movementState.left && !movementState.right) {
            cancelAnimationFrame(movementState.paddleAnimationId);
            movementState.paddleAnimationId = null;
        }
    })

    restartButton.forEach((element) => {
        element.addEventListener('click', gameRestart)
    })

    continueButton.addEventListener('click', () => {
        if (!ball.isStarted) {
            ball.isStarted = true
            gameResultMenu.style.display = 'none'
            pauseMenu.style.display = 'none'
            gameStart()
            updateBallPosition(ballElement)
            countDown()
        }
    })
    
}

