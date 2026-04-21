import './App.css'

// Box Component
function Box({number})
{
  // Assign background color
  const colorMap = 
  {
    7: 'black', 8: 'blue', 9: 'red',
    4: 'gold',  5: 'black', 6: 'blue',
    1: 'red',   2: 'gold',  3: 'black',
  };
  var color = colorMap[number];

  // Return Box
  return <div 
            id={number} 
            className={`small-box ${color}`}
            onClick={() => alert(number)}
        >
            {number}
        </div>
}

// Row Component
function Row({boxes, rowNum, startingNum})
{
  var row = [];

  // Add boxes to row
  for (var i = 0; i < boxes; i++)
  {
    row.push(<Box key={startingNum} number={startingNum} />)
    startingNum++;
  }

  // Return Row
  return <div 
            id={`row${rowNum}`}
            className={'row'}
        >
            {row}
        </div>
}

// BigBox Component
function BigBox()
{
  const rows = 3;
  const bigBox = []

  // Add rows
  var startingNum = 1;
  for (var i = 0; i < rows; i++)
  {
    // Add boxes x3 (assign numbers)
    bigBox[rows - 1 - i] = <Row key={i} boxes={rows} startingNum={startingNum} />
    startingNum += 3;
  }

  return <div className='big-box'>{bigBox}</div>
}


// Main
function App() {
  return <BigBox />
}

export default App
