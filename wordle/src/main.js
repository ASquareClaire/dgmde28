import './style.css'
import { Game } from './game.js';
import { createGuessBoard, createInputBox, createUsedKeyboard, handleGuess } from './utils.js';

const app = document.getElementById('app');
const titleBox = document.createElement('div');
titleBox.innerHTML = '<h1>WORDLE</h1>';
app.appendChild(titleBox);

// TODO: Create player object
// TODO: Add endGame stats to player object

// Start new game
function newGame()
{
  // Create new Game
  const game = new Game();
  game.answer = 'PRIDE'; // TODO: Hook up API

  // Create board
  const boardDiv = createGuessBoard(game);
  app.appendChild(boardDiv);

  // Add input and used letters
  const inputBox = createInputBox(game)
  app.appendChild(inputBox);

  // Create Used Letter Board
  const usedBox = createUsedKeyboard(game);
  app.appendChild(usedBox);
}
console.log('New Game');
newGame();