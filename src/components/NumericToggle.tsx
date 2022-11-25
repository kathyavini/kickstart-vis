import * as Switch from '@radix-ui/react-switch';

export const NumericToggle = ({ setShowValues }: any) => {
  const handleToggle = (ev: Boolean) => {
    setShowValues(ev);
  };

  return (
    <form>
      <div className="controls-row">
        <label className="Label switch-label" htmlFor="show-numeric">
          Show Numeric Values
        </label>
        <Switch.Root
          className="SwitchRoot"
          id="show-numeric"
          onCheckedChange={(ev) => handleToggle(ev)}>
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>
    </form>
  );
};
