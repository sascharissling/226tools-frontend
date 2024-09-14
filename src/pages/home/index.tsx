import styled from "styled-components";
import CardGrid from "../../components/card-grid";
import { homeCards } from "./data/homeCards.ts";
import Hero from "./components/Hero.tsx";

const Home = () => {
  return (
    <main>
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
