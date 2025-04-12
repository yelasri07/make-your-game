import { gameOver } from "./gameController.js"
import { scoreBoard } from "./config.js";
import { LifeLost } from "./sounds.js";

export let x;

export function updateScoreBoard() {
    const timer = document.querySelector('.timer')
    const score = document.querySelector('.score > span')
    const lives = document.querySelector('.lives > span')

    if (scoreBoard.timer === '00:00' || scoreBoard.lives === 0) {
        LifeLost()
        gameOver('lose')
    }

    timer.textContent = scoreBoard.timer
    score.textContent = scoreBoard.score
    lives.textContent = scoreBoard.lives
}

export function countDown() {
    x = setInterval(function () {
        scoreBoard.ms--
        if (scoreBoard.ms === 0) {
            scoreBoard.ms = 10
            scoreBoard.seconds--;

            scoreBoard.timer = `${String(scoreBoard.minutes).padStart(2, '0')}:${String(scoreBoard.seconds).padStart(2, '0')}`;
            updateScoreBoard();

            if (scoreBoard.seconds === 0) {
                if (scoreBoard.minutes === 0) {
                    clearInterval(x);
                    return;
                }
                scoreBoard.minutes--;
                scoreBoard.seconds = 60;
            }
        }

    }, 100);
}
