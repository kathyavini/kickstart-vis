import { useState, useEffect } from 'react';
import './App.css';
import { Grid } from './components/Grid';

function App() {
  const [gridRows, setGridRows] = useState(5);
  const [gridColumns, setGridColumns] = useState(5);

  return (
    <div className="app">
      <Grid origRows={gridRows} origColumns={gridColumns} />
    </div>
  );
}

export default App;
