import { useState, useEffect } from 'react';
import { calculateDistancesFromPoint } from '../utils/calculateDistancesFromPoint';
import { GridBox } from './GridBox';

interface GridProps {
  gridRows: number;
  gridColumns: number;
}

export function Grid({ gridRows, gridColumns }: GridProps) {
  const [grid, setGrid] = useState(() => {
    const newGrid = Array(gridRows * gridColumns).fill(0);
    newGrid[0] = 1; // just to demo colors
    return newGrid;
  });

  // Fill grid with higher than possible value before starting to calculate distances
  const maxValue = gridRows + gridColumns;
  const initialDistances = Array(gridRows)
    .fill(gridRows * gridColumns)
    .map((row) => Array(gridColumns).fill(maxValue));

  let distances = initialDistances;

  // Calculate distances from each delivery office
  grid.forEach((box, index) => {
    if (box === 1) {
      distances = calculateDistancesFromPoint(
        index,
        distances,
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
        distance={distances.flat()[index]}
        maxDist={maxValue}
      />
    );
  });

  return (
    <div
      className="grid"
      style={
        {
          '--gridRows': `${gridRows}`,
          '--gridCols': `${gridColumns}`,
        } as React.CSSProperties
      }>
      {boxes}
    </div>
  );
}
