// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

// TODO: Make box component
function Box(number)
{
  return <div id={number} className={'smallBox'}></div>
}

// TODO: Make row component
function Row(boxes)
{
  var row = [];

  // Add boxes to row
  for (var i = 0; i < boxes; i++)
    row.push(Box(i))

  return <div id={'row'}>{row}</div>
}

// TODO: Make box component
function BigBox()
{
  const rows = 3;
  const bigBox = []
  // Add rows
  for (var i = 0; i < rows; i++)
    // Add boxes x3 (assign numbers)
    bigBox.push(Row(rows));

  // TODO: Assign colors (black, blue, red, gold)
  var colors = ['black', 'blue', 'red', 'gold'];
  return <div>{bigBox}</div>
}


// Main
function App() {
//const [count, setCount] = useState(0)

  return (
    <>
    <BigBox />
    </>
  )
}

export default App
