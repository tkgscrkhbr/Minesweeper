'use strict'


var gBoard
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

       buildBoard(8)
    calcAllMines()
    renderBoard(gBoard)

}




function buildBoard(size) {
    var difficulty=0.9
    const board = []

    for (var i = 0; i < size; i++) {
        board[i]=[]

        for (var j = 0; j < size; j++) {
          
            board[i][j]={
                minesAroundCount:0,
                isShown:false,
                isMine:(Math.random()>difficulty),
                isMarked:false,

            }


        }
    }
    // console.log('board:', board)
    gBoard=board
    // console.table(board)
}


function calcAllMines() {
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {

            gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
            function setMinesNegsCount(board, cellI, cellJ) {
                var bombCounter = 0
                for (var X = cellI - 1; X <= cellI + 1; X++) {

                    if (X < 0 || X >= board.length) continue
                    for (var y = cellJ - 1; y <= cellJ + 1; y++) {
                        if (X === cellI && y === cellJ) continue

                        if (y < 0 || y >= board.length) continue
                        if (board[X][y].isMine) bombCounter++
                    } return bombCounter
                }
            }
        }
    }
}
function setMinesNegsCount(board, cellI, cellJ) {
    var bombCounter = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue

            if (j < 0 || j >= board.length) continue
            if (board[i][j].isMine) bombCounter++
        }
    }
}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const isShown=board[i][j].isShown
            const className = `cell cell-${i}-${j} isShown:${isShown}` 

            strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})">${cell.isShown ? (cell.isMine? '💣' : cell.minesAroundCount):''}</td>`
            
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML


}



function onCellClicked(cell,i,j){
    if (gBoard[i][j].isMine){
        // console.log(cell.innerHTML)
        // console.log("You Snooze, You Lose!!")
        document.querySelector('table').style.display='none'
        document.querySelector('.modal').style.display='block'
    }
else{
gBoard[i][j].isShown=true
//     document.querySelector(".cell-"+i+"-"+j).innerHTML=(cell.isShown?(cell.isMine? '💣' : cell.minesAroundCount):"")
// document.querySelector(".cell-"+i+"-"+j).classList.add('isShown:true')
renderBoard(gBoard)

}

}


function startNewGame(){
    document.querySelector('table').style.display=''
        document.querySelector('.modal').style.display='none'
        onInit()
}