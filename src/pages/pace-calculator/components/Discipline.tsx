import formatMinutesToHHMMSS from "../../../utils/formatMinutesToHHMMSS.ts";

interface DisciplineProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  totalTime?: number;
  formattedValue?: string;
}
const Discipline = ({
  label,
  value,
  setValue,
  min,
  max,
  step,
  unit,
  totalTime,
  formattedValue,
}: DisciplineProps) => {
  return (
    <label>
      {label}:
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      {formattedValue ?? value} {unit}{" "}
      {totalTime && <strong>({formatMinutesToHHMMSS(totalTime)} h)</strong>}
    </label>
  );
};

export default Discipline;
