import './style.css'
import { Game } from './game.js';
import { checkGuess, validateGuess } from './utils.js';

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
  
  // TODO: Remove input & submit when guessMax reached
  document.getElementById('input-btn').addEventListener('click', () => {
    const guess = input.value.trim();
    console.log('Guess: ' + guess);
    input.value = ''; // Clear input box
    // If guess is valid
    if (validateGuess(guess, game.wordLength))
      game.guesses++;
      // TODO: If guesses > 5, endGame()
      console.log('Guesses so far: ' + game.guesses);
      checkGuess(guess, game);
  });
}

newGame();

