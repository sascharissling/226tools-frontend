import { useState, ChangeEvent } from "react";
import styled from "styled-components";

const formatTime = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor((totalMinutes * 60) % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const formatMinutesToMMSS = (minutes: number): string => {
  const mins = Math.floor(minutes);
  const secs = Math.floor((minutes - mins) * 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(mins)}:${pad(secs)}`;
};

type Competition = "Sprint" | "Olympic" | "Half Ironman" | "Ironman";

const triathlonLengths = ["Sprint", "Olympic", "Half Ironman", "Ironman"];

const lengths = {
  Sprint: { swim: 0.75, bike: 20, run: 5 },
  Olympic: { swim: 1.5, bike: 40, run: 10 },
  "Half Ironman": { swim: 1.9, bike: 90, run: 21.1 },
  Ironman: { swim: 3.8, bike: 180, run: 42.2 },
};

const PaceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState<Competition>("Ironman");
  const [swimPace, setSwimPace] = useState(2); // minutes per 100m
  const [transition1, setTransition1] = useState(5); // minutes
  const [bikePace, setBikePace] = useState(30); // km/h
  const [transition2, setTransition2] = useState(5); // minutes
  const [runPace, setRunPace] = useState(6); // minutes per km

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLength(event.target.value as Competition);
  };

  const calculateTotalTime = () => {
    const { swim, bike, run } = lengths[selectedLength];
    const swimTime = swim * 10 * swimPace; // in minutes
    const bikeTime = (bike / bikePace) * 60; // in minutes
    const runTime = run * runPace; // in minutes
    const totalTime = swimTime + bikeTime + runTime + transition1 + transition2;
    return Number(totalTime.toFixed(2));
  };

  console.log(lengths[selectedLength].bike / bikePace);

  return (
    <Section>
      <h1>Pace Calculator</h1>
      <div>
        {triathlonLengths.map((length) => (
          <label key={length}>
            <input
              type="radio"
              value={length}
              checked={selectedLength === length}
              onChange={handleLengthChange}
            />
            {length}
          </label>
        ))}
      </div>
      <SliderContainer>
        <label>
          Swim Pace (min/100m):
          <input
            type="range"
            min="1"
            max="5"
            step="0.05"
            value={swimPace}
            onChange={(e) => setSwimPace(Number(e.target.value))}
          />
          {formatMinutesToMMSS(swimPace)} min/100m ///{" "}
          <strong>Total Leg Duration</strong>:{" "}
          {formatTime(lengths[selectedLength].swim * 10 * swimPace)} H
        </label>
        <label>
          Transition 1 (min):
          <input
            type="range"
            min="1"
            max="15"
            step="0.25"
            value={transition1}
            onChange={(e) => setTransition1(Number(e.target.value))}
          />
          {formatMinutesToMMSS(transition1)} min
        </label>
        <label>
          Bike Pace (km/h):
          <input
            type="range"
            min="8"
            max="50"
            step="0.25"
            value={bikePace}
            onChange={(e) => setBikePace(Number(e.target.value))}
          />
          {bikePace} km/h /// <strong>Total Leg Duration</strong>:{" "}
          {formatTime((lengths[selectedLength].bike / bikePace) * 60)} H
        </label>
        <label>
          Transition 2 (min):
          <input
            type="range"
            min="1"
            max="15"
            step="0.25"
            value={transition2}
            onChange={(e) => setTransition2(Number(e.target.value))}
          />
          {formatMinutesToMMSS(transition2)} min
        </label>
        <label>
          Run Pace (min/km):
          <input
            type="range"
            min="3"
            max="10"
            step="0.05"
            value={runPace}
            onChange={(e) => setRunPace(Number(e.target.value))}
          />
          {formatMinutesToMMSS(runPace)} min/km ///{" "}
          <strong>Total Leg Duration</strong>:{" "}
          {formatTime(lengths[selectedLength].run * runPace)} H
        </label>
      </SliderContainer>
      <TotalTime>Total Time: {formatTime(calculateTotalTime())} H</TotalTime>
    </Section>
  );
};

export default PaceCalculator;

const Section = styled.section`
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
