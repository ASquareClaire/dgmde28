import { Game } from './game.js'

// Create Guess Board
export function CreateGuessBoard({game})
{
    // const boardDiv = document.createElement('div');
    // boardDiv.id = 'board';
    // const boardDiv = document.getElementById('board');

    // Create empty guess lines
    const rows = [];
    // For each guess allowed
    for (var i = 0; i < game.guessesMax; i++)
    {
        //const wordBox = document.createElement('div');
        // wordBox.id = `word${i}`;
        // wordBox.key = `word${i}`;
        // wordBox.className = 'word-box'
        //boardDiv.appendChild(wordBox);

        // Create row of letter boxes
        const letters = []
        for (var j = 0; j < game.wordLength; j++)
        {   
            letters.push(React.createElement("div", 
            {
                key: `box-${i}-${j}`,
                id: `box-${i}-${j}`,
                className: 'letter-box'
            }));
        }
        // Push row of letters into rows
        rows.push(React.createElement("div",
        {
            key: `word${i}`,
            id: `word${i}`,
            className: 'word-box'
        }, letters ));
            //const letterBox = document.createElement('div');
            // letterBox.className = 'letter-box';
            // letterBox.id = `box-${i}-${j}`;
            // letterBox.key = `box-${i}-${j}`;
            //wordBox.appendChild(letterBox);
        
    }
    //return boardDiv;
    console.log(rows);
    return React.createElement("div", { id: "board" }, rows);
}


// Create Used Keyboard
export function CreateUsedKeyboard(game)
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
    // if (game.debugMode)
    //     console.log('Looking for a ' + game.wordLength + ' letter word');
    // game.answer = await getRandomWord(game);
    
    if (game.debugMode)
        console.log('Answer: ' + game.answer);

    const app = document.getElementById('app');
    app.innerHTML = '';

    const titleBox = document.createElement('div');
    titleBox.innerHTML = '<h1>WORDLE</h1>';
    app.appendChild(titleBox);

    // Create board
    //const boardDiv = CreateGuessBoard(game);
    //app.appendChild(boardDiv);

    // Add input and used letters
    // const inputBox = createInputBox(game)
    // app.appendChild(inputBox);

    // Create Used Letter Board
    const usedBox = CreateUsedKeyboard(game);
    app.appendChild(usedBox);

    return game;
}