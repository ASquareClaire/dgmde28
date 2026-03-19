export function endGame(win)
{
    const app = document.getElementById('app');
    app.removeChild(document.getElementById('input-box'));
    const board = document.getElementById('board');
    if (win)
        board.innerHTML = '<h2>You win!</h2>';
    else
        board.innerHTML = '<h2>You lose!</h2>';
}

// Validate guess length and letters only
export function validateGuess(guess, wordLen)
{
    const messageBox = document.getElementById('message');
    messageBox.innerHTML = '';
    if (guess.length == wordLen && /^[A-Za-z]+$/.test(guess)) // Regex via geeksforgeeks.org
        return true
    else if (guess.length != wordLen)
        messageBox.innerHTML = 'Guess must be exactly 5 letters';
    else 
        messageBox.innerHTML = 'Guess must be letters only';
    return false
}

// R = right letter, right place
// W = right letter, wrong place
// X = not in word
export function checkGuess(guess, game) // TODO: Finish this
{
    var result = []
    guess = guess.toUpperCase();
    var answerCopy = game.answer;
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
        // Add to guessed alphabet // TODO: Delete this if not needed
        if (!game.alphabetGuessed.includes(guess[i]))
            game.alphabetGuessed.push(guess[i]);
        // Find letter on used keyboard
        var l = -1;
        for (var k = 0; k < game.usedKeyboard.length; k++) 
        {
            l = game.usedKeyboard[k].indexOf(guess[i]);
            if (l != -1)
                break;
        }
        const usedLetterBox = document.getElementById(`used-${k}-${l}`);

        const letterBox = document.getElementById(`box-${game.guesses - 1}-${i}`);
        letterBox.textContent = guess[i];

        // Compare against answer
        if (guess[i] == game.answer[i])
        {
            result[i] = 'R'; // right letter, right place
            letterBox.style.backgroundColor = '#538d4e';
            usedLetterBox.style.backgroundColor = '#538d4e';
            usedLetterBox.classList.add('green');
            // Remove letter from answerCopy letters
            answerCopy = answerCopy.replace(guess[i], '');
        }
        else if (game.answer.includes(guess[i]))
        {
            // If answerCopy still has the letter
            if (answerCopy.includes(guess[i]))
            {
                result[i] = 'W'; // right letter, wrong place
                letterBox.style.backgroundColor = '#b59f3b';
                // If already green, do not overwrite color
                if (!usedLetterBox.classList.contains('green'))
                    usedLetterBox.style.backgroundColor = '#b59f3b';
                // Remove letter from answerCopy letters
                answerCopy = answerCopy.replace(guess[i], '');
            }  
            // If duplicate letter is not in answer: wrong letter
            else
            {
                result[i] = 'X'; // wrong letter
                letterBox.style.backgroundColor = 'grey';
                // If already green, do not overwrite color
                if (!usedLetterBox.classList.contains('green'))
                    usedLetterBox.style.backgroundColor = 'grey';
            }

        }
        else 
        {
            result[i] = 'X'; // wrong letter
            letterBox.style.backgroundColor = 'grey';
            usedLetterBox.style.backgroundColor = 'grey';
        }
        console.log('Letter: ' + guess[i], 'answerCopy: ' + answerCopy)
    }
    console.log('Guessed letters: ' + game.alphabetGuessed);
    console.log('result = ' + result);
    return result;    
}


// Create usedKeyboard
export function createUsedKeyboard(game)
{
    // Create Used Letter Div
    const usedBox = document.createElement('div');
    usedBox.id = 'used-box';

    for (var i = 0; i < game.usedKeyboard.length; i++)
    {
    const row = document.createElement('div');
    row.className = 'used-letter-row';
    row.id = `row${i}`;
    for (var j = 0; j < game.usedKeyboard[i].length; j++)
    {
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


// Create Guess Board
export function createGuessBoard(game)
{
    // Create Guess Board
    const boardDiv = document.createElement('div');
    boardDiv.id = 'board';

    for (var i = 0; i < game.guessesMax; i++)
    {
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


// Validate and check guess
export function handleGuess(game)
{
    const guess = input.value.trim();
    console.log('Guess: ' + guess);
    input.value = ''; // Clear input box

    // If guess is valid
    if (validateGuess(guess, game.wordLength))
    {
      game.guesses++;
      console.log('Guesses so far: ' + game.guesses);
      checkGuess(guess, game);
    }
}