export const WIDTH = 50
export const HEIGHT = 50
export const SPEED = 100

const DIRECTIONS = Object.freeze({
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
})

const PLAYER = Object.freeze({
  CREATOR: 'creator',
  JOINER: 'joiner'
})

const STATE = Object.freeze({
  OPEN: 'open',
  JOINED: 'joined'
})

const SNAKE_BODY = [
  {x: 4, y: 4},
  {x: 5, y: 4},
  {x: 6, y: 4},
  {x: 7, y: 4},
  {x: 8, y: 4},
  {x: 9, y: 4},
  {x: 10, y: 4}
]

const REMOTE_SNAKE_BODY = SNAKE_BODY.map(({x, y}) => ({x, y: y + 4}))

export {DIRECTIONS, PLAYER, STATE, SNAKE_BODY, REMOTE_SNAKE_BODY}
