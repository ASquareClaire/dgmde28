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