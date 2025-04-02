import { updatePaddlePosition, movementState } from './paddle.js';
import { updateBallPosition } from './ball.js';
import { gamePause, gameRestart, gameStart } from './gameController.js';
import { countDown } from './scoreBoard.js';
import { ball } from './config.js';

export function setupEventListeners() {
    const ballElement = document.querySelector('.ball')
    const paddleElement = document.querySelector('.paddle')
    const restartButton = document.querySelectorAll('.restart-button')
    const continueButton = document.querySelector('.continue-button')
    const pauseBtn = document.querySelector('.pause-btn')

    addEventListener('keydown', (event) => {
        if (event.key === ' ' && !ball.isStarted) {
            ball.isStarted = true
            pauseBtn.style.display = 'block'
            gameStart()
            countDown()
            updateBallPosition(ballElement)
        } else {
            if (event.key === 'ArrowLeft') {
                movementState.right = false;
                movementState.left = true;
            }

            if (event.key === 'ArrowRight') {
                movementState.left = false;
                movementState.right = true;
            }

            if (!movementState.animationId) {
                updatePaddlePosition(paddleElement);
            }
        }

        if (event.key === 'Escape') {
            gamePause()
        }
    })

    addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') movementState.left = false;
        if (event.key === 'ArrowRight') movementState.right = false;

        if (!movementState.left && !movementState.right) {
            cancelAnimationFrame(movementState.animationId);
            movementState.animationId = null;
        }
    })

    restartButton.forEach((element) => {
        element.addEventListener('click', gameRestart)
    })

    pauseBtn.addEventListener('click', gamePause)

    continueButton.addEventListener('click', () => {
        if (!ball.isStarted) {
            ball.isStarted = true
            gameStart()
            updateBallPosition(ballElement)
            countDown()
        }
    })
}
