import firebase from '../firebase'
import Snake from './Snake'
import RemoteSnake from './RemoteSnake'
import Food from './Food'
import {STATE, PLAYER, SNAKE_BODY, REMOTE_SNAKE_BODY} from '../constants'

class Game {
  constructor (width, height, speed) {
    this.width = width
    this.height = height
    this.speed = speed
    this.ref = firebase.database().ref('/games')
    this.player = null
    this.key = null
    this.snake = null
    this.remoteSnake = null
    this.food = null
    this.receiveRef = null
    this.interval = null

    this.canvas()
    this.list()

    document.getElementById('create').onclick = () => this.create()
  }

  create () {
    const user = firebase.auth().currentUser

    if (!user) {
      return console.log('sign in to create')
    }

    const currentGame = {
      creator: { uid: user.uid, displayName: user.displayName },
      state: STATE.OPEN
    }
    const pushRef = this.ref.push()

    pushRef.set(currentGame)

    this.key = pushRef.key
    this.player = PLAYER.CREATOR
    this.receive()

    console.log('created:', pushRef.key)
  }

  join (key) {
    const user = firebase.auth().currentUser
    const gameRef = this.ref.child(key)

    gameRef.transaction((game) => {
      if (!game.joiner) {
        game.state = STATE.JOINED
        game.joiner = { uid: user.uid, displayName: user.displayName }
      }

      this.key = key
      this.player = PLAYER.JOINER
      this.receive()

      console.log('joined:', key)
      return game
    })
  }

  list () {
    const openGames = this.ref.orderByChild('state').equalTo(STATE.OPEN)
    const list = document.getElementById('list')

    list.onclick = (e) => {
      if (e.target.dataset.key) {
        this.join(e.target.dataset.key)
      }
    }

    openGames.on('child_added', (snapshot) => {
      const data = snapshot.val()
      const li = document.createElement('li')
      li.className = 'collection-item'
      li.dataset.key = snapshot.key
      li.innerHTML = data.creator.displayName
      list.appendChild(li)
    })
  }

  canvas () {
    const container = document.getElementById('container')
    container.style.width = this.width * 10

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let div = document.createElement('div')
        div.className = 'pixel'
        div.id = `cell_${i}_${j}`
        container.appendChild(div)
      }
    }
  }

  send (direction) {
    if (!this.key) return

    const ref = this.ref.child(`${this.key}/${this.player}/direction`)

    console.log(ref, direction)

    ref.set(direction)
  }

  receive () {
    if (!this.key) return
    if (this.receiveRef) {
      this.receiveRef.off()
    }

    const player = this.player === PLAYER.CREATOR ? PLAYER.JOINER : PLAYER.CREATOR

    const ref = this.ref.child(`${this.key}/${player}/direction`)

    ref.on('value', (snapshot) => {
      this.remoteSnake.receive(snapshot.val())
    })

    this.receiveRef = ref
  }

  start () {
    this.snake = new Snake(SNAKE_BODY)
    this.remoteSnake = new RemoteSnake(REMOTE_SNAKE_BODY)
    this.food = new Food()

    this.snake.send = (direction) => this.send(direction)
    this.food.generate(this.width, this.height)

    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      window.requestAnimationFrame(this.loop.bind(this))
    }, this.speed)
  }

  clear () {
    const elems = document.querySelectorAll('.pixel')
    const length = elems.length
    for (let index = 0; index < length; index++) {
      elems[index].style.backgroundColor = '#ece4d8'
    }
  }

  render () {
    const draw = (color, cell) => {
      const elem = document.getElementById(`cell_${cell.x}_${cell.y}`)
      elem.style.backgroundColor = color
    }

    this.snake.body.forEach(draw.bind(this, 'red'))
    this.remoteSnake.body.forEach(draw.bind(this, 'blue'))

    const food = document.getElementById(`cell_${this.food.x}_${this.food.y}`)
    food.style.backgroundColor = 'green'

    const score = document.getElementById('score')
    score.innerHTML = `${this.snake.score}:${this.remoteSnake.score}`
  }

  loop () {
    this.snake.move(this.width, this.height, this.food)
    this.remoteSnake.move(this.width, this.height, this.food)

    this.clear()
    this.render()

    if (this.snake.dead() || this.remoteSnake.dead()) {
      return setTimeout(() => this.start(), 0)
    }
  }
}

export default Game
