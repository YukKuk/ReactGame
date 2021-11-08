import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={()=>props.onClick()}>
      {props.value}
    </button>
  );
}


function Board(props){
  function renderSquare(i) {
    return <Square 
    value={props.squares[i]}
    onClick={()=>props.onClick(i)}
    />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game () {
  let [history, setHistory] = useState({
    squares: Array(9).fill(null), 
    xIsNext: true,
  })

  function handleClick(i){
    // const History = history.squares;
    // const current = History[History.length - 1];
    const sq = history.squares.slice();
    if (calculateWinner(sq) || sq[i]) {
      return;
    }
    sq[i] = history.xIsNext ? 'X' : 'O'

    setHistory(
      history.squares = history.squares.concat([
        history.squares = sq,
      ]),
      history.xIsNext = !history.xIsNext,
    );
  }

  //const current = history.squares[history.squares.length - 1];
  ///////////
  const winner = calculateWinner(history.squares);
  let status;
  if (winner) {
    status = 'Выиграл ' + winner;
  } else {
    status = 'Следующий ход: ' + (history.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={history.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
