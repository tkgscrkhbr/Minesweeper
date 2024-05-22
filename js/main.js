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

var gGamestate=false

var gMines = 0
var gBoard

var gLife = 3
// [[{
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: true,
//     isMarked: false,

// }], [{
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }], [{
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: true,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }], [{
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }, {
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,

// }],]
onInit()

function onInit() {
    gGamestate=true
    gLife = 3
    buildBoard(2)
    renderBoard(gBoard)
    

}





function buildBoard(size) {
    if(gLife===0)return
    var difficulty = 0
    const board = []

    for (var i = 0; i < size; i++) {
        board[i] = []

        for (var j = 0; j < size; j++) {

            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked:false,

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
                gMines++

                gBoard[i][j].minesAroundCount += setMinesNegsCount(gBoard, i, j)
            } gBoard[i][j].minesAroundCount += setMinesNegsCount(gBoard, i, j)
        }
    }
}

function setMinesNegsCount(board, cellI, cellJ) {
    var bombCounter = 0
    for (var X = cellI - 1; X <= cellI + 1; X++) {

        if (X < 0 || X >= board.length) continue
        for (var y = cellJ - 1; y <= cellJ + 1; y++) {
            if (X === cellI && y === cellJ) continue

            if (y < 0 || y >= board.length) continue
            if (board[X][y].isMine) bombCounter++
        }
    } return bombCounter
}



function renderBoard(board) {
    if(gLife===0)return
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const isShown = board[i][j].isShown
            const className = `cell cell-${i}-${j} isShown:${isShown} no-right-click`

            strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})"oncontextmenu="onCellMarked(this,${i},${j})">${!cell.isMarked?(cell.isShown ? (cell.isMine ? '💣' : cell.minesAroundCount!==0?cell.minesAroundCount:"") : ''):'🏴'}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

    document.querySelector('h2').innerText = `${gLife} LIVES LEFT`
    
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

function onCellMarked(board,i,j){
    if(gBoard[i][j].isShown)return
    gBoard[i][j].isMarked=!gBoard[i][j].isMarked
    renderBoard(gBoard)
return false
}
var firstClick = true

function onCellClicked(cell, i, j) {
if(gBoard[i][j].isMarked){return}
else{if (firstClick) {
        gBoard[i][j].isShown = true
        mineMaker(i, j)
        // calcAllMines()

        renderBoard(gBoard)
        calcAllMines()
        renderBoard(gBoard)
        firstClick = false
    }

    else {
        if (gBoard[i][j].isMine) {
            gBoard[i][j].isShown=true
            if (gLife > 1) {
                gLife--
                renderBoard(gBoard)
            }
            else {

               lostGame()
            }

        }
        else {
            gBoard[i][j].isShown = true
            //     document.querySelector(".cell-"+i+"-"+j).innerHTML=(cell.isShown?(cell.isMine? '💣' : cell.minesAroundCount):"")
            // document.querySelector(".cell-"+i+"-"+j).classList.add('isShown:true')
            renderBoard(gBoard)
            // checkWin()

        }
    }
}
}
function mineMaker(i, j) {

    for (var x = 0; x < gBoard.length; x++) {

        for (var y = 0; y < gBoard[0].length; y++) {
            if (i === x && j === y) { console.log(i, j) }
            else {

                gBoard[x][y].isMine = (Math.random() > 0.5)
                // console.log(gBoard[x][y])

            }
        }
    }

}

function showMines(){
    for(var i=0;i<gBoard.length;i++){
        for(var j=0;j<gBoard[0].length;j++){
            gBoard[i][j].isShown=true

        
        }
        
    }
    renderBoard()
}

function lostGame(){
    // document.querySelector('table').style.display = 'none'
    // document.querySelector('.modal').style.display = 'block'
    document.querySelector('.smiley').innerText='🥺'
}


function startNewGame() {
    document.querySelector('table').style.display = ''
    document.querySelector('.modal').style.display = 'none'
    firstClick = true
    onInit()
    document.querySelector('.smiley').innerText='😊'
}


// function checkWin(){
//     if (gGamestate!==false){
//         for(var i=0;i<gBoard.length;i++){
//             for(var j=0;j<gBoard[0].length;j++){
//                 if (!(!gBoard.isMine&&gBoard.isShown)){
//                     break
//                 }
//                 else {
//                     // console.log('good')
//                 }
//             }
//         }
//     }
//     else {
//         winGame()
//     }
// }


// function winGame(){
//     document.querySelector('.smiley').innerText='😎'
//     gGamestate=false
// }