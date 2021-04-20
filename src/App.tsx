import "./App.css";
import React, { useState } from "react";
import { Board } from "./Board";
interface HistoryData {
  square: ("O" | "X" | null)[];
}

interface GameState {
  history?: HistoryData[];
  xIsNext?: boolean;
  stepNumber?: number;
}

const Game: React.FC<GameState> = () => {
  const [state, setState] = useState({
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });

  const calculateWinner = (squares: any) => {
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
  };

  const handleClick = (i: number) => {
    const newHistory = state.history.slice(0, state.stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: newHistory.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: newHistory.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (move: number) => {
    setState({
      ...state,
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  };
  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = state.history.map((_, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
