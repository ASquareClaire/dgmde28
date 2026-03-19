import { Game } from './game.js';

export function endGame(game, win)
{
    const app = document.getElementById('app');
    app.removeChild(document.getElementById('input-box'));
    const board = document.getElementById('board');
    if (win)
    {
        board.innerHTML = '<h2>You win!</h2>';
        game.player.totalWins++;
        console.log('Total Wins: ' + game.player.totalWins + ' -- Total Losses: ' + game.player.totalLosses);
    }
    else
    {
        board.innerHTML = '<h2>You lose!</h2>';
        game.player.totalLosses++;
    }
    
    // Create new game btn
    const newGameBtn = createNewGameBtn(game.player);
    app.appendChild(newGameBtn);

    // Display player stats
    const statsDiv = document.createElement('div');
    statsDiv.id = 'stats-div';
    app.appendChild(statsDiv);
    const statsTitle = document.createElement('div');
    statsTitle.id = 'stats-title';
    const statsList = document.createElement('div');
    statsList.id = 'stats-list';
    statsDiv.appendChild(statsTitle);
    statsDiv.appendChild(statsList);
    
    statsTitle.innerHTML = 'Player Stats';
    statsList.innerHTML += 'Total Wins: ' + game.player.totalWins + '<br>';
    statsList.innerHTML += 'Total Losses: ' + game.player.totalLosses + '<br>';
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
// TODO: Abstract win/lose checks and color boxes?
// Check each letter of guess against answer
export function checkGuess(guess, game)
{
    var result = []
    guess = guess.toUpperCase();
    var answerCopy = game.answer;
    // TODO: Move win/lose check to after color loop?
    // Check for win
    if (guess == game.answer)
    {
        endGame(game, true);
        return; // Is this correct / necessary?
    }

    // Check for loss
    if (game.guesses == game.guessesMax)
    {
        endGame(game, false);
        return;
    }

    // Compare against answer (Part 1 - Green letters)
    for (var i = 0; i < game.wordLength; i++)
    {
        // Add to guessed alphabet // TODO: Delete this if not needed
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
        console.log('Letter: ' + guess[i], 'answerCopy: ' + answerCopy)
    }

    // Change box colors based on result
    for (var i = 0; i < game.wordLength; i++)
    {
        // Find letter on used keyboard
        var letterIndex = -1;
        for (var row = 0; row < game.usedKeyboard.length; row++) 
        {
            letterIndex = game.usedKeyboard[row].indexOf(guess[i]);
            if (letterIndex != -1)
                break;
        }

        // Get boxes
        const usedLetterBox = document.getElementById(`used-${row}-${letterIndex}`);
        const letterBox = document.getElementById(`box-${game.guesses - 1}-${i}`);
        letterBox.textContent = guess[i];

        // Color based on result
        if (result[i] == 'R')
        {
            letterBox.style.backgroundColor = '#538d4e';
            usedLetterBox.style.backgroundColor = '#538d4e';
            usedLetterBox.classList.add('green');
        }
        else if (result[i] == 'W')
        {
            letterBox.style.backgroundColor = '#b59f3b';
            //If already green, do not overwrite color
            if (!usedLetterBox.classList.contains('green'))
                usedLetterBox.style.backgroundColor = '#b59f3b';
        }
        else 
        {
            letterBox.style.backgroundColor = 'grey';
            //If already green, do not overwrite color
            if (!usedLetterBox.classList.contains('green'))
                usedLetterBox.style.backgroundColor = 'grey';
        }
    }

    console.log('Guessed letters: ' + game.alphabetGuessed);
    console.log('result = ' + result);
    return result;    
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


// Create Input Box
export function createInputBox(game)
{
    const inputBox = document.createElement('div');
    inputBox.id = 'input-box';

    const messageBox = document.createElement('div')
    messageBox.id = 'message';
    inputBox.appendChild(messageBox);

    const inputWrap = document.createElement('div');
    inputWrap.id = 'input-wrap';
    inputBox.appendChild(inputWrap);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    inputWrap.appendChild(input);

    const inputBtn = document.createElement('button');
    inputBtn.textContent = 'Submit';
    inputBtn.id = 'input-btn';
    inputWrap.appendChild(inputBtn);

    // Add input listeners
    input.addEventListener('keydown', (enter) =>
    {
        if (enter.key === 'Enter')
        handleGuess(game);
    });
    inputBtn.addEventListener('click', () => 
    {
        handleGuess(game);
    });

    return inputBox;
}


// Create New Game button
export function createNewGameBtn(player)
{
    const newGameBtn = document.createElement('button');
    newGameBtn.id = 'new-game-btn';
    newGameBtn.textContent = 'Start New Game';

    // Add listener
    newGameBtn.addEventListener('click', () =>
    {
        newGame(player);
    })

    return newGameBtn;
}


// Create Used Keyboard
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

// Start new game
export function newGame(player)
{
    console.log('Starting new Game...');
    
    // Create new Game
    const game = new Game(player);
    game.answer = 'PRIDE'; // TODO: Hook up API
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