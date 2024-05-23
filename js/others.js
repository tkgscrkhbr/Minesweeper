'use strict'
var isSpecial = false


function specialfeel() {
    var sp = document.querySelector('.feelingspecial')
    if (isSpecial) {
        sp.style.display = 'none'
        sp.innerHTML = ''


    }
    else {
        sp.style.display = 'block'
        sp.innerHTML = `<iframe width="1920" height="1080" src="https://www.youtube.com/embed/AZO5bcALdlE?start=4&amp;end=20;autoplay=1" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin">


    </iframe>`
    }
    isSpecial = !isSpecial
}


function onMouseOver(cell, i, j) {
    document.querySelector(`.cell-${i}-${j}`).classList.add('over')
}
function onMouseOut(cell, i, j) {
    document.querySelector(`.cell-${i}-${j}`).classList.remove('over')
}

//supereasy is for checking the recursion
function supereasyMode() {
    numMines = 4
    boardSize = 14
    startNewGame()
}

function easyMode() {
    numMines = 2
    boardSize = 4
    startNewGame()
}


function interMode() {
    numMines = 14
    boardSize = 8

    startNewGame()

}
function hardMode() {
    numMines = 32
    boardSize = 12
    startNewGame()

}
function hellMode() {
    numMines = 70
    boardSize = 13
    startNewGame()
}
