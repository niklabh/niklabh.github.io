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

export default Food
