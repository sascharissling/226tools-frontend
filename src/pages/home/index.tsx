import { Heading, Text } from "../../components/text";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Heading as={"h1"}>226tools.com</Heading>
      <Text color={"gray"} paddingTop={1} align="center">
        Tools for long distance triathletes
      </Text>
      <Text color="olivine" paddingTop={4} size={"extraSmall"} align="center">
        Swim · Bike · Run
      </Text>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  align-content: center;
  padding-top: 3rem;
`;
