export function gameStart() {
    const gameElement = document.querySelector('.game')
    const startElement = document.querySelector('.start') 
    gameElement.style.opacity = '1'
    startElement.style.display = 'none'
}

export function gameOver(win = true) {
    if (win) {

    } else {
        console.log('you looossss')
    }
}