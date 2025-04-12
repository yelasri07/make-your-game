import { createPaddle } from "./js/paddle.js"
import { createBall } from "./js/ball.js"
import { createBricks } from "./js/bricks.js"
import { setupEventListeners } from "./js/eventHandler.js"
import { getContainerWidth } from "./js/config.js";

document.addEventListener('DOMContentLoaded', () => {    
    getContainerWidth()
    createPaddle()
    createBall()
    createBricks()
    setupEventListeners()    
});
