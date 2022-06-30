import { useState, useEffect } from 'react';
import './App.css';

interface GridBoxProps {
  state: boolean;
  toggleState: () => void;
  // id: number;
  // calcDistance: () => number;
  distance: number;
}

function GridBox({ state, toggleState, distance }: GridBoxProps) {
  return (
    <div
      className="box"
      data-state={state ? 'on' : 'off'}
      onClick={toggleState}
      data-dist={distance}
    ></div>
  );
}

function App() {
  const [grid, setGrid] = useState(
    [
      [1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
    ].flat()
  );

  function toggleState(boxId: number) {
    const updatedGrid = [...grid];
    if (updatedGrid[boxId] == 1) {
      updatedGrid[boxId] = 0;
    } else {
      updatedGrid[boxId] = 1;
    }
    setGrid(updatedGrid);
  }

  function calculateDistance(boxId: number) {
    if (grid[boxId] === 1) return 0;

    let lowest;

    for (let i = 0; i < 5; i++) {
      if (grid[boxId - i] && grid[boxId - i] === 1) {
        return i;
      }
    }
    return 1;
  }

  const boxes = grid.map((value, index) => {
    return (
      <GridBox
        // id={index}
        state={Boolean(value)}
        toggleState={() => toggleState(index)}
        key={index}
        distance={calculateDistance(index)}
      />
    );
  });

  return (
    <div className="app">
      <main className="grid">{boxes}</main>
    </div>
  );
}

export default App;
