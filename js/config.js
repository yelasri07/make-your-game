export const containerWidth = 800;
export const containerHeight = 800;
export const paddleWidth = 160;
export const paddleHeight = 20;
export const ballWidth = 20;
export const ballHeight = 20;

export const paddle = {
    x: containerHeight / 2 - paddleWidth / 2,
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
    isStarted : false,
}

export const brick = {
    width: 78,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    row: 1,
    column: 5,
}

export const scoreBoard = {
    timer: '05:00',
    score: 0,
    lives: 3,
    minutes: 4,
    seconds: 60,
}