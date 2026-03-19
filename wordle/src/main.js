import './style.css'
import { Game } from './game.js';
import { Player } from './player.js'
import { newGame } from './utils.js';

const app = document.getElementById('app');
const titleBox = document.createElement('div');
titleBox.innerHTML = '<h1>WORDLE</h1>';
app.appendChild(titleBox);

// TODO: Add endGame stats to player object

const player = new Player();

newGame(player);