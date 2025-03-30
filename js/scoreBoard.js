export const scoreBoard = {
    timer: '10:00',
    score: 0,
    lives: 3
}

export function updateScoreBoard() {
    const timer = document.querySelector('.timer')
    const score = document.querySelector('.score > span')
    const lives = document.querySelector('.lives > span')
    timer.textContent = scoreBoard.timer
    score.textContent = scoreBoard.score
    lives.textContent = scoreBoard.lives
}