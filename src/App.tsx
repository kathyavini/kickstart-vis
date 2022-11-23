import { useState, useEffect } from 'react';
import './styles/App.css';
import { Grid } from './components/Grid';
import { CollapsibleInfo } from './components/CollapsibleInfo';

function App() {
  const [gridRows, setGridRows] = useState(10);
  const [gridColumns, setGridColumns] = useState(10);

  useEffect(() => {
    document.documentElement.style.setProperty('--gridRows', `${gridRows}`);
    document.documentElement.style.setProperty('--gridCols', `${gridColumns}`);
  }, [gridRows, gridColumns]);

  return (
    <div className="app">
      <h1 className="page-title">Parcels Visualizer</h1>
      <CollapsibleInfo />
      <main className="container">
        <Grid gridRows={gridRows} gridColumns={gridColumns} />
      </main>
    </div>
  );
}

export default App;
