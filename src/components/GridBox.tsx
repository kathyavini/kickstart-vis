import { useContext } from 'react';
import { GridContext } from '../App';

interface GridBoxProps {
  state: boolean;
  toggleState: () => void;
  distance: number;
  maxDist: number;
}
export function GridBox({
  state,
  toggleState,
  distance,
  maxDist,
}: GridBoxProps) {
  const gridContext = useContext(GridContext);
  return (
    <div
      className="box"
      data-state={state ? 'on' : 'off'}
      onClick={toggleState}
      data-dist={distance}>
      <p
        className="dist-label"
        style={
          gridContext.showValues ? { display: 'block' } : { display: 'none' }
        }>
        {distance && distance < maxDist ? distance : ''}
      </p>
    </div>
  );
}
