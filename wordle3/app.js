import { Player } from './player.js'
import { CreateGuessBoard, CreateUsedKeyboard, newGame } from './utils.js'

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