

'use strict'



function startTimer() {

    gStartTime = Date.now()

    gTimerInterval = setInterval(() => {
        var seconds = ((Date.now() - gStartTime) / 1000).toFixed(2);
        var elSpan = document.querySelector('.timer');
        elSpan.innerText = seconds
    }, 10);
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function foodCounter(gBoard) {
    var foodCount=0
    for (var i = 0; i <gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if(gBoard[i][j] ===".")foodCount++
        }
    }gFoodCount=foodCount
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  

function changeHeader() {
    var elHeader = document.querySelector('h1')
    elHeader.innerText = 'I love JS'
}

function onMark(elBtn) {
    var spans = document.querySelectorAll('.box span')

    for (var i = 0; i < spans.length; i++) {
        spans[i].classList.toggle('mark')
    }

    elBtn.innerText = (!gIsMark) ? 'Unmark' : 'Mark'
    gIsMark = !gIsMark

    // if (!gIsMark) {
    //     elBtn.innerText = 'Unmark'
    //     gIsMark = true
    // } else {
    //     elBtn.innerText = 'Mark'
    //     gIsMark = false
    // }
}

function onMouseOver(elImg) {
    // console.log('elImg:', elImg)
    // console.dir(elImg)
    elImg.src = 'img/ca.png'

}

function onMouseOut(elImg) {
    elImg.src = 'img/ninja.png'
}

function onChangeSubHeader(elSpan) {
    // console.log('elSpan:', elSpan)

    if (gIsMark) {
        var elSpanHeader = document.querySelector('h2 span')
        elSpanHeader.innerText = elSpan.innerText
    }
    // elSpan.classlist
}

function onHandleKey(ev) {
    if (ev.code === 'Escape') {
        onCloseModal()
    }

}

function onOpenModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

    setTimeout(onCloseModal, 5000)
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function onBless() {
    var elBlessHeader = document.querySelector('.modal h2')
    elBlessHeader.innerText = `You were blessed at ${getTime()}`
    elBlessHeader.style.color = getRandomColor()
    onOpenModal()
}

function onImgClicked() {
    onBless()
    // onOpenModal()
}

function getTime() {
    return new Date().toString().split(' ')[4];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function restartGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}



function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}
