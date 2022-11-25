import * as Slider from '@radix-ui/react-slider';

interface SliderProps {
  label: string;
  value: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

export const DimensionSlider = ({ label, value, setState }: SliderProps) => {
  const onValueChange = (value: number[]) => {
    setState(value[0]);
  };
  return (
    <form>
      <div className="controls-row">
        <label className="slider-label">{label}:</label>
        <Slider.Root
          className="SliderRoot"
          defaultValue={[5]}
          min={2}
          max={10}
          step={1}
          aria-label={label}
          value={[value]}
          onValueChange={(value) => onValueChange(value)}>
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
      </div>
    </form>
  );
};
