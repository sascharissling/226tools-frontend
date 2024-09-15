import styled from "styled-components";
import CardGrid from "../../components/card-grid";
import { homeCards } from "./data/homeCards.ts";
import Hero from "./components/Hero.tsx";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <main>
      <Helmet>
        <meta
          name="description"
          content="226Tools.com helps triathletes improve race performance with tools like the Pace Calculator. Coming soon: Nutrition Calculator and Race Maps to enhance your triathlon training and race day success."
        />
      </Helmet>

      <Hero />
      <Wrapper>
        <CardGrid content={homeCards} />
      </Wrapper>
    </main>
  );
};

export default Home;

const Wrapper = styled.section`
  display: grid;
  gap: 2rem;
  padding: 1rem;
`;
