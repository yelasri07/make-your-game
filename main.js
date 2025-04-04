import { createPaddle } from "./js/paddle.js"
import { createBall, updateBallPosition } from "./js/ball.js"
import { createBricks } from "./js/bricks.js"
import { setupEventListeners } from "./js/eventHandler.js"

document.addEventListener('DOMContentLoaded', () => {
    createPaddle()
    createBall()
    createBricks()
    setupEventListeners()

    
});

// just for test the ball
// addEventListener('keydown', (e) => {
//     let ballElement = document.querySelector('.ball')
//     if (e.key === 'z') {
//         ball.y -= 5
//     } 
//     if (e.key === 's') {
//         ball.y += 5
//     } 
//     if (e.key === 'd') {
//         ball.x += 5
//     } 
//     if (e.key === 'q') {
//         ball.x -= 5
//     } 
    
//     ballElement.style.cssText += `
//     transform: translate(${ball.x}px, ${ball.y}px);
//     `
// })