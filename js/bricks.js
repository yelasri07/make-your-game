import { brick, ball, scoreBoard } from "./config.js";
import { gameOver } from "./gameController.js";
import { updateScoreBoard } from "./scoreBoard.js";
import { BrickHit, Win } from "./sounds.js";

const bricks = [];

export function breakBrick() {
  for (let i = 0; i < brick.row; i++) {
    for (let j = 0; j < brick.column; j++) {
      let b = bricks[i][j];
      if (b.status) {
        if (
          ball.x + ball.width >= b.x &&
          ball.x <= b.x + brick.width &&
          ball.y + ball.height >= b.y &&
          ball.y <= b.y + brick.height
        ) {
            BrickHit()
          let brickElement = document.getElementById(b.id);
          b.status = false;
          scoreBoard.score += 100;
          updateScoreBoard();
          ball.dy = -ball.dy;
          brickElement.remove();
        }
      }
    }
  }

  const bricksElements = document.querySelector(".bricks");

  if (bricksElements.childNodes.length === 0) {
    Win();
    gameOver("win");
  }
}

export function createBricks() {
  const bricksElements = document.createElement("div");
  bricksElements.className = "bricks";
  let idIncrement = 0;

  for (let i = 0; i < brick.row; i++) {
    bricks[i] = [];
    for (let j = 0; j < brick.column; j++) {
      idIncrement++;
      bricks[i][j] = {
        x: j * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          i * (brick.offSetTop + brick.height) +
          brick.offSetTop +
          brick.marginTop,
        status: true,
        id: idIncrement,
      };

      const brickElement = document.createElement("div");
      brickElement.className = "brick";
      brickElement.id = idIncrement;
      brickElement.style.cssText = /*style*/ `
                width: ${brick.width}px;
                height: ${brick.height}px;
                transform: translate(${bricks[i][j].x}px, ${bricks[i][j].y}px);
            `;

      bricksElements.append(brickElement);
    }
  }

  const gameElement = document.querySelector(".game");
  gameElement.append(bricksElements);
}

export function updateBricks() {
  for (let i = 0; i < brick.row; i++) {
    for (let j = 0; j < brick.column; j++) {
      let b = bricks[i][j];
      if (b.status) {
        let brickElement = document.getElementById(b.id);
        (b.x = j * (brick.offSetLeft + brick.width) + brick.offSetLeft),
          (b.y =
            i * (brick.offSetTop + brick.height) +
            brick.offSetTop +
            brick.marginTop),
          (brickElement.style.cssText += /*style*/ `
                width: ${brick.width}px;
                transform: translate(${b.x}px, ${b.y}px);
            `);
      }
    }
  }
}
