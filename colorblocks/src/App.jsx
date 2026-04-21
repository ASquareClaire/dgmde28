import './App.css'

// TODO: Make box component
function Box({number})
{
  const colorMap = 
  {
    7: 'black', 8: 'blue', 9: 'red',
    4: 'gold',  5: 'black', 6: 'blue',
    1: 'red',   2: 'gold',  3: 'black',
  };
  var color = colorMap[number];
  return <div 
            id={number} 
            //key={number}
            className={`small-box ${color}`}
            onClick={() => alert(number)}
        >
            {number}
        </div>
}

// TODO: Make row component
function Row({boxes, rowNum, startingNum})
{
  var row = [];

  // Add boxes to row
  for (var i = 0; i < boxes; i++)
  {
    row.push(<Box key={startingNum} number={startingNum} />)
    console.log('startingNum: ' + startingNum)
    startingNum++;
  }

  return <div 
            id={`row${rowNum}`}
            //key={`row${rowNum}`}
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
  var startingNum = 1;
  for (var i = 0; i < rows; i++)
  {
    // Add boxes x3 (assign numbers)
    bigBox[rows - 1 - i] = <Row key={i} boxes={rows} startingNum={startingNum} />
    startingNum += 3;
  }

  // TODO: Assign colors (black, blue, red, gold)
  //var colorClasses = ['black-box', 'blue-box', 'red-box', 'gold-box'];
  return <div className='big-box'>{bigBox}</div>
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
