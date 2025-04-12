import {
  ball,
  paddle,
  containerWidth,
  containerHeight,
  scoreBoard,
} from "./config.js";
import { breakBrick } from "./bricks.js";
import { updateScoreBoard, x } from "./scoreBoard.js";
import { movementState, updatePaddle } from "./paddle.js";
import { LifeLost, PaddleHit, Wall } from "./sounds.js";

export let ballAnimationId;

export function updateBallPosition(ballElement) {
  ballAnimationId = requestAnimationFrame(() => {
    updateBallPosition(ballElement);
  });

  if (ball.x + ball.width >= containerWidth) {
    Wall();
    ball.dx = -Math.abs(ball.dx);
  }

  if (ball.x <= 0) {
    Wall();
    ball.dx = Math.abs(ball.dx);
  }

  if (ball.y <= 0) {
    Wall();
    ball.dy = -ball.dy;
  }

  if (ball.y + ball.height >= containerHeight) {
    LifeLost();
    scoreBoard.lives--;
    resetBall();
    updateScoreBoard();
    return;
  } else if (
    ball.y + ball.height >= paddle.y &&
    ball.x + ball.width >= paddle.x &&
    ball.x <= paddle.x + paddle.width
  ) {
    PaddleHit();
    let collidePoint = ball.x - (paddle.x + paddle.width / 2); // px value
    collidePoint = collidePoint / (paddle.width / 2); // -1 > value > 1
    let angle = collidePoint * (Math.PI / 3); // angle b radian
    ball.dx = 6 * Math.sin(angle);
    ball.dy = -(6 * Math.cos(angle));
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  updateBall(ballElement);
  breakBrick();
}

export function createBall() {
  const gameElement = document.querySelector(".game");
  const ballElement = document.createElement("div");
  ballElement.className = "ball";
  updateBall(ballElement);
  gameElement.append(ballElement);
}

export function updateBall(ballElement) {
  ballElement.style.cssText = /*style*/ `
        width: ${ball.width}px;
        height: ${ball.height}px;
        transform: translate(${ball.x}px, ${ball.y}px);
`;
}

export function resetBall() {
  cancelAnimationFrame(ballAnimationId);
  cancelAnimationFrame(movementState.paddleAnimationId);
  clearInterval(x);
  ball.x = containerWidth / 2 - ball.width / 2;
  ball.y = paddle.y - ball.height * 1.2;
  ball.dx = 6 * (Math.random() * 2 - 1);
  ball.dy = -5;
  paddle.x = containerWidth / 2 - paddle.width / 2;
  paddle.y = containerHeight - paddle.height - 5;
  const paddleElement = document.querySelector(".paddle");
  const ballElement = document.querySelector(".ball");
  updatePaddle(paddleElement);
  updateBall(ballElement);
  ball.isStarted = false;
  ball.isReset = true;
}
