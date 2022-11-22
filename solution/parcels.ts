const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let T = 0;

let cases: string[] = [];

readline.on('line', (line: string) => {
  if (!T) {
    T = parseInt(line);
  } else {
    cases.push(line);
  }
});

readline.on('close', () => {
  let caseStart = 0;
  for (let i = 0; i < T; i++) {
    let [R, C] = cases[caseStart].split(' ').map((num) => parseInt(num));
    const ans = solve(R, C, cases.slice(caseStart + 1, caseStart + R + 1));
    console.log(`Case #${i + 1}: ${ans}`);
    caseStart += R + 1;
  }
});

export function solve(
  gridRows: number,
  gridColumns: number,
  grid: string[]
): number {
  const formattedGrid = grid.map((line) =>
    line.split('').map((x) => parseInt(x))
  );

  const newMinimum = newMinimumOverallDistance(
    gridRows,
    gridColumns,
    formattedGrid.flat() // for simpler iteration
  );

  return newMinimum;
}

////////////////////////////////
function newMinimumOverallDistance(
  gridRows: number,
  gridColumns: number,
  grid: number[]
): number {
  // Initialize distance array with higher than possible initial values
  const maxValue: number = gridRows + gridColumns;
  const maxArray: number[][] = Array(gridRows)
    .fill(gridRows * gridColumns)
    .map((row) => Array(gridColumns).fill(maxValue));

  let distanceArray = maxArray;

  // Step through the given grid arrangement and update the distance array relative to each distribution centre
  grid.forEach((value, index) => {
    if (value === 1) {
      distanceArray = updateDistancesFromPoint(
        index,
        distanceArray,
        gridRows,
        gridColumns
      );
    }
  });

  //////////////////////////////////////////
  // Brute force solution:
  //////////////////////////////////////////
  // Step through each square that doesn't currently have a distribution centre, and calculate the distance array as though a centre was built there
  const maximumDistances: number[] = [];
  for (let i = 0; i < grid.length; i++) {
    // For each location where there is not currently a centre
    if (grid[i] === 0) {
      let newDistances = distanceArray.map((row) => [...row]);

      // Update the distance array
      newDistances = updateDistancesFromPoint(
        i,
        distanceArray,
        gridRows,
        gridColumns
      );

      // Calculate and record new maximum delivery time (= maximum Manhattan Distance)
      const maximumDeliveryTime = Math.max(...newDistances.flat());
      maximumDistances.push(maximumDeliveryTime);
    }
  }

  // Only if there are no squares to change (all squares are already distribution centres) will maximumDistances be an empty array
  return maximumDistances.length ? Math.min(...maximumDistances) : 0;
}

export function updateDistancesFromPoint(
  boxId: number,
  distanceArray: number[][],
  gridRows: number,
  gridColumns: number
): number[][] {
  const [r, c] = getCoordFromIndex(boxId, gridRows, gridColumns);

  let newDistances = distanceArray.map((row) => [...row]);

  // Passed point is always a distribution center so distance is 0
  newDistances[r][c] = 0;

  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridColumns; j++) {
      // Manhattan Distance
      const thisDist = Math.abs(i - r) + Math.abs(j - c);

      // Update the distance array only if this has generated a lower value
      if (thisDist < newDistances[i][j]) {
        newDistances[i][j] = thisDist;
      }
    }
  }

  return newDistances;
}

// Get 2D coordinate from flattened array index
function getCoordFromIndex(
  index: number,
  rows: number,
  columns: number
): number[] {
  const r = Math.floor(index / columns);
  const c = index % columns;
  return [r, c];
}
