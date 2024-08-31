import { useState, ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import Discipline from "./components/Discipline.tsx";
import formatMinutesToHHMMSS from "../../utils/formatMinutesToHHMMSS.ts";
import formatMinutesToMMSS from "../../utils/formatMinutesToMMSS.ts";
import { Link } from "react-router-dom";

type Competition = "Sprint" | "Olympic" | "Half Ironman" | "Ironman" | "Custom";

type Length = Record<string, number | undefined>;

const lengths = {
  Sprint: { swim: 750, bike: 20, run: 5 },
  Olympic: { swim: 1500, bike: 40, run: 10 },
  "Half Ironman": { swim: 1900, bike: 90, run: 21.1 },
  Ironman: { swim: 3800, bike: 180, run: 42.2 },
  Custom: { swim: 0, bike: 0, run: 0 },
};

const PaceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState<Length>(lengths.Ironman);
  const [swimPace, setSwimPace] = useState(2);
  const [transition1, setTransition1] = useState(5);
  const [bikePace, setBikePace] = useState(30);
  const [transition2, setTransition2] = useState(5);
  const [runPace, setRunPace] = useState(6);

  console.log(selectedLength);

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLength(lengths[event.target.value as Competition]);
  };

  const totalTime = useMemo(() => {
    const { swim, bike, run } = selectedLength;
    const swimTime = ((swim ?? 0) / 100) * swimPace;
    const bikeTime = ((bike ?? 0) / bikePace) * 60;
    const runTime = (run ?? 0) * runPace;
    const totalTime = swimTime + bikeTime + runTime + transition1 + transition2;
    return formatMinutesToHHMMSS(Number(totalTime.toFixed(2)));
  }, [selectedLength, swimPace, transition1, bikePace, transition2, runPace]);

  const compareLengths = (a: Length, b: Length, lengthName: string) => {
    if (lengthName === "Custom") {
      return !Object.values(lengths).some(
        (l) => a.swim === l.swim && a.bike === l.bike && a.run === l.run,
      );
    }
    return a.swim === b.swim && a.bike === b.bike && a.run === b.run;
  };

  const handleLegChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedLength((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  return (
    <Section>
      <Link to={"/"}>Home</Link>
      <h1>Pace Calculator</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          margin: "1rem 0 1rem",
        }}
      >
        {Object.keys(lengths).map((length) => (
          <label key={length}>
            <input
              type="radio"
              value={length}
              checked={compareLengths(
                selectedLength,
                lengths[length as Competition],
                length,
              )}
              onChange={handleLengthChange}
            />
            {length}
          </label>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <label>
          <input
            type="number"
            name="swim"
            value={selectedLength.swim}
            placeholder="Swim length"
            onChange={handleLegChange}
          />
          m
        </label>
        <label>
          <input
            type="number"
            name="bike"
            value={selectedLength.bike}
            placeholder="Bike length"
            onChange={handleLegChange}
          />
          km
        </label>
        <label>
          <input
            type="number"
            name="run"
            value={selectedLength.run}
            placeholder="Run length"
            onChange={handleLegChange}
          />
          km
        </label>
      </div>
      <SliderContainer>
        <Discipline
          label="Swim Pace"
          value={swimPace}
          setValue={setSwimPace}
          min={1}
          max={5}
          step={0.05}
          unit="min/100m"
          formattedValue={formatMinutesToMMSS(swimPace)}
          totalTime={((selectedLength.swim ?? 0) / 100) * swimPace}
        />
        <Discipline
          label="Transition 1"
          value={transition1}
          setValue={setTransition1}
          min={1}
          max={15}
          step={0.25}
          unit="min"
          formattedValue={formatMinutesToMMSS(transition1)}
        />
        <Discipline
          label="Bike Pace (km/h):"
          value={bikePace}
          setValue={setBikePace}
          min={5}
          max={55}
          step={0.25}
          unit="km/h"
          totalTime={((selectedLength.bike ?? 0) / bikePace) * 60}
        />
        <Discipline
          label="Transition 2"
          value={transition2}
          setValue={setTransition2}
          min={1}
          max={15}
          step={0.25}
          unit="min"
          formattedValue={formatMinutesToMMSS(transition2)}
        />
        <Discipline
          label="Run Pace (min/km)"
          value={runPace}
          setValue={setRunPace}
          min={3}
          max={10}
          step={0.05}
          unit="min/km"
          formattedValue={formatMinutesToMMSS(runPace)}
          totalTime={(selectedLength.run ?? 0) * runPace}
        />
      </SliderContainer>
      <TotalTime>Total Time: {totalTime} H</TotalTime>
    </Section>
  );
};

export default PaceCalculator;

const Section = styled.section`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.whiteLighter};
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const TotalTime = styled.div`
  margin-top: 1rem;
  font-weight: bold;
`;
