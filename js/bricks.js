import { brick, ball } from './config.js'

const bricks = []

export function breakBrick() {
    for (let i = 0; i < brick.row; i++) {
        for (let j = 0; j < brick.column; j++) {
            let b = bricks[i][j]
            if (b.status) {
                if (ball.x + ball.width >= b.x && ball.x <= b.x + brick.width
                    && ball.y + ball.height >= b.y && ball.y <= b.y + brick.height
                ) {
                    b.status = false
                    ball.dy = - ball.dy
                }
            }
        }
    }

    updateBricks()
}

export function createBricks() {
    for (let i = 0; i < brick.row; i++) {
        bricks[i] = [];
        for (let j = 0; j < brick.column; j++) {
            bricks[i][j] = {
                x: j * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: i * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true,
            }
        }
    }

    const container = document.querySelector('.container')
    const bricksElements = document.createElement('div')
    bricksElements.className = 'bricks'
    container.append(bricksElements)
    updateBricks()
}

function updateBricks() {
    const bricksElements = document.querySelector('.bricks')
    bricksElements.innerHTML = ''
    for (let i = 0; i < brick.row; i++) {
        for (let j = 0; j < brick.column; j++) {
            if (bricks[i][j].status) {
                const brickElement = document.createElement('div')
                brickElement.className = 'brick'
                brickElement.style.cssText = `
                width: ${brick.width}px;
                height: ${brick.height}px;
                transform: translate(${bricks[i][j].x}px, ${bricks[i][j].y}px);
            `
                bricksElements.append(brickElement)
            }
        }
    }
}