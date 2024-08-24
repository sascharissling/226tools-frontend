import { useState, ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import Discipline from "./components/Discipline.tsx";
import formatMinutesToHHMMSS from "../../utils/formatMinutesToHHMMSS.ts";
import formatMinutesToMMSS from "../../utils/formatMinutesToMMSS.ts";
import { Link } from "react-router-dom";

type Competition = "Sprint" | "Olympic" | "Half Ironman" | "Ironman" | "Custom";

const triathlonLengths = [
  "Sprint",
  "Olympic",
  "Half Ironman",
  "Ironman",
  "Custom",
];

const lengths = {
  Sprint: { swim: 0.75, bike: 20, run: 5 },
  Olympic: { swim: 1.5, bike: 40, run: 10 },
  "Half Ironman": { swim: 1.9, bike: 90, run: 21.1 },
  Ironman: { swim: 3.8, bike: 180, run: 42.2 },
  Custom: { swim: 0, bike: 0, run: 0 },
};

interface Length {
  swim: number;
  bike: number;
  run: number;
}

const PaceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState<Length>(lengths.Ironman);
  const [swimPace, setSwimPace] = useState(2);
  const [transition1, setTransition1] = useState(5);
  const [bikePace, setBikePace] = useState(30);
  const [transition2, setTransition2] = useState(5);
  const [runPace, setRunPace] = useState(6);

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLength(lengths[event.target.value as Competition]);
  };

  const totalTime = useMemo(() => {
    const { swim, bike, run } = selectedLength;
    const swimTime = swim * 10 * swimPace;
    const bikeTime = (bike / bikePace) * 60;
    const runTime = run * runPace;
    const totalTime = swimTime + bikeTime + runTime + transition1 + transition2;
    return formatMinutesToHHMMSS(Number(totalTime.toFixed(2)));
  }, [selectedLength, swimPace, transition1, bikePace, transition2, runPace]);

  return (
    <Section>
      <Link to={"/"}>Home</Link>
      <h1>Pace Calculator</h1>
      Swim:{" "}
      <div>
        {Object.keys(lengths).map((length) => (
          <label key={length}>
            <input
              type="radio"
              value={length}
              checked={selectedLength.swim === lengths[length].swim}
              onChange={handleLengthChange}
            />
            {length}
          </label>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px 100px 100px",
          gap: "1rem",
        }}
      >
        <div>
          <input value={lengths[selectedLength].swim * 1000} /> m
        </div>
        <div>
          <input value={lengths[selectedLength].bike} />
          km
        </div>
        <div>
          <input value={lengths[selectedLength].run} /> km
        </div>
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
          totalTime={lengths[selectedLength].swim * 10 * swimPace}
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
          totalTime={(lengths[selectedLength].bike / bikePace) * 60}
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
          totalTime={lengths[selectedLength].run * runPace}
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
