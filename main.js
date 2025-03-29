import { createPaddle } from "./js/paddle.js"
import { createBall } from "./js/ball.js"
import { createBricks } from "./js/bricks.js"
import { setupEventListeners } from "./js/eventHandler.js"

document.addEventListener('DOMContentLoaded', () => {
    createPaddle()
    createBall()
    createBricks()
    setupEventListeners()
});
