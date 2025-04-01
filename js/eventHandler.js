import { updatePaddlePosition, movementState } from './paddle.js';
import { updateBallPosition, resetBall } from './ball.js';
import { gameRestart, gameStart } from './gameController.js';
import { countDown } from './scoreBoard.js';

export function setupEventListeners() {
    const ballElement = document.querySelector('.ball')
    const paddleElement = document.querySelector('.paddle')
    const restartButton = document.querySelector('.restart-button')
    addEventListener('keydown', (event) => {
        if (event.key === ' ') {
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
    })

    addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') movementState.left = false;
        if (event.key === 'ArrowRight') movementState.right = false;

        if (!movementState.left && !movementState.right) {
            cancelAnimationFrame(movementState.animationId);
            movementState.animationId = null;
        }
    })

    restartButton.addEventListener('click', () => {
        gameRestart()
    })
}
