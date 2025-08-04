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
    isReset: true
}

export const brick = {
    width: ((containerWidth / 6) - 20) - 3,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    row: 1,
    column: 1,
}

export const scoreBoard = {
    timer: '03:00',
    score: 0,
    lives: 3,
    minutes: 2,
    seconds: 60,
    ms: 10,
}
export const user = {
    username: "",
    firstGame: true,
    classment: 0,
    from: 0,
    page:0
}

addEventListener('resize', () => {
    const container = document.querySelector('.container');
    const paddleElement = document.querySelector('.paddle');
    const ballElement = document.querySelector('.ball');
    const containerBoundingWidth = container.getBoundingClientRect().width
    const containerBoundingHeight = container.getBoundingClientRect().height

    const paddlePercentX = (paddle.x / containerWidth) * 100;
    const paddlePercentWidth = (paddle.width / containerWidth) * 100;
    const paddlePercentHeight = (paddle.height / containerWidth) * 100;
    const ballPercentX = (ball.x / containerWidth) * 100
    const ballPercentWidth = (ball.width / containerWidth) * 100;

    brick.width = ((containerBoundingWidth / brick.column) - brick.offSetLeft) - 3;
    containerWidth = containerBoundingWidth;
    containerHeight = containerBoundingHeight

    paddle.x = (paddlePercentX / 100) * containerWidth;
    paddle.y = containerHeight - paddleHeight - 5
    paddle.width = (paddlePercentWidth / 100) * containerWidth;
    paddle.height = (paddlePercentHeight / 100) * containerWidth;
    ball.x = (ballPercentX / 100) * containerWidth
    ball.width = (ballPercentWidth / 100) * containerWidth;
    ball.height = ball.width
    paddle.y = containerHeight - ball.height - 5
    if (ball.isReset) {
        ball.y = paddle.y - ball.height * 1.2
    }

    if (paddle.x <= 0) {
        paddle.x = 0
    }

    if (paddle.x + paddle.width >= containerWidth) {
        paddle.x = containerWidth - paddle.width
    }

    updatePaddle(paddleElement)
    updateBall(ballElement)
    updateBricks()
})

export function getContainerWidth() {
    const container = document.querySelector('.container').getBoundingClientRect();
    containerWidth = container.width;
    containerHeight = container.height
    const desiredPercentWidthPaddle = 20;
    const desiredPercentHeightPaddle = 2.5
    const desiredPercentWidthBall = 2.5;

    const newPaddleWidth = (desiredPercentWidthPaddle / 100) * containerWidth;
    const newPaddleHeight = (desiredPercentHeightPaddle / 100) * containerWidth
    paddle.width = Math.min(newPaddleWidth, 160);
    paddle.height = Math.min(newPaddleHeight, 20);

    paddle.x = containerWidth / 2 - paddle.width / 2;
    paddle.y = containerHeight - paddle.height - 5

    const newBallWidth = (desiredPercentWidthBall / 100) * containerWidth;
    ball.width = Math.min(newBallWidth, 20);
    ball.height = ball.width;
    ball.x = containerWidth / 2 - ball.width / 2
    ball.y = ball.y = paddle.y - ball.height * 1.2

    brick.width = ((container.width / brick.column) - brick.offSetLeft) - 3;
}
