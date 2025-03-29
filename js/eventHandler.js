import { updatePaddlePosition, movementState } from './paddle.js';
import { updateBallPosition } from './ball.js';
import { gameStart } from './gameController.js';

export function setupEventListeners() {
    const ballElement = document.querySelector('.ball')
    const paddleElement = document.querySelector('.paddle')
    addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            gameStart()
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
}
