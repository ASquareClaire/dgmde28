// Use React to create the following elements of the Wordle game:
// The Wordle board (6 words of 5 letters each)
// The used letter board

// Since we have not yet covered event handling in React, do not attempt to make this interactive.  
// Instead, hard code 3 guesses (“might”, “flood”, “stray”) and then calculate and display results against an answer of “moody”
// We will be looking for use of arrays. This assignment should NOT use JSX.
import { Player } from './player.js'
import { CreateGuessBoard, newGame } from './utils.js'


var hello = React.createElement("h1", null, "This is Reacting");

// Create Player
const player = new Player();
// Create New Game
const game = await newGame(player);
// console.log(game);

// Create React divs
var wordle = React.createElement("div", null,
    [   
        // TODO: Convert titleBox
        React.createElement(CreateGuessBoard, {game : game}),
        React.createElement("div", {id: "used-letter-box", key: "used-letter-box"}, "I am a used letter board")
    ]);

// Render App
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(wordle);