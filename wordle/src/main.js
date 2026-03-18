import './style.css'
import { checkGuess, validateGuess } from './utils';

const app = document.getElementById('app');
const boardDiv = document.createElement('div');
app.appendChild(boardDiv);

// Game stats
const WORD_LETTERS = 5;
const GUESSES = 6;
var answer = 'TABLE'; // TODO: Hook up API

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

// New Game
var guesses = 0;
// Loop while guesses < GUESSES
//for (var i = 0; i < GUESSES; i++)
  // Get user input
  //var guess = '' // user input

