import { Heading, Text } from "../../components/text";
import Breakfast from "../../components/breakfast";
import styled from "styled-components";
import BikeNutrition from "../../components/bike-nutrition";

const NutritionCalculator = () => {
  return (
    <Main>
      <div>
        <Heading as="h1" $paddingTop={1} $paddingBottom={1}>
          Triathlon Nutrition Calculator
        </Heading>
        <Text $color="gray">
          inspired by James LeBaigue's course on long distance triathlon
          nutrition
        </Text>
      </div>

      <Breakfast />
      <BikeNutrition />
    </Main>
  );
};

export default NutritionCalculator;

const Main = styled.div`
  padding: 1em;
  display: grid;
  gap: 3rem;
`;
