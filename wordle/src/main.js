import './style.css'
import { Game } from './game.js';
import { checkGuess, handleGuess, validateGuess } from './utils.js';

const app = document.getElementById('app');
// Create board
const boardDiv = document.createElement('div');
app.appendChild(boardDiv);

// Create input box // TODO: Style this properly
  var input = document.createElement('input');
  input.type = 'text';
  input.id = 'input';
  input.style.width = '200px';
  app.appendChild(input);

  // Input buttun // TODO: Clean this up
  var inputBtn = document.createElement('button');
  inputBtn.textContent = 'Submit';
  inputBtn.id = 'input-btn';
  inputBtn.style.width = '200px';
  app.appendChild(inputBtn);

  // Start new game
function newGame()
{
  // Create new Game
  const game = new Game();
  game.answer = 'TABLE'; // TODO: Hook up API

  boardDiv.innerHTML = 'hi this is a wordle board';
  
  // Add input listeners
  input.addEventListener('keydown', (enter) =>
  {
    if (enter.key === 'Enter')
      handleGuess(game);
  });
  inputBtn.addEventListener('click', () => 
  {
    handleGuess(game);
  });
  
  
}

newGame();