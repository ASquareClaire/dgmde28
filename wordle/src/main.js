import './style.css'
import { Player } from './player.js'
import { newGame } from './utils.js';

// TODO: Create Win class? Convert to array with guess stat?

const player = new Player();

newGame(player);