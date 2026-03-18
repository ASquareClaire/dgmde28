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
export function checkGuess(guess, answer) // TODO: Finish this
{
    var result = []
    guess = guess.toUpperCase();
    // For each letter, compare against answer
    for (var i = 0; i < answer.length; i++)
        // TODO: Add to guessed alphabet
        if (guess[i] == answer[i])
            result[i] = 'R'; // right letter, right place
        else if (answer.includes(guess[i]))
            result[i] = 'W'; // right letter, wrong place
        else 
            // Add to used letters
            result[i] = 'X'; // wrong letter
    console.log('result = ' + result);
    return result;    
}