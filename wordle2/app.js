// Use React to create the following elements of the Wordle game:
// The Wordle board (6 words of 5 letters each)
// The used letter board

// Since we have not yet covered event handling in React, do not attempt to make this interactive.  
// Instead, hard code 3 guesses (“might”, “flood”, “stray”) and then calculate and display results against an answer of “moody”
// We will be looking for use of arrays. This assignment should NOT use JSX.
import './style.css'
import { Player } from './player.js'
import { Game } from './game.js'

// Create Guess Board
function createGuessBoard(game)
{
    const boardDiv = document.createElement('div');
    boardDiv.id = 'board';

    // For each guess allowed
    for (var i = 0; i < game.guessesMax; i++)
    {
        // Create empty guess line
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
    return boardDiv;
}

// Create New Game
// Start new game
export async function newGame(player)
{
    console.log('Starting new Game...');
    
    // Create new Game
    const game = new Game(player);
    game.answer = 'MOODY';
    game.guesses = ['MIGHT', 'FLOOD', 'STRAY'];

    //game.debugMode = true; // TURN ON FOR DEBUG MODE
    // Get word via API
    if (game.debugMode)
        console.log('Looking for a ' + game.wordLength + ' letter word');
    game.answer = await getRandomWord(game);
    
    if (game.debugMode)
        console.log('Answer: ' + game.answer);

    const app = document.getElementById('app');
    app.innerHTML = '';

    const titleBox = document.createElement('div');
    titleBox.innerHTML = '<h1>WORDLE</h1>';
    app.appendChild(titleBox);

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

// Create Used Keyboard
function createUsedKeyboard(game)
{
    // Create Used Letter Div
    const usedBox = document.createElement('div');
    usedBox.id = 'used-box';

    for (var i = 0; i < game.usedKeyboard.length; i++)
    {
        // Create rows
        const row = document.createElement('div');
        row.className = 'used-letter-row';
        row.id = `row${i}`;
        for (var j = 0; j < game.usedKeyboard[i].length; j++)
        {
            // Create letters
            const letter = document.createElement('div');
            letter.className = 'used-letter-box';
            letter.id = `used-${i}-${j}`;
            letter.textContent = game.usedKeyboard[i][j];
            row.appendChild(letter);
        }
        usedBox.appendChild(row);
    }
    return usedBox;
}

var hello = React.createElement("h1", null, "This is Reacting");
// Create React divs
var wordle = React.createElement("div", null,
    [   
        React.createElement("div", {id: "guess-board"}, "I am a guess board"),
        React.createElement("div", {id: "used-board"}, "I am a used letter board")
    ]);

// Create Player
const player = new Player();
// Create New Game
newGame(player);

// Fill divs

// Render App
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(wordle);