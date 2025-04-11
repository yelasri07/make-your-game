import { createPaddle } from "./js/paddle.js"
import { createBall, updateBallPosition } from "./js/ball.js"
import { createBricks } from "./js/bricks.js"
import { setupEventListeners } from "./js/eventHandler.js"
import { getContainerWidth, ball } from "./js/config.js";

document.addEventListener('DOMContentLoaded', () => {
    getContainerWidth()
    createPaddle()
    createBall()
    createBricks()
    setupEventListeners()    
});
