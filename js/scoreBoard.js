import { gameOver } from "./gameController.js"
import { scoreBoard } from "./config.js";

export let x;

export function updateScoreBoard() {
    const timer = document.querySelector('.timer')
    const score = document.querySelector('.score > span')
    const lives = document.querySelector('.lives > span')

    if(scoreBoard.timer === '00:00' || scoreBoard.lives === 0) {
        clearInterval(x)
        gameOver('lose')
    }

    timer.textContent = scoreBoard.timer
    score.textContent = scoreBoard.score
    lives.textContent = scoreBoard.lives
}

export function countDown() {
    let minutes = 4;
    let seconds = 60;

    x = setInterval(function () {
        seconds--;

        scoreBoard.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        updateScoreBoard();
        console.log(scoreBoard.timer)

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
