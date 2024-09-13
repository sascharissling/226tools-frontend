import { Text } from "../../components/text";
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
        <Text
          $color="lightgray"
          $paddingTop={4}
          $size="extraSmall"
          $align="center"
        >
          Swim · Bike · Run
        </Text>
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
