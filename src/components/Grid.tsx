import { useState, useEffect } from 'react';
import { calculateDistancesFromPoint } from '../utils/calculateDistancesFromPoint';
import { GridBox } from './GridBox';

interface GridProps {
  origRows: number;
  origColumns: number;
}

export function Grid({ origRows, origColumns }: GridProps) {
  // Even though I pass these from app, it seems that they need to be in the same component as the useEffect which tracks them.
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

  // Fill grid with higher tha possible value before starting
  const maxValue = gridRows + gridColumns;
  const emptyArray = Array(gridRows)
    .fill(gridRows * gridColumns)
    .map((row) => Array(gridColumns).fill(maxValue));

  // Get a distance array to narrow down the options
  let initialDistances = emptyArray;
  grid.forEach((box, index) => {
    if (box === 1) {
      initialDistances = calculateDistancesFromPoint(
        index,
        initialDistances,
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
        distance={initialDistances.flat()[index]}
        maxDist={maxValue}
      />
    );
  });

  return <main className="grid">{boxes}</main>;
}
