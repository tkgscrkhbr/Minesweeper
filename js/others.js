'use strict'

function onMouseOver(cell,i,j){
    document.querySelector(`.cell-${i}-${j}`).classList.add('over')
  }
  function onMouseOut(cell,i,j){
    document.querySelector(`.cell-${i}-${j}`).classList.remove('over')
  }
  
  //supereasy is for checking the recursion
function   supereasyMode(){
numMines=4
boardSize=14
startNewGame()
}
  
function   easyMode(){
numMines=2
boardSize=4
startNewGame()
}


function interMode(){
    numMines=14
    boardSize=8
    
    startNewGame()
    
}
function hardMode(){
    numMines=32
    boardSize=12
    startNewGame()
    
}
function hellMode(){
    numMines=70
    boardSize=13
    startNewGame()
}
