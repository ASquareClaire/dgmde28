// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

// TODO: Make box component
function Box(number)
{
  return <div 
            id={number} 
            key={number}
            className={'small-box'}
        >
            {number}
        </div>
}

// TODO: Make row component
function Row(boxes, rowNum, startingNum)
{
  var row = [];

  // Add boxes to row
  for (var i = 0; i < boxes; i++)
  {
    row.push(Box(startingNum));
    console.log('startingNum: ' + startingNum)
    startingNum++;
  }

  return <div 
            id={`row${rowNum}`}
            key={`row${rowNum}`}
            className={'row'}
        >
            {row}
        </div>
}

// TODO: Make box component
function BigBox()
{
  const rows = 3;
  const bigBox = []
  // Add rows
  var startingNum = 1
  for (var i = 0; i < rows; i++)
  {
    // Add boxes x3 (assign numbers)
    bigBox[rows - 1 - i] = (Row(rows, i, startingNum));
    startingNum += 3;
  }

  // TODO: Assign colors (black, blue, red, gold)
  var colorClasses = ['black-box', 'blue-box', 'red-box', 'gold-box'];
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
