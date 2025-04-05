import { updateBricks } from "./bricks.js";
import { updatePaddle } from "./paddle.js";

export let containerWidth = 800;
export const containerHeight = 800;
export const paddleWidth = 160;
export const paddleHeight = 20;
export const ballWidth = 20;
export const ballHeight = 20;

export const paddle = {
    x: ((containerWidth - paddleWidth) / containerWidth) * 100, // (    )
    // x: (containerWidth * (1 - (paddleWidth / 100))) / 2, // (800 * (1 - (20 / 100))) / 2 => (800 * (1 - 0.2)) / 2 = > (640) / 2 => 320
    y: containerHeight - paddleHeight - 5,
    width: paddleWidth,
    height: paddleHeight,
}

export const ball = {
    x: containerWidth / 2 - ballWidth / 2,
    y: paddle.y - ballHeight * 1.2,
    width: ballWidth,
    height: ballHeight,
    dx: 6 * (Math.random() * 2 - 1),
    dy: -5,
    isStarted: false,
}

export const brick = {
    width: ((containerWidth / 6) - 20) - 3,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    row: 1,
    column: 6,
}

export const scoreBoard = {
    timer: '05:00',
    score: 0,
    lives: 3,
    minutes: 4,
    seconds: 60,
}

addEventListener('resize', () => {
    const container = document.querySelector('.container').getBoundingClientRect()
    const paddleElement = document.querySelector('.paddle')
    brick.width = ((container.width / 6) - 20) - 3
    containerWidth = container.width
    updateBricks()
    paddle.x = ((containerWidth - paddleWidth) / containerWidth) * 100
    paddle.y = containerHeight - paddleHeight - 5


    updatePaddle(paddleElement)

    // console.log(paddle.x, paddle.y)
})
