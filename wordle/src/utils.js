export function endGame(win)
{
    // TODO: Display end result in main div
    const app = document.getElementById('app');
    app.innerHTML = 'You win!'
    if (win)
        console.log('You win!');
    else
        console.log('You lose!');
}

// Validate guess length and letters only
// TODO: Make alert not an alert
export function validateGuess(guess, wordLen)
{
    if (guess.length == wordLen && /^[A-Za-z]+$/.test(guess)) // Regex via geeksforgeeks.org
        return true
    else if (guess.length != wordLen)
        alert('Guess must be exactly 5 letters');
    else 
        alert('Guess must be letters only');
    return false
}

// R = right letter, right place
// W = right letter, wrong place
// X = not in word
export function checkGuess(guess, game) // TODO: Finish this
{
    var result = []
    guess = guess.toUpperCase();
    // Check for win
    if (guess == game.answer)
    {
        endGame(true);
        return; // Is this correct / necessary?
    }

    // Check for loss
    if (game.guesses == game.guessesMax)
    {
        endGame(false);
        return;
    }

    // For each letter
    for (var i = 0; i < game.wordLength; i++)
    {
        // Add to guessed alphabet
        if (!game.alphabetGuessed.includes(guess[i]))
            game.alphabetGuessed.push(guess[i]);
        // Compare against answer
        if (guess[i] == game.answer[i])
            result[i] = 'R'; // right letter, right place
        else if (game.answer.includes(guess[i]))
            result[i] = 'W'; // right letter, wrong place
        else 
            // Add to used letters
            result[i] = 'X'; // wrong letter
    }
    console.log('Guessed letters: ' + game.alphabetGuessed);
    console.log('result = ' + result);
    return result;    
}

// Validate and check guess
export function handleGuess(game)
{
    const guess = input.value.trim();
    console.log('Guess: ' + guess);
    input.value = ''; // Clear input box

    // If guess is valid
    if (validateGuess(guess, game.wordLength))
      game.guesses++;
      console.log('Guesses so far: ' + game.guesses);
      checkGuess(guess, game);
}