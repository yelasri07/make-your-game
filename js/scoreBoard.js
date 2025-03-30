import { gameOver } from "./gameController.js"

export const scoreBoard = {
    timer: '10:00',
    score: 0,
    lives: 3
}

export function updateScoreBoard() {
    const timer = document.querySelector('.timer')
    const score = document.querySelector('.score > span')
    const lives = document.querySelector('.lives > span')

    if(scoreBoard.timer === '00:00') {
        gameOver(false)
    }

    timer.textContent = scoreBoard.timer
    score.textContent = scoreBoard.score
    lives.textContent = scoreBoard.lives
}

export function countDown() {
    let minutes = 0;
    let seconds = 5;

    let x = setInterval(function () {
        seconds--;

        scoreBoard.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        console.log(scoreBoard.timer);
        updateScoreBoard();

        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(x);
                return;
            }
            minutes--;
            seconds = 60;
        }

    }, 1000);
}
