document.addEventListener('DOMContentLoaded', () => {
  // let's create the grid
  const grid = document.getElementById('grid')
  const startBtn = document.getElementById('start-button')
  const width = 10

  for (var i = 0; i < 200; i++) {
    grid.appendChild(document.createElement('div'))
  }

  for (var i = 0; i < 10; i++) {
    var taken = document.createElement('div')
    taken.className = 'taken'
    grid.appendChild(taken)
  }

  let squares = Array.from(document.querySelectorAll('div#grid div'))

  // the tetrominos
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 0
  let currentRotation = 0
  // randomly select tetrominos
  let random = Math.floor(Math.random() * theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  var timerId = setInterval(moveDown, 750)

  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      startBtn.innerHTML = 'Start'
    } else {
      draw()
      timerId = setInterval(moveDown, 750)
      startBtn.innerHTML = 'Pause'
    }
  })

  function control (e) {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 40) {
      moveDown()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 38) {
      rotate()
    }
  }

  document.addEventListener('keyup', control)

  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function moveLeft () {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }

    draw()
  }

  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if (!isAtRightEdge) currentPosition += 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }

    draw()
  }

  function rotate () {
    undraw()
    currentRotation++

    if (currentRotation === current.length) currentRotation = 0
    current = theTetrominoes[random][currentRotation]

    draw()
  }

  function freeze () {
    if (current.some(index => squares[currentPosition + width + index].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }
})
