import { Player } from './player.js'
import { CheckGuess, CreateUsedKeyboard, newGame } from './utils.js'


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


// TODO: Create Components
// Letter Box?
// Guess Row (of Letter Boxes)?
// Board
// Used Letter Board

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