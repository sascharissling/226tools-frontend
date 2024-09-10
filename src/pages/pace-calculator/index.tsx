import { useState, ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import Discipline from "./components/Discipline.tsx";
import formatMinutesToHHMMSS from "../../utils/formatMinutesToHHMMSS.ts";
import { devices } from "../../theme/theme.ts";
import FAQ from "../../components/faq";
import Meta from "./components/Meta.tsx";
import HeaderGroup from "../../components/header-group";

type Competition = "Sprint" | "Olympic" | "Half Ironman" | "Ironman" | "Custom";
type Length = Record<string, number | undefined>;
const faqs = [
  {
    question: "How accurate is the triathlon pace calculator?",
    answer:
      "The pace calculator gives you a good estimate based on your input data. However, factors like weather, terrain, and race-day conditions can affect your actual race times.",
  },
  {
    question: "Can I use this calculator for other triathlon distances?",
    answer:
      "Yes! You can select from common distances like Sprint, Olympic, Half Ironman, and Ironman, or enter custom distances for other events.",
  },
  {
    question: "What is a good pace for an Ironman?",
    answer:
      "A 'good' pace is different for every athlete. Generally, pacing should be conservative on the swim and bike to save energy for the marathon run. You should aim to stick to your training zones and focus on maintaining a steady effort throughout.",
  },
  {
    question: "How can I improve my transition times?",
    answer:
      "Practice makes perfect. Practicing your transitions during training, such as quickly switching from your wetsuit to bike gear or bike shoes to running shoes, can help shave valuable seconds off your overall time.",
  },
  {
    question: "How should I pace myself during a half-Ironman?",
    answer:
      "In a Half Ironman, pacing is key to finishing strong. Keep your swim relaxed, maintain a conservative effort on the bike (about 70-75% of your FTP), and start your run at a comfortable pace, gradually building speed if you're feeling good.",
  },
  {
    question: "What factors can affect my race-day pacing?",
    answer:
      "Several factors can influence your pacing, including race-day weather (wind, temperature), course terrain (hilly or flat), and nutrition/hydration strategy. It's important to adjust your plan based on these conditions.",
  },
];

const lengths: Record<Competition, Length> = {
  Sprint: { swim: 750, bike: 20, run: 5 },
  Olympic: { swim: 1500, bike: 40, run: 10 },
  "Half Ironman": { swim: 1900, bike: 90, run: 21.1 },
  Ironman: { swim: 3800, bike: 180, run: 42.2 },
  Custom: { swim: 0, bike: 0, run: 0 },
};

export interface Paces {
  swim: number;
  transition1: number;
  bike: number;
  transition2: number;
  run: number;
}

const PaceCalculator = () => {
  const [selectedLength, setSelectedLength] = useState<Length>(lengths.Ironman);
  const [paces, setPaces] = useState<Paces>({
    swim: 2,
    transition1: 5,
    bike: 30,
    transition2: 5,
    run: 6,
  });

  const handleLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLength(lengths[event.target.value as Competition]);
  };

  const totalTime = useMemo(() => {
    const { swim, bike, run } = selectedLength;
    const swimTime = ((swim ?? 0) / 100) * paces.swim;
    const bikeTime = ((bike ?? 0) / paces.bike) * 60;
    const runTime = (run ?? 0) * paces.run;
    const totalTime =
      swimTime + paces.transition1 + bikeTime + paces.transition2 + runTime;
    return formatMinutesToHHMMSS(Number(totalTime.toFixed(2)));
  }, [
    selectedLength,
    paces.swim,
    paces.transition1,
    paces.bike,
    paces.transition2,
    paces.run,
  ]);

  const getIsChecked = (a: Length, b: Length, lengthName: string) => {
    if (lengthName === "Custom") {
      const isCustom = !Object.values(lengths).some(
        (l) => a.swim === l.swim && a.bike === l.bike && a.run === l.run,
      );
      return (
        isCustom || (a.swim === b.swim && a.bike === b.bike && a.run === b.run)
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
    <Main>
      <Meta />
      <HeaderGroup
        as="h1"
        headline="Triathlon Pace Calculator"
        subHeadline="Optimize Your Ironman, Half Ironman, Olympic, and Sprint Triathlon
          Strategy"
      />
      <Section $hasBackground $hasBorder>
        <Wrapper>
          <DisciplinesContainer>
            {Object.keys(lengths).map((competition) => (
              <label key={competition}>
                <input
                  type="radio"
                  value={competition}
                  checked={getIsChecked(
                    selectedLength,
                    lengths[competition as Competition],
                    competition,
                  )}
                  onChange={handleLengthChange}
                />
                {competition}
              </label>
            ))}
          </DisciplinesContainer>
          <LengthsContainer>
            {Object.keys(selectedLength).map((key) => (
              <label key={key}>
                <input
                  type="number"
                  name={key}
                  value={selectedLength[key as keyof Length]}
                  placeholder={`${key} length`}
                  onChange={handleLegChange}
                />
                {key === "swim" ? "m" : "km"}
              </label>
            ))}
          </LengthsContainer>
        </Wrapper>
        <SliderContainer>
          {Object.keys(paces).map((key) => (
            <Discipline
              key={key}
              value={paces[key as keyof Paces]}
              name={key}
              setValue={setPaces}
              legLength={selectedLength[key as keyof Length] ?? 0}
              totalTime={
                ((selectedLength[key as keyof Length] ?? 0) / 100) *
                paces[key as keyof Paces]
              }
            />
          ))}
        </SliderContainer>
        <TotalTime>Total Time: {totalTime} H</TotalTime>
        <FootNote>
          Inspired by{" "}
          <a href="https://www.triathloncalculators.com/" target="_blank">
            https://www.triathloncalculators.com/
          </a>
        </FootNote>
      </Section>
      <Section>
        <article>
          <p>
            Planning your race pace is one of the most crucial aspects of
            preparing for a triathlon, whether you're racing in a Sprint,
            Olympic, Half Ironman, or full Ironman. Our free triathlon pace
            calculator helps you determine the ideal pacing for your swim, bike,
            and run splits, allowing you to plan a well-executed race strategy
            and improve your overall performance.
          </p>
        </article>
      </Section>

      <FAQ faqs={faqs} />
    </Main>
  );
};

export default PaceCalculator;

const Section = styled.section<{
  $hasBackground?: boolean;
  $hasBorder?: boolean;
}>`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;

  ${(props) =>
    props.$hasBackground &&
    `
    background-color: ${props.theme.colors.whiteLighter};
  `}

  ${(props) =>
    props.$hasBorder &&
    `
        border: 1px solid ${props.theme.colors.lightgray};
    `}
`;

const FootNote = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.5rem;
  margin-top: 2rem;
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

const DisciplinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 1rem;

  @media ${devices.md} {
    flex-direction: row;
    input {
    }
  }
`;

const LengthsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 1rem;
  input {
    width: 4rem;
    margin-right: 0.5rem;
  }

  @media ${devices.md} {
    flex-direction: row;
    input {
      width: 6rem;
      margin-right: 0.5rem;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 1rem;

  @media ${devices.md} {
    flex-direction: column;
    gap: 0;
  }
`;

const Main = styled.main`
  @media ${devices.md} {
    max-width: 50rem;
    margin: 0 auto;
  }
`;
