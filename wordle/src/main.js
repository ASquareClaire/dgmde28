import './style.css'
import { Game } from './game.js';
import { handleGuess } from './utils.js';

const app = document.getElementById('app');
const titleBox = document.createElement('div');
titleBox.innerHTML = '<h1>WORDLE</h1>';
app.appendChild(titleBox);

// Create board
const boardDiv = document.createElement('div');
boardDiv.id = 'board';
app.appendChild(boardDiv);

// Create input box // TODO: Clean this up
const inputBox = document.createElement('div');
inputBox.id = 'input-box';

const messageBox = document.createElement('div')
messageBox.id = 'message';
inputBox.appendChild(messageBox);

const inputWrap = document.createElement('div');
inputWrap.id = 'input-wrap';
inputBox.appendChild(inputWrap);

const input = document.createElement('input');
input.type = 'text';
input.id = 'input';
inputWrap.appendChild(input);

const inputBtn = document.createElement('button');
inputBtn.textContent = 'Submit';
inputBtn.id = 'input-btn';
inputWrap.appendChild(inputBtn);

// Start new game
function newGame()
{
  // Create new Game
  const game = new Game();
  game.answer = 'TABLE'; // TODO: Hook up API

  // Draw board
  for (var i = 0; i < game.guessesMax; i++)
  {
    const wordBox = document.createElement('div');
    wordBox.id = `word${i}`;
    wordBox.className = 'word-box'
    boardDiv.appendChild(wordBox);
    for (var j = 0; j < game.wordLength; j++)
    {
      const letterBox = document.createElement('div');
      letterBox.className = 'letter-box';
      letterBox.id = `box-${i}-${j}`;
      wordBox.appendChild(letterBox);
    }
  }

  // Add input
  app.appendChild(inputBox);

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
console.log('New Game');
newGame();