import { useState } from 'react';
import './styles/App.css';
import './styles/switch.css';
import './styles/slider.css';
import { Grid } from './components/Grid';
import { CollapsibleInfo } from './components/CollapsibleInfo';
import { NumericToggle } from './components/NumericToggle';
import { DimensionSlider } from './components/DimensionSlider';

function App() {
  const [gridRows, setGridRows] = useState(8);
  const [gridColumns, setGridColumns] = useState(8);
  const [showValues, setShowValues] = useState(false);

  return (
    <div className="app">
      <h1 className="page-title">Parcels Visualizer</h1>

      <CollapsibleInfo />
      <div className="slider-controls">
        <DimensionSlider label="rows" value={gridRows} setState={setGridRows} />
        <DimensionSlider
          label="columns"
          value={gridColumns}
          setState={setGridColumns}
        />
      </div>
      <main className={`grid-container ${showValues ? 'show-values' : ''}`}>
        <Grid
          gridRows={gridRows}
          gridColumns={gridColumns}
          key={`r${gridRows}c${gridColumns}`}
        />
        <NumericToggle setShowValues={setShowValues} />
      </main>
    </div>
  );
}

export default App;
