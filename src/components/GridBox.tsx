interface GridBoxProps {
  state: boolean;
  toggleState: () => void;
  distance: number;
}
export function GridBox({ state, toggleState, distance }: GridBoxProps) {
  return (
    <div
      className="box"
      data-state={state ? 'on' : 'off'}
      onClick={toggleState}
      data-dist={distance}
    ></div>
  );
}
