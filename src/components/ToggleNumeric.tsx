import * as Switch from '@radix-ui/react-switch';

export const ToggleNumeric = ({ setShowValues }: any) => {
  const handleToggle = (ev: Boolean) => {
    setShowValues(ev);
  };

  return (
    <form>
      <div className="toggle-row">
        <label className="Label" htmlFor="show-numeric">
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
