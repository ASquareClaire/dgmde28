import { Game } from './game.js'

// R = right letter, right place
// W = right letter, wrong place
// X = not in word
// Check each letter of guess against answer
export function CheckGuess({guess, game})
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

    if (game.debugMode)
    {
        console.log('Guessed letters: ' + game.alphabetGuessed);
        console.log('result = ' + result);
    }
    return result;    
}


// TODO: Convert to JSX Component
// Create Used Keyboard
export function CreateUsedKeyboard({game})
{
    // Map letters & colors based on guesses
    const letterColors = {};
    for (var g = 0; g < game.guesses.length; g++)
    {
        const result = CheckGuess({guess: game.guesses[g], game});
        const guess = game.guesses[g];
        for (var i = 0; i < guess.length; i++)
        {
            // Color logic: Green > yellow > grey
            if (result[i] == 'R') 
                letterColors[guess[i]] = 'green';
            else if (result[i] == 'W' && letterColors[guess[i]] != 'green')
                letterColors[guess[i]] = 'yellow';
            else if (!letterColors[guess[i]])
                letterColors[guess[i]] = 'grey';
        }
    }

    const rows = [];
    for (var i = 0; i < game.usedKeyboard.length; i++)
    {
        // Create rows
        const letters = [];
        for (var j = 0; j < game.usedKeyboard[i].length; j++)
        {
            // Create letters
            const letter = game.usedKeyboard[i][j];
            const color = letterColors[letter] || '';
            letters.push(React.createElement("div", 
            {
                key: `used-${i}-${j}`,
                id: `used-${i}-${j}`,
                className: `used-letter-box ${color}`
            }, letter));
        }
        // Push row of letters into rows
        rows.push(React.createElement("div",
        {
            key: `row${i}`,
            id: `row${i}`,
            className: 'used-letter-row'
        }, letters ));
    }
    return React.createElement("div", {id: "used-box"}, rows)
}


// TODO: JSX Component?
// Create New Game
export async function newGame(player)
{
    console.log('Starting new Game...');
    
    // Create new Game
    const game = new Game(player);
    game.answer = 'MOODY';
    game.guesses = ['MIGHT', 'FLOOD', 'STRAY'];
    
    if (game.debugMode)
        console.log('Answer: ' + game.answer);

    return game;
}