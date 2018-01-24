import {DIRECTIONS} from '../constants'
import Snake from './Snake'

class RemoteSnake extends Snake {
  input () {
    const keyMap = {
      ArrowUp: DIRECTIONS.UP,
      ArrowDown: DIRECTIONS.DOWN,
      ArrowLeft: DIRECTIONS.LEFT,
      ArrowRight: DIRECTIONS.RIGHT
    }

    document.addEventListener('keydown', (event) => {
      const keyName = event.key

      if (keyMap[keyName]) {
        this.direction = keyMap[keyName]
      }
    })
  }

  receive (direction) {
    if (DIRECTIONS[direction]) {
      this.direction = DIRECTIONS[direction]
    }
  }
}

export default RemoteSnake
