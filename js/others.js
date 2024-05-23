'use strict'

function onMouseOver(cell,i,j){
    document.querySelector(`.cell-${i}-${j}`).classList.add('over')
  }
  function onMouseOut(cell,i,j){
    document.querySelector(`.cell-${i}-${j}`).classList.remove('over')
  }
  