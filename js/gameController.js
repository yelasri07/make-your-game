export function gameStart() {
    const gameElement = document.querySelector('.game')
    const startElement = document.querySelector('.start') 
    gameElement.classList.toggle('opacityGame')
    startElement.classList.toggle('hideStart')
}

export function gameOver(win = true) {
    if (win) {

    } else {
        // console.log('you looossss')
    }
}

export function gameRestart() {
    
}