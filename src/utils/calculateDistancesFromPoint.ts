export function calculateDistancesFromPoint(
  boxId: number,
  distanceArray: number[][],
  gridRows: number,
  gridColumns: number
) {
  // console.log('Calculating distances from ... ' + boxId);

  // Values for point of interest
  const [r, c] = getCoordFromId(boxId, gridRows, gridColumns);
  const testId = getIdFromCoor(r, c, gridRows, gridColumns);

  // Testing conversion functions
  // console.log({ testId });
  // console.log([r, c]);

  let newDistances = distanceArray.map((row) => [...row]);

  // Passed point is always a distribution center (i.e. 'on')
  newDistances[r][c] = 0;

  for (let i = 1; i < Math.max(gridRows, gridColumns); i++) {
    let pointSet = {
      primary: [
        [r + i, c],
        [r - i, c],
        [r, c + i],
        [r, c - i],
      ],
      diagonals: [
        [r + i, c + i],
        [r - i, c - i],
        [r - i, c + i],
        [r + i, c - i],
      ],
    };

    // Sorry gonna leave it like that for now. Data structure is a little too nested to extract this easily

    // Straight lines
    for (let [thisR, thisC] of pointSet.primary) {
      if (!exists(thisR, thisC, gridRows, gridColumns)) continue;

      let currentDist = newDistances[thisR][thisC];

      if (currentDist > i) {
        newDistances[thisR][thisC] = i;
      }
    }

    // Diagonals
    for (let [thisR, thisC] of pointSet.diagonals) {
      if (!exists(thisR, thisC, gridRows, gridColumns)) continue;

      let currentDist = newDistances[thisR][thisC];

      if (currentDist > i + i) {
        newDistances[thisR][thisC] = i + i;
      }
    }

    // Off Diagonals
    for (let j = 1; j < Math.max(gridRows, gridColumns); j++) {
      let offDiag = Array(8).fill(0);
      offDiag[0] = [pointSet.diagonals[0][0] + j, pointSet.diagonals[0][1]];
      offDiag[1] = [pointSet.diagonals[1][0] - j, pointSet.diagonals[1][1]];
      offDiag[2] = [pointSet.diagonals[2][0] - j, pointSet.diagonals[2][1]];
      offDiag[3] = [pointSet.diagonals[3][0] + j, pointSet.diagonals[3][1]];

      offDiag[4] = [pointSet.diagonals[0][0], pointSet.diagonals[0][1] + j];
      offDiag[5] = [pointSet.diagonals[1][0], pointSet.diagonals[1][1] - j];
      offDiag[6] = [pointSet.diagonals[2][0], pointSet.diagonals[2][1] + j];
      offDiag[7] = [pointSet.diagonals[3][0], pointSet.diagonals[3][1] - j];

      for (let [thisR, thisC] of offDiag) {
        if (!exists(thisR, thisC, gridRows, gridColumns)) continue;

        let currentDist = newDistances[thisR][thisC];

        if (currentDist > i + i + j) {
          newDistances[thisR][thisC] = i + i + j;
        }
      }
    }
  }
  return newDistances;
}

function getCoordFromId(id: number, rows: number, columns: number) {
  const r = Math.floor(id / columns);
  const c = id % columns;
  return [r, c];
}

function getIdFromCoor(
  r: number,
  c: number,
  gridRows: number,
  gridColumns: number
) {
  return r * gridColumns + c;
}

function exists(
  thisR: number,
  thisC: number,
  gridRows: number,
  gridColumns: number
): boolean {
  if (thisR < 0 || thisC < 0 || thisR >= gridRows || thisC >= gridColumns) {
    return false;
  }
  return true;
}
