import {DIRECTIONS} from '../constants'

class Snake {
  constructor (body) {
    this.body = body
    this.direction = DIRECTIONS.RIGHT
    this.score = 0

    this.input()
  }

  input () {
    const keyMap = {
      w: DIRECTIONS.UP,
      s: DIRECTIONS.DOWN,
      a: DIRECTIONS.LEFT,
      d: DIRECTIONS.RIGHT
    }

    document.addEventListener('keydown', (event) => {
      const keyName = event.key

      if (keyMap[keyName]) {
        this.direction = keyMap[keyName]
        this.send(this.direction)
      }
    })
  }

  send (direction) {
    // no op
  }

  incr (pos, steps, max) {
    return (pos + steps < 0 ? max + pos + steps : pos + steps) % max
  }

  move (width, height, food) {
    const moveMap = {
      [DIRECTIONS.LEFT]: ({x, y}) => ({x, y: this.incr(y, -1, height)}),
      [DIRECTIONS.RIGHT]: ({x, y}) => ({x, y: this.incr(y, 1, height)}),
      [DIRECTIONS.UP]: ({x, y}) => ({x: this.incr(x, -1, width), y}),
      [DIRECTIONS.DOWN]: ({x, y}) => ({x: this.incr(x, 1, width), y})
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

export default Snake
