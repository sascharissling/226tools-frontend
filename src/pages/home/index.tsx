import { Text } from "../../components/text";
import styled from "styled-components";
import HeaderGroup from "../../components/header-group";
import CardGrid from "../../components/card-grid";
import { homeCards } from "./data/homeCards.ts";

const Home = () => {
  return (
    <main>
      <Wrapper>
        <HeaderGroup
          as="h1"
          headline="226tools.com"
          subHeadline="Tools for long distance triathletes"
          align="center"
        />
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
