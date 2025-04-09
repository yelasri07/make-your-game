import { updateBall } from "./ball.js";
import { updateBricks } from "./bricks.js";
import { updatePaddle } from "./paddle.js";


export let containerWidth = 800;
export let containerHeight = 800;
export const paddleWidth = 160;
export const paddleHeight = 20;
export const ballWidth = 20;
export const ballHeight = 20;

export const paddle = {
    x: containerWidth / 2 - paddleWidth / 2,
    y: containerHeight - paddleHeight - 5,
    width: 160,
    height: 20,
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
    const container = document.querySelector('.container');
    const paddleElement = document.querySelector('.paddle');
    const ballElement = document.querySelector('.ball');
    const containerBoundingWidth = container.getBoundingClientRect().width
    const containerBoundingHeight = container.getBoundingClientRect().height

    const paddlePercentX = (paddle.x / containerWidth) * 100;
    const paddlePercentWidth = (paddle.width / containerWidth) * 100;
    const ballPercentX = (ball.x / containerWidth) * 100
    brick.width = ((containerBoundingWidth / 6) - 20) - 3;
    containerWidth = containerBoundingWidth;
    containerHeight = containerBoundingHeight

    
    paddle.x = (paddlePercentX / 100) * containerWidth;
    paddle.y = containerHeight - paddleHeight - 5
    paddle.width = (paddlePercentWidth / 100) * containerWidth;
    ball.x = (ballPercentX / 100) * containerWidth
    
    updatePaddle(paddleElement)
    updateBall(ballElement)
    updateBricks();
})

export function getContainerWidth() {
    const container = document.querySelector('.container').getBoundingClientRect();
    containerWidth = container.width;
    containerHeight = container.height
    const desiredPercentWidth = 20;
    const newPaddleWidth = (desiredPercentWidth / 100) * containerWidth;
    paddle.width = Math.min(newPaddleWidth, 160);
    paddle.x = containerWidth / 2 - paddle.width / 2;
    paddle.y = containerHeight - paddleHeight - 5
    ball.x = containerWidth / 2 - ballWidth / 2
    ball.y = paddle.y - ballHeight * 1.2
    brick.width = ((container.width / 6) - 20) - 3;
}
