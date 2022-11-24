import { useState } from 'react';
import { calculateDistancesFromPoint } from '../utils/calculateDistancesFromPoint';
import { GridBox } from './GridBox';

interface GridProps {
  gridRows: number;
  gridColumns: number;
}

export function Grid({ gridRows, gridColumns }: GridProps) {
  const [grid, setGrid] = useState(
    Array(gridRows)
      .fill(0)
      .map((x) => Array(gridColumns).fill(0))
      .flat()
  );

  // Fill grid with higher tha possible value before starting
  const maxValue = gridRows + gridColumns;
  const maxArray = Array(gridRows)
    .fill(gridRows * gridColumns)
    .map((row) => Array(gridColumns).fill(maxValue));

  let initialDistances = maxArray;

  // Calculate distances from each delivery office
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
