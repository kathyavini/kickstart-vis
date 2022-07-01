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
  return (
    <div
      className="box"
      data-state={state ? 'on' : 'off'}
      onClick={toggleState}
      data-dist={distance}
    >
      <p className="dist-label">
        {distance && distance < maxDist ? distance : ''}
      </p>
    </div>
  );
}
