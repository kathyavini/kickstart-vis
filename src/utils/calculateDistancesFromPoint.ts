export function calculateDistancesFromPoint(
  boxId: number,
  distanceArray: number[][],
  gridRows: number,
  gridColumns: number
) {
  const [r, c] = getCoordFromId(boxId, gridRows, gridColumns);

  let newDistances = distanceArray.map((row) => [...row]);

  // Passed point is always a distribution center (i.e. 'on')
  newDistances[r][c] = 0;

  // Just step through each square
  for (let i = 0; i < gridRows * gridColumns; i++) {
    const [thisR, thisC] = getCoordFromId(i, gridRows, gridColumns);

    const thisDist = Math.abs(thisR - r) + Math.abs(thisC - c);

    if (thisDist < newDistances[thisR][thisC]) {
      newDistances[thisR][thisC] = thisDist;
    }
  }

  return newDistances;
}

function getCoordFromId(id: number, rows: number, columns: number) {
  const r = Math.floor(id / columns);
  const c = id % columns;
  return [r, c];
}
