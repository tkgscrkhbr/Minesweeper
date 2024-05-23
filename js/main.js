'use strict'


//                     (@@@@@@@  @@@%         @@@@%      @@@@@@@@                                      
//                     (@@@      @@@%        @@@@@@/     @@@   @@@@*                                   
//                     (@@@@@@@  @@@%       @@@@ @@@.    @@@    .@@@                                   
//                     (@@@      @@@%      @@@@@@@@@@    @@@    @@@@                                   
//                     (@@@@@@@  @@@@@@@@ @@@@(((((@@@   @@@@@@@@@&                                    



//    .@@@@@@@@    @@@@@@@. %@@@@@@@@    @@@.     @@@@   @@@@     &@@@   @@@@@@@  @@@@@@@@@            
//    .@@@  @@@/   @@@      %@@@  ,@@@   @@@.     @@@@   @@@@@@   &@@@   @@@      @@@@  @@@@           
//    .@@@@@@@     @@@@@@@  %@@@@@@@@@   @@@.     @@@@   @@@ @@@@ &@@@   @@@@@@@  @@@@@@@@@(           
//    .@@@   @@@&  @@@      %@@@@@@@     @@@.     @@@@   @@@   @@@@@@@   @@@      @@@@@@@@             
//    .@@@@@@@@@.  @@@@@@@. %@@@  @@@@   @@@@@@@/ @@@@   @@@     @@@@@   @@@@@@@  @@@@ .@@@@           



var recursionboolean = true
var firstClick = true
var gGamestate = false
var gNotMines = 0
var gCurrNotMines = 0
var gMines = 0
var gBoard
var gShown=0
var gLife = 3
var gMarked=0
const numMines = 2 // Set the desired number of mines here
onInit()

function onInit() {
  gGamestate = true
  gLife = 3
  buildBoard(6)
  renderBoard(gBoard)


}





function buildBoard(size) {
  if (gLife === 0) return
  const board = []

  for (var i = 0; i < size; i++) {
    board[i] = []

    for (var j = 0; j < size; j++) {

      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,

      }


    }
  }
  // console.log('board:', board)
  gBoard = board
  // console.table(board)
}

function calcAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMine === true) {

      }
      gBoard[i][j].minesAroundCount += setMinesNegsCount(gBoard, i, j)
    }
  }
}

function calcAllNotMines() {
 gNotMines=0
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMine === false) {
        gNotMines++
      }
    }
  }
}

function calcAllShown(){
  gShown=0
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isShown === true) {
        gShown++
      }
    }
  }
}

function calcAllMarked(){
  gMarked=0
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j].isMarked === true) {
        gMarked++
      }
    }
  }
}




function setMinesNegsCount(board, cellI, cellJ) {
  var MineCounter = 0
  for (var X = cellI - 1; X <= cellI + 1; X++) {
    if (X < 0 || X >= board.length) continue
    for (var y = cellJ - 1; y <= cellJ + 1; y++) {
      if (X === cellI && y === cellJ) continue

      if (y < 0 || y >= board[0].length) continue
      if (board[X][y].isMine) MineCounter++
    }
  }
  return MineCounter
}




function renderBoard(board) {
  if (gLife === 0) return
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {

      const cell = board[i][j]
      const isShown = board[i][j].isShown
      const className = `cell cell-${i}-${j} isShown-${isShown}`

      strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})"oncontextmenu="onCellMarked(this,${i},${j})">${!cell.isMarked ? (cell.isShown ? (cell.isMine ? '💣' : cell.minesAroundCount!==0?cell.minesAroundCount:"") : '') : '🏴'}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
if(gLife>0){
  document.querySelector('h2').innerText = `${gLife} LIVES LEFT`
  calcAllNotMines()
  calcAllShown()
  calcAllMarked()

}
else{ document.querySelector('h2').innerText = 'You Lost the Game'
}
}
//prevents right click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});


//Adds a Flag marking to a cell and removes it with another
function onCellMarked(board, i, j) {
  if (gBoard[i][j].isShown) return
  gBoard[i][j].isMarked = !gBoard[i][j].isMarked
  renderBoard(gBoard)
}




function recursionFunc(cell, i, j) {
  for (var x = i - 1; x <= i + 1; x++) {
    if (x < 0 || x >= gBoard.length) continue;
    for (var y = j - 1; y <= j + 1; y++) {
      if (y < 0 || y >= gBoard[0].length) continue;
      if (gBoard[x][y].isShown) continue;
      gBoard[x][y].isShown = true;

      if (gBoard[x][y].minesAroundCount === 0) {
        recursionboolean=true
        // console.log(cell,x,y)
        firstClickFunc(cell, x, y);
        
      }
    }
  }
  renderBoard(gBoard)
}



function firstClickFunc(cell, i, j) {
  if (firstClick) {
    mineMaker(gBoard.length, numMines, i, j)
    renderBoard(gBoard)
    renderBoard(gBoard)
    firstClick = false

    renderBoard(gBoard)
    console.log(gBoard)
    renderBoard(gBoard)
    recursionboolean = false
    console.log(gBoard[i][j].minesAroundCount)
  }
    if (gBoard[i][j].minesAroundCount === 0) {
      recursionFunc(cell, i, j)

    }
    recursionboolean = false


  


}

{
}


function onCellClicked(cell, i, j) {
  if (gBoard[i][j].isMarked) return
  if (firstClick) {
    gBoard[i][j].isShown = true
    firstClickFunc(cell, i, j)
    recursionboolean = false




  }

  else {
    if (gBoard[i][j].isMine) {
      gBoard[i][j].isShown = true
      if (gLife > 1) {
        gLife--
        renderBoard(gBoard)
      } else {
        lostGame()
      }
    } else {
      gBoard[i][j].isShown = true
      renderBoard(gBoard)
      checkWin()
    }
  }
}


function mineMaker(size, numMines, firstClickI, firstClickJ) {
  // Reset the mine count
  gMines = 0;

  // Place the mines
  while (gMines < numMines) {
    const i = Math.floor(Math.random() * size);
    const j = Math.floor(Math.random() * size);

    // Avoid placing a mine at the first click position
    if ((i === firstClickI && j === firstClickJ) || gBoard[i][j].isMine) continue;

    gBoard[i][j].isMine = true;
    gMines++;
  }

  // Calculate mines around each cell after placing all mines
  calcAllMines();
}


function showMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isMine === true){ gBoard[i][j].isShown = true}


    }

  }
  renderBoard(gBoard)
}

function lostGame() {
  // document.querySelector('table').style.display = 'none'
  // document.querySelector('.modal').style.display = 'block'
  document.querySelector('.smiley').innerText = '🥺'

}


function startNewGame() {
  document.querySelector('table').style.display = ''
  document.querySelector('.modal').style.display = 'none'
  firstClick = true
  onInit()
  document.querySelector('.smiley').innerText = '😊'
  gNotMines = 0
  firstClick = true
  recursionFunc = true
}


function checkWin() {
  if (gShown===gNotMines&&gGamestate===true&&gMarked===numMines) {
    winGame()
  }

}


function winGame() {
  document.querySelector('.smiley').innerText = '😎'
  gGamestate = false
}
