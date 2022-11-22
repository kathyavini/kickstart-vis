import { describe, test, expect } from 'vitest';
import { solve } from './parcels.ts';

import generatedOutput from './generated-output.txt?raw';
import testOutput from './kickstart-IO/parcels_sample_ts1_output.txt?raw';

function parse(file) {
  let T = 0;
  let cases = [];
  const inputLines = file.split('\n');

  inputLines.forEach((line) => {
    if (!T) {
      T = parseInt(line);
    } else {
      cases.push(line);
    }
  });

  return { T, cases };
}

function solveCases(T, cases) {
  let output = [];

  let caseStartIndex = 0;

  for (let i = 0; i < T; i++) {
    let [R, C] = cases[caseStartIndex].split(' ').map((num) => parseInt(num));

    const ans = solve(
      R,
      C,
      cases.slice(caseStartIndex + 1, caseStartIndex + R + 1)
    );
    output.push(`Case #${i + 1}: ${ans}`);
    caseStartIndex += R + 1;
  }

  return output.join('\n');
}

///////////////////////////////////
describe('Solution tested on manually input data', () => {
  const givenInput = `3
3 3
101
000
101
1 2
11
5 5
10001
00000
00000
00000
10001`;

  const givenOutput = `Case #1: 1
Case #2: 0
Case #3: 2`;

  // Input whatever values and answers you like here, keeping the formatting from the problem description. Be careful of whitespace -- see the input file in kickstart-IO/ for exact input formatting.
  test('Provided example data', () => {
    const { T, cases } = parse(givenInput);
    expect(solveCases(T, cases)).toBe(givenOutput);
  });

  test('My own test cases', () => {
    const myInput = `1
3 3
101
000
101`;

    const myOutput = `Case #1: 1`;
    const { T, cases } = parse(myInput);
    expect(solveCases(T, cases)).toBe(myOutput);
  });
});

///////////////////////////////////

// Compares the generated output (from bash script piped to solution function) with the provided output
describe('Function on provided input file', () => {
  test('It solves the test input first case', () => {
    expect(generatedOutput).toBe(testOutput);
  });
});
