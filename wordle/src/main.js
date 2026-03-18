import './style.css'
import { checkGuess, validateGuess } from './utils';

const app = document.getElementById('app');
const boardDiv = document.createElement('div');
app.appendChild(boardDiv);

// Start new game
function newGame()
{
  // Game stats
  const WORD_LETTERS = 5;
  const GUESSES = 6;
  const ALPHABET = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
  const GUESSED_ALPHABET = []
  var answer = 'TABLE'; // TODO: Hook up API
  var guesses = 0;

  boardDiv.innerHTML = 'hi this is a wordle board';
  // Create input box and submit button // TODO: Style this properly
  var input = document.createElement('input');
  input.textContent = 'S'
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

  document.getElementById('input-btn').addEventListener('click', () => {
    const guess = input.value.trim();
    console.log(guess);
    input.value = ''; // Clear input box
    // If guess is valid
    if (validateGuess(guess, WORD_LETTERS))
      guesses++;
      console.log('Guesses so far: ' + guesses);
      checkGuess(guess, answer);
  });
}

newGame();

