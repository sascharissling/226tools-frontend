import formatMinutesToHHMMSS from "../../../utils/formatMinutesToHHMMSS.ts";
import { Paces } from "../index.tsx";
import { Dispatch, SetStateAction } from "react";
import formatMinutesToMMSS from "../../../utils/formatMinutesToMMSS.ts";
import styled from "styled-components";
import { devices } from "../../../theme/theme.ts";

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
    <Label>
      <span>{getAttributes(name).label}:</span>
      <RangePicker
        type="range"
        value={value}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [name]: +e.target.value }));
        }}
        {...getAttributes(name)}
      />
      <span>
        {getFormattedValue(name, value)}{" "}
        {getTotalLegTime(name, legLength, value) && (
          <strong>({getTotalLegTime(name, legLength, value)} h)</strong>
        )}
      </span>
    </Label>
  );
};

export default Discipline;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media ${devices.md} {
    display: grid;
  }
`;

const RangePicker = styled.input`
  width: 100%;
  height: 0.25rem;
  cursor: pointer;

  @media ${devices.md} {
    width: 50%;
    max-width: 50rem;
  }
`;
