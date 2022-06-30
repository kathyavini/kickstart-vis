import { useState, useEffect } from 'react';
import { calculateDistancesFromPoint } from '../utils/calculateDistancesFromPoint';
import { GridBox } from './GridBox';

interface GridProps {
  origRows: number;
  origColumns: number;
}

export function Grid({ origRows, origColumns }: GridProps) {
  // Even though I pass these from app, it seems that they need to be in the same component as the useEffect which tracks them. Since I wanted the useEffect in this component, I had to recreate the state; not sure if there was a better way.
  const [gridRows, setGridRows] = useState(origRows);
  const [gridColumns, setGridColumns] = useState(origColumns);

  const [grid, setGrid] = useState(
    Array(gridRows)
      .fill(0)
      .map((x) => Array(gridColumns).fill(0))
      .flat()
  );

  // These CSS custom properties dynamically resize the grid
  useEffect(() => {
    document.documentElement.style.setProperty('--gridRows', `${gridRows}`);
    document.documentElement.style.setProperty('--gridCols', `${gridColumns}`);
  }, [gridRows, gridColumns]);

  const maxValue = 100;
  // 100 is my arbitrarity large distance for no distribution centers, but you can set it as anything
  const initialDistances = Array(gridRows)
    .fill(gridRows * gridColumns)
    .map((row) => Array(gridColumns).fill(maxValue));

  // Distances for this render
  let currentDistances = initialDistances;
  grid.forEach((box, index) => {
    if (box === 1) {
      currentDistances = calculateDistancesFromPoint(
        index,
        currentDistances,
        gridRows,
        gridColumns
      );
    }
  });

  function toggleState(boxId: number) {
    const updatedGrid = [...grid];
    if (updatedGrid[boxId] == 1) {
      updatedGrid[boxId] = 0;
    } else {
      updatedGrid[boxId] = 1;
    }
    setGrid(updatedGrid);
  }

  const boxes = grid.map((value, index) => {
    return (
      <GridBox
        state={Boolean(value)}
        toggleState={() => {
          toggleState(index);
        }}
        key={index}
        distance={currentDistances.flat()[index]}
      />
    );
  });

  return <main className="grid">{boxes}</main>;
}
