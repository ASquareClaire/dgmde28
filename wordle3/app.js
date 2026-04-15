import { Player } from './player.js'
import { CheckGuess, newGame } from './utils.js'


// TODO: Create Components
// Letter Box?
// Guess Row (of Letter Boxes)?
// Used Letter Board

// Create Guess Board
function CreateGuessBoard({game})
{
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

            letters.push(
            //     React.createElement("div", 
            // {
            //     key: `box-${i}-${j}`,
            //     id: `box-${i}-${j}`,
            //     className: className
            // }, guess[j] || '')
                <div 
                    key={`box-${i}-${j}`} 
                    id={`box-${i}-${j}`} 
                    className={className}
                >
                    {guess[j] || ''}
                </div>
            ); // Fill letter box with letter, or empty
        }
        // Push row of letters into rows
        rows.push(
            <div
                key={`word${i}`}
                id={`word${i}`}
                className={'word-box'}
            >
                {letters}
            </div>
        //     React.createElement("div",
        // {
        //     key: `word${i}`,
        //     id: `word${i}`,
        //     className: 'word-box'
        // }, letters )
        );        
    }

    if (game.debugMode)
        console.log(rows);

    return <div id={'board'}>{rows}</div>
    //return React.createElement("div", {id: "board"}, rows);
}


// TODO: Convert to JSX Component
// Create Used Keyboard
function CreateUsedKeyboard({game})
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
            letters.push(
            //     React.createElement("div", 
            // {
            //     key: `used-${i}-${j}`,
            //     id: `used-${i}-${j}`,
            //     className: `used-letter-box ${color}`
            // }, letter)
                <div
                    key={`used-${i}-${j}`}
                    id={`used-${i}-${j}`}
                    className={`used-letter-box ${color}`}
                >
                    {letter}
                </div>
            );
        }
        // Push row of letters into rows
        rows.push(
        //     React.createElement("div",
        // {
        //     key: `row${i}`,
        //     id: `row${i}`,
        //     className: 'used-letter-row'
        // }, letters )
            <div 
                key={`row${i}`}
                id={`row${i}`}
                className={'used-letter-row'}
            >
                {letters}
            </div>
        );
    }
    return <div id={"used-box"}>{rows}</div>
    //return React.createElement("div", {id: "used-box"}, rows)
}



// Create Player
const player = new Player();
// Create New Game
const game = await newGame(player);

// game.debugMode = true; // UNCOMMENT FOR DEBUG MODE
if (game.debugMode)
    console.log(game);

// Create React divs
// var wordle = React.createElement("div", null,
//     [   
//         React.createElement("h1", {key: "title"}, "WORDLE"),
//         React.createElement(CreateGuessBoard, {id: "board", key: "board", game : game}),
//         React.createElement(CreateUsedKeyboard, {id: "used-letter-box", key: "used-letter-box", game : game})
//     ]);

// Create JSX divs
var wordle = 
(
    <div>
        <h1>WORDLE</h1>
        <CreateGuessBoard id="board" game={game}></CreateGuessBoard>
        <CreateUsedKeyboard id="used-letter-box" game={game}></CreateUsedKeyboard>
    </div>
)

// Render App
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(wordle);