// Use React to create the following elements of the Wordle game:
// The Wordle board (6 words of 5 letters each)
// The used letter board

// Since we have not yet covered event handling in React, do not attempt to make this interactive.  
// Instead, hard code 3 guesses (“might”, “flood”, “stray”) and then calculate and display results against an answer of “moody”
// We will be looking for use of arrays. This assignment should NOT use JSX.
import { Player } from './player.js'
import { CreateGuessBoard, CreateUsedKeyboard, newGame } from './utils.js'


var hello = React.createElement("h1", null, "This is Reacting");

// Create Player
const player = new Player();
// Create New Game
const game = await newGame(player);
// console.log(game);

// Create React divs
var wordle = React.createElement("div", null,
    [   
        React.createElement("h1", {key: "title"}, "WORDLE"),
        React.createElement(CreateGuessBoard, {id: "board", key: "board", game : game}),
        React.createElement(CreateUsedKeyboard, {id: "used-letter-box", key: "used-letter-box", game : game})
    ]);

// Render App
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(wordle);