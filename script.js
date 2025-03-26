let containerWidth = 800;
let containerHeight = 800;
let paddleWidth = 160;
let paddleHeight = 20;
let ballWidth = 20;
let ballHeight = 20
let paddle = {
    x: containerHeight / 2 - paddleWidth / 2,
    y: containerHeight - paddleHeight - 5,
    width: paddleWidth,
    height: paddleHeight,
}

let ball = {
    x: containerWidth / 2 - ballWidth / 2,
    y: paddle.y - ballHeight * 1.2,
    width: ballWidth,
    height: ballHeight,
    dx: 6 *  (Math.random() * 2 - 1),
    dy: -5,
}

let life = 3;
let left = false
let right = false
let animationId
addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.style.width = containerWidth + 'px'
    container.style.height = containerHeight + 'px'
    const paddleDiv = createPaddle(container)

    const ballDiv = createBall(container)
    addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            moveBall(event, ballDiv)
        } else {
            if (event.key === 'ArrowLeft') {
                right = false;
                left = true;
            }

            if (event.key === 'ArrowRight') {
                left = false;
                right = true;
            }

            if (!animationId) {
                movePaddle(paddleDiv);
            }
        }
    })

    addEventListener('keyup', (event) => {
        if (event.key === 'ArrowLeft') left = false;
        if (event.key === 'ArrowRight') right = false;

        if (!left && !right) {
            cancelAnimationFrame(animationId);
            animationId = undefined;
        }
    })
})

function createPaddle(container) {
    const paddleDiv = document.createElement('div')
    paddleDiv.className = 'paddle'
    paddleStyle(paddleDiv)
    container.append(paddleDiv)

    return paddleDiv
}

function createBall(container) {
    const ballDiv = document.createElement('div')
    ballDiv.className = 'ball'
    ballStyle(ballDiv)
    container.append(ballDiv)

    return ballDiv
}

function movePaddle(paddleDiv) {
    animationId = requestAnimationFrame(() => {
        movePaddle(paddleDiv)
    })

    if (left && paddle.x > 0 && left) {
        paddle.x -= 10
    }

    if (right && paddle.x + paddle.width < containerWidth && right) {
        paddle.x += 10
    }

    paddleStyle(paddleDiv)
}

function moveBall(event, ballDiv) {
    let reqAnId = requestAnimationFrame(() => {
        moveBall(event, ballDiv)
    })

    if (ball.x + ball.width >= containerWidth || ball.x <= 0) {
        ball.dx = -ball.dx
    }

    if (ball.y <= 0) {
        ball.dy = -ball.dy
    }

    if (ball.y + ball.height >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        let collidePoint = ball.x - (paddle.x + paddle.width / 2)
        collidePoint = collidePoint / (paddle.width / 2)
        let angle = collidePoint * (Math.PI / 3)
        ball.dx = 6 * Math.sin(angle)
        ball.dy = -(6 * Math.cos(angle))
    } else if (ball.y + ball.height >= containerHeight) {
        life--
        cancelAnimationFrame(reqAnId)
        resetBall()
        ballStyle(ballDiv)
        return
    }

    ball.x += ball.dx
    ball.y += ball.dy


    ballStyle(ballDiv)
}

function paddleStyle(paddleDiv) {
    paddleDiv.style.cssText = `
        width: ${paddle.width}px;
        height: ${paddle.height}px;
        transform: translate(${paddle.x}px, ${paddle.y}px);
    `
}

function ballStyle(ballDiv) {
    ballDiv.style.cssText = `
        width: ${ball.width}px;
        height: ${ball.height}px;
        transform: translate(${ball.x}px, ${ball.y}px);
`
}

function resetBall() {
    ball.x = containerWidth / 2 - ballWidth / 2;
    ball.y = paddle.y - ballHeight * 1.2;
    ball.dx = 6 *  (Math.random() * 2 - 1);
    ball.dy = -5;
}