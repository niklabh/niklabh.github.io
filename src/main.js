import {WIDTH, HEIGHT, SPEED} from './constants'
import Game from './class/Game'

require('./login')

new Game(WIDTH, HEIGHT, SPEED).start()
