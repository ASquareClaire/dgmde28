import './style.css'
import { Player } from './player.js'
import { newGame } from './utils.js';

// TODO: Add endGame stats to player object
// TODO: Create and hook up newGameBtn

const player = new Player();

newGame(player);