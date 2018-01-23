const UP = Symbol('UP')
const DOWN = Symbol('DOWN')
const LEFT = Symbol('LEFT')
const RIGHT = Symbol('RIGHT')

class Food {
  constructor () {
    this.x = 0
    this.y = 0
  }

  exists ({x, y}) {
    return this.x === x && this.y === y
  }

  generate (width, height) {
    this.x = Math.floor(Math.random() * width)
    this.y = Math.floor(Math.random() * height)
  }
}

class Snake {
  constructor () {
    this.body = [
      {x: 4, y: 4},
      {x: 5, y: 4},
      {x: 6, y: 4},
      {x: 7, y: 4},
      {x: 8, y: 4},
      {x: 9, y: 4},
      {x: 10, y: 4}
    ]
    this.direction = RIGHT
    this.score = 0

    const keyMap = {
      w: UP,
      s: DOWN,
      a: LEFT,
      d: RIGHT
    }

    document.addEventListener('keydown', (event) => {
      const keyName = event.key

      if (keyMap[keyName]) {
        this.direction = keyMap[keyName]
      }
    })
  }

  incr (pos, steps, max) {
    return (pos + steps < 0 ? max + pos + steps : pos + steps) % max
  }

  move (width, height, food) {
    const moveMap = {
      [LEFT]: ({x, y}) => ({x, y: this.incr(y, -1, height)}),
      [RIGHT]: ({x, y}) => ({x, y: this.incr(y, 1, height)}),
      [UP]: ({x, y}) => ({x: this.incr(x, -1, width), y}),
      [DOWN]: ({x, y}) => ({x: this.incr(x, 1, width), y})
    }

    const newHead = moveMap[this.direction](this.body[0])
    if (food.exists(newHead)) {
      food.generate(width, height)
      this.score++
    } else {
      this.body.pop()
    }
    this.body.unshift(newHead)
  }

  dead () {
    const head = this.body[0]
    return this.body.some(({x, y}, i) => i !== 0 && (head.x === x && head.y === y))
  }
}

class Game {
  constructor (size, speed) {
    this.width = size
    this.height = size
    this.speed = speed
  }

  start () {
    this.snake = new Snake()
    this.food = new Food()
    this.food.generate(this.width, this.height)

    this.loop()
  }

  clear () {
    const elems = document.querySelectorAll('.pixel')
    const length = elems.length
    for (let index = 0; index < length; index++) {
      elems[index].style.backgroundColor = '#ece4d8'
    }
  }

  render () {
    this.snake.body.forEach(cell => {
      const elem = document.getElementById(`cell_${cell.x}_${cell.y}`)
      elem.style.backgroundColor = 'red'
    })

    const food = document.getElementById(`cell_${this.food.x}_${this.food.y}`)
    food.style.backgroundColor = 'green'

    const score = document.getElementById('score')
    score.innerHTML = this.snake.score
  }

  loop () {
    this.snake.move(this.width, this.height, this.food)

    this.clear()
    this.render()

    if (this.snake.dead()) {
      return setTimeout(() => this.start(), 0)
    }

    setTimeout(() => window.requestAnimationFrame(this.loop.bind(this)), this.speed)
  }
}

(function () {
  'use strict'

  const SIZE = 50
  const SPEED = 100

  const container = document.getElementById('container')
  container.style.width = SIZE * 10

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      let div = document.createElement('div')
      div.className = 'pixel'
      div.id = `cell_${i}_${j}`
      container.appendChild(div)
    }
  }

  const game = new Game(SIZE, SPEED)

  game.start()
})()
