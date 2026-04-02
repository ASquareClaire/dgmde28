import { Game } from './game.js';

// TODO: Fine tune debug mode
// TODO: Clean up comments
// TODO: Check deliverables list

// R = right letter, right place
// W = right letter, wrong place
// X = not in word
// Check each letter of guess against answer
function checkGuess(guess, game)
{
    var result = []
    guess = guess.toUpperCase();
    var answerCopy = game.answer;

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

    // TODO: Abstract color boxes?
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
            // If already green, do not overwrite color
            if (!usedLetterBox.classList.contains('green'))
                usedLetterBox.style.backgroundColor = '#b59f3b';
        }
        else 
        {
            letterBox.style.backgroundColor = 'grey';
            // If already green, do not overwrite color
            if (!usedLetterBox.classList.contains('green'))
                usedLetterBox.style.backgroundColor = 'grey';
        }
    }

    // Check for win or loss
    checkWinLoss(guess, game);

    console.log('Guessed letters: ' + game.alphabetGuessed);
    console.log('result = ' + result);
    return result;    
}


function checkWinLoss(guess, game)
{
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
}


// Create Guess Board
function createGuessBoard(game)
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
function createInputBox(game)
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
function createNewGameBtn(player)
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
function createUsedKeyboard(game)
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


// Display win/lose, new game button, and player stats
function endGame(game, win)
{
    const app = document.getElementById('app');
    const inputBox = document.getElementById('input-box');
    if (win)
    {
        inputBox.innerHTML = '<h2>You win!</h2>';
        game.player.totalWins++;
        console.log('Total Wins: ' + game.player.totalWins + ' -- Total Losses: ' + game.player.totalLosses);
    }
    else
    {
        inputBox.innerHTML = '<h2>You lose!</h2>';
        game.player.totalLosses++;
    }
    
    // Create new game btn
    const newGameBtn = createNewGameBtn(game.player);
    inputBox.appendChild(newGameBtn);

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


// Get random word
async function getRandomWord(game)
{
    // console.log('Trying to fetch a ' + game.wordLength + ' letter word');
    try
    {
        const response = await fetch
        (
            // Note: This specific API pulls from old Wordle words - would need to use a different one for wordLength != 5
            'https://wordlehints.co.uk/wp-json/wordlehint/v1/answers?per_page=200&order=asc'
        );
        const data = await response.json(); 
        // console.log('API response:', data);
        const words = data.results.map(entry => entry.answer);
        return words[Math.floor(Math.random() * words.length)];

    }
    catch (error)
    {
        console.error('Random word API error:', error);
        const fallbackWords = ['PRIDE', 'CRANE', 'AUDIO', 'STARE', 'PILOT', 'LEMON']; // Backup array of valid words
        return fallbackWords[Math.floor(Math.random() * fallbackWords.length)]; // Return random backup word
    }
}

// Validate and check guess
async function handleGuess(game)
{
    const guess = input.value.trim();
    console.log('Guess: ' + guess);
    input.value = ''; // Clear input box

    // If guess is valid
    if (await validateGuess(guess, game.wordLength))
    {
        //await isValidWord(guess)
        game.guesses++;
        console.log('Guesses so far: ' + game.guesses);
        checkGuess(guess, game);
    }
}


// Check if 5-letter word is valid (FreeDictionary API)
async function isValidWord(word)
{
    try
    {
        var response = await fetch
        (
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
    return response.ok; // Return bool 
    } 
    catch (error) 
    {
        console.error("Dictionary API error:", error);
        return true; // If no network response, treat as valid word
    }
}


// Start new game
export async function newGame(player)
{
    console.log('Starting new Game...');
    
    // Create new Game
    const game = new Game(player);
    
    // Get word via API
    // console.log('Looking for a ' + game.wordLength + ' letter word');
    game.answer = await getRandomWord(game);
    game.debugMode = true; // Turn on for debug mode
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


// Validate guess length, alpha only, and valid word
async function validateGuess(guess, wordLen)
{
    const messageBox = document.getElementById('message');
    messageBox.innerHTML = '';
    if (guess.length == wordLen && /^[A-Za-z]+$/.test(guess)) // Regex alpha test via geeksforgeeks.org
        if (await isValidWord(guess)) // Check for valid word via API
            return true
        else 
        {
            messageBox.innerHTML = 'Guess must be a valid word';
            return false;
        }  
    else if (guess.length != wordLen)
        messageBox.innerHTML = 'Guess must be exactly 5 letters';
    else 
        messageBox.innerHTML = 'Guess must be letters only';
    return false
}