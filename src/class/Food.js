class Food {
  constructor (width, height) {
    this.width = width
    this.height = height
    this.x = 0
    this.y = 0
  }

  exists ({x, y}) {
    return this.x === x && this.y === y
  }

  generate () {
    this.x = Math.floor(Math.random() * this.width)
    this.y = Math.floor(Math.random() * this.height)

    this.send({x: this.x, y: this.y})
  }

  send ({x, y}) {
    // no op
  }

  receive ({x, y}) {
    this.x = x
    this.y = y
  }
}

export default Food
