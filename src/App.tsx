import { useState, useEffect, createContext } from 'react';
import './styles/App.css';
import './styles/ToggleNumeric.css';
import { Grid } from './components/Grid';
import { CollapsibleInfo } from './components/CollapsibleInfo';
import { ToggleNumeric } from './components/ToggleNumeric';

export const GridContext = createContext({ showValues: false });

function App() {
  const [gridRows, setGridRows] = useState(10);
  const [gridColumns, setGridColumns] = useState(10);

  const [showValues, setShowValues] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--gridRows', `${gridRows}`);
    document.documentElement.style.setProperty('--gridCols', `${gridColumns}`);
  }, [gridRows, gridColumns]);

  return (
    <div className="app">
      <h1 className="page-title">Parcels Visualizer</h1>
      <CollapsibleInfo />
      <main className="container">
        <GridContext.Provider value={{ showValues }}>
          <Grid gridRows={gridRows} gridColumns={gridColumns} />
        </GridContext.Provider>
        <div className="controls">
          <ToggleNumeric setShowValues={setShowValues} />
        </div>
      </main>
    </div>
  );
}

export default App;
