import { Game } from './game.js'


// R = right letter, right place
// W = right letter, wrong place
// X = not in word
// TODO: UPDATE to React
// Check each letter of guess against answer
function CheckGuess({guess, game})
{
    var result = []
    guess = guess.toUpperCase();
    var answerCopy = game.answer;

    // Compare against answer (Part 1 - Green letters)
    for (var i = 0; i < game.wordLength; i++)
    {
        // Add to guessed alphabet
        if (!game.alphabetGuessed.includes(guess[i]))
            game.alphabetGuessed.push(guess[i]);

        if (guess[i] == game.answer[i])
        {
            result[i] = 'R'; // right letter, right place
            answerCopy = answerCopy.replace(guess[i], '');
        }
    }

    // Compare against answer (Part 2 - Yellow & Gray letters)
    for (var i = 0; i < game.wordLength; i++)
    {
        if (result[i] == 'R')
            continue;
        if (game.answer.includes(guess[i]))
        {
            // If answerCopy still has the letter
            if (answerCopy.includes(guess[i]))
            {
                result[i] = 'W'; // right letter, wrong place
                answerCopy = answerCopy.replace(guess[i], '');
            }  
        }
        else 
        {
            result[i] = 'X'; // wrong letter
        }

        if (game.debugMode)
            console.log('Letter: ' + guess[i], 'answerCopy: ' + answerCopy)
    }

    // TODO: Abstract color boxes to separate function?
    // Change box colors based on result
    // for (var i = 0; i < game.wordLength; i++)
    // {
    //     // Find letter on used keyboard
    //     var letterIndex = -1;
    //     for (var row = 0; row < game.usedKeyboard.length; row++) 
    //     {
    //         letterIndex = game.usedKeyboard[row].indexOf(guess[i]);
    //         if (letterIndex != -1)
    //             break;
    //     }

    //     // Get boxes
    //     const usedLetterBox = document.getElementById(`used-${row}-${letterIndex}`);
    //     const letterBox = document.getElementById(`box-${game.guesses - 1}-${i}`);
    //     letterBox.textContent = guess[i];

    //     // Color based on result
    //     if (result[i] == 'R')
    //     {
    //         letterBox.style.backgroundColor = '#538d4e';
    //         usedLetterBox.style.backgroundColor = '#538d4e';
    //         usedLetterBox.classList.add('green');
    //     }
    //     else if (result[i] == 'W')
    //     {
    //         letterBox.style.backgroundColor = '#b59f3b';
    //         // If already green, do not overwrite color
    //         if (!usedLetterBox.classList.contains('green'))
    //             usedLetterBox.style.backgroundColor = '#b59f3b';
    //     }
    //     else 
    //     {
    //         letterBox.style.backgroundColor = 'grey';
    //         // If already green, do not overwrite color
    //         if (!usedLetterBox.classList.contains('green'))
    //             usedLetterBox.style.backgroundColor = 'grey';
    //     }
    // }

    // Check for win or loss
    //checkWinLoss(guess, game);

    if (game.debugMode)
    {
        console.log('Guessed letters: ' + game.alphabetGuessed);
        console.log('result = ' + result);
    }
    return result;    
}

// TODO: Write function to CheckGuess for all game.guesses
export function DisplayGuesses({game})
{
    for (var i = 0; i < game.guesses.length; i++)
    {
        CheckGuess(game.guesses[i]);
    }
}


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
        // Check for guess in array - process guess or leave empty
        const guess = game.guesses[i] || ''; 
        const result = guess ? CheckGuess({guess, game}) : [];
        
        // Create row of letter boxes
        const letters = [];
        for (var j = 0; j < game.wordLength; j++)
        {   
            // Build className with result
            var className = 'letter-box';
            if (result[j] == 'R')
                className += ' green';
            else if (result[j] == 'W')
                className += ' yellow';
            else if (result[j] == 'X')
                className += ' grey';

            letters.push(React.createElement("div", 
            {
                key: `box-${i}-${j}`,
                id: `box-${i}-${j}`,
                className: className
            }, guess[j] || '')); // Fill letter box with letter, or empty
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
    return React.createElement("div", {id: "board"}, rows);
}


// Create Used Keyboard
export function CreateUsedKeyboard({game})
{
    // Create Used Letter Div
    // const usedBox = document.createElement('div');
    // usedBox.id = 'used-box';
    const rows = [];
    for (var i = 0; i < game.usedKeyboard.length; i++)
    {
        // Create rows
        // const row = document.createElement('div');
        // row.className = 'used-letter-row';
        // row.id = `row${i}`;
        const letters = [];
        for (var j = 0; j < game.usedKeyboard[i].length; j++)
        {
            // Create letters
            letters.push(React.createElement("div", 
            {
                key: `used-${i}-${j}`,
                id: `used-${i}-${j}`,
                className: 'used-letter-box'
            }));
            // const letter = document.createElement('div');
            // letter.className = 'used-letter-box';
            // letter.id = `used-${i}-${j}`;
            // letter.textContent = game.usedKeyboard[i][j];
            // row.appendChild(letter);
        }
        // Push row of letters into rows
        rows.push(React.createElement("div",
        {
            key: `row${i}`,
            id: `row${i}`,
            className: 'used-letter-row'
        }, letters ));
        //usedBox.appendChild(row);
    }
    //return usedBox;
    return React.createElement("div", {id: "used-box"}, rows)
}


// Validate and check guess
// TODO: Delete this function for now?
async function HandleGuess({game})
{
    const guess = input.value.trim();

    if (game.debugMode)
        console.log('Guess: ' + guess);

    //input.value = ''; // Clear input box

    // If guess is valid
    // if (await validateGuess(guess, game.wordLength))
    // {
        game.guesses++;
        if (game.debugMode)
            console.log('Guesses so far: ' + game.guesses);
        CheckGuess(guess, game);
    //}
}


// Create New Game
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

    // const app = document.getElementById('app');
    // app.innerHTML = '';

    // const titleBox = document.createElement('div');
    // titleBox.innerHTML = '<h1>WORDLE</h1>';
    // app.appendChild(titleBox);

    // Create board
    //const boardDiv = CreateGuessBoard(game);
    //app.appendChild(boardDiv);

    // Add input and used letters
    // const inputBox = createInputBox(game)
    // app.appendChild(inputBox);

    // Create Used Letter Board
    // const usedBox = CreateUsedKeyboard(game);
    // app.appendChild(usedBox);

    return game;
}