import formatMinutesToHHMMSS from "../../../utils/formatMinutesToHHMMSS.ts";
import { Paces } from "../index.tsx";
import { Dispatch, SetStateAction } from "react";
import formatMinutesToMMSS from "../../../utils/formatMinutesToMMSS.ts";

const getAttributes = (name: string) => {
  switch (name) {
    case "swim":
      return {
        min: 0.5,
        max: 5,
        step: 0.05,
        unit: "min/100m",
        label: "Swim Pace",
      };
    case "bike":
      return { min: 5, max: 60, step: 0.05, unit: "km/h", label: "Bike Pace" };
    case "run":
      return { min: 1, max: 15, step: 0.05, unit: "min/km", label: "Run Pace" };
    case "transition1":
      return {
        min: 0,
        max: 15,
        step: 0.25,
        unit: "min",
        label: "Transition 1",
      };
    case "transition2":
      return {
        min: 0,
        max: 15,
        step: 0.25,
        unit: "min",
        label: "Transition 2",
      };
    default:
      return { min: 0, max: 0, step: 0, unit: "", label: "" };
  }
};

const getFormattedValue = (name: string, value: number) => {
  switch (name) {
    case "swim":
      return `${formatMinutesToMMSS(value)} min/100m`;
    case "bike":
      return `${value} km/h`;
    case "run":
      return `${formatMinutesToMMSS(value)} min/km`;
    case "transition1":
    case "transition2":
      return `${formatMinutesToMMSS(value)} min`;
    default:
      return "";
  }
};

const getTotalLegTime = (name: string, length: number, pace: number) => {
  switch (name) {
    case "swim":
      return formatMinutesToHHMMSS((length / 100) * pace);
    case "bike":
      return formatMinutesToHHMMSS((length / pace) * 60);
    case "run":
      return formatMinutesToHHMMSS(length * pace);
    default:
      return null;
  }
};

interface DisciplineProps {
  value: number;
  setValue: Dispatch<SetStateAction<Paces>>;
  name: string;
  legLength: number;
  totalTime?: number;
}
const Discipline = ({ value, name, setValue, legLength }: DisciplineProps) => {
  return (
    <label>
      {getAttributes(name).label}:
      <input
        type="range"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [name]: +e.target.value }))
        }
        {...getAttributes(name)}
        style={{ width: "30%" }}
      />
      {getFormattedValue(name, value)}{" "}
      {getTotalLegTime(name, legLength, value) && (
        <strong>({getTotalLegTime(name, legLength, value)} h)</strong>
      )}
    </label>
  );
};

export default Discipline;
