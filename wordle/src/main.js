import './style.css'
import { Game } from './game.js';
import { createGuessBoard, createInputBox, createUsedKeyboard, handleGuess } from './utils.js';

const app = document.getElementById('app');
const titleBox = document.createElement('div');
titleBox.innerHTML = '<h1>WORDLE</h1>';
app.appendChild(titleBox);



// // Create input box // TODO: Abstract to function
// const inputBox = document.createElement('div');
// inputBox.id = 'input-box';

// const messageBox = document.createElement('div')
// messageBox.id = 'message';
// inputBox.appendChild(messageBox);

// const inputWrap = document.createElement('div');
// inputWrap.id = 'input-wrap';
// inputBox.appendChild(inputWrap);

// const input = document.createElement('input');
// input.type = 'text';
// input.id = 'input';
// inputWrap.appendChild(input);

// const inputBtn = document.createElement('button');
// inputBtn.textContent = 'Submit';
// inputBtn.id = 'input-btn';
// inputWrap.appendChild(inputBtn);


// usedBox.id = 'used-box';

// // TODO: Move this to a function, use game.usedKeyboard instead
// const usedKeyboard = 
// [
//   ['Q','W','E','R','T','Y','U','I','O','P'],
//   ['A','S','D','F','G','H','J','K','L'],
//   ['Z','X','C','V','B','N','M']
// ]

// for (var i = 0; i < usedKeyboard.length; i++)
// {
//   const row = document.createElement('div');
//   row.className = 'used-letter-row';
//   row.id = `row${i}`;
//   for (var j = 0; j < usedKeyboard[i].length; j++)
//   {
//     const letter = document.createElement('div');
//     letter.className = 'used-letter-box';
//     letter.id = `used-${i}-${j}`;
//     letter.textContent = usedKeyboard[i][j];
//     row.appendChild(letter);
//   }
//   usedBox.appendChild(row);
// }

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