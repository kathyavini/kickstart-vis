export function Info() {
  return (
    <div className="info">
      <p>
        This is a visual aid for the{' '}
        <span>2022 Google Coding Practice with Kick Start</span> Session #2
        problem "Parcels"
      </p>

      <p>
        The full problem is available online:{' '}
        <a href="https://codingcompetitions.withgoogle.com/kickstart/round/00000000008f4a94/0000000000b55465">
          Coding Practice with Kick Start Session #2 - Parcels
        </a>
        . Solutions can still be submitted and run against the test cases.
      </p>
      <h2>How to use the visualizer</h2>
      <p>
        The grid is a visual representation of the Manhattan distance from any
        given square to the nearest delivery office. Click on a square to toggle
        placing a delivery office there. Brighter colors indicate closer
        distances. Displaying the exact numeric distance can be turned on and
        off using the switch.
      </p>
      <h2>Solution code</h2>
      <p>
        A brute-force solution to the coding challenge (using the same algorithm
        that colors this grid) can be found in this repository under the{' '}
        <code className="code">solutions/</code>
        directory. See the repository{' '}
        <a href="https://github.com/kathyavini/kickstart-vis/" target="_blank">
          readme.md
        </a>{' '}
        for details.
      </p>
    </div>
  );
}
