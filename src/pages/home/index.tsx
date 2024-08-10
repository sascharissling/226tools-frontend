import { Heading, Text } from "../../components/text";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEnv } from "../../hooks/useEnv.ts";

const Home = () => {
  const { isDev } = useEnv();

  return (
    <Wrapper>
      <Heading as={"h1"}>226tools.com</Heading>
      <Text color={"gray"} paddingTop={1}>
        Tools for long distance triathletes
      </Text>
      <Text color={"gray"}>coming soon</Text>
      <Text color="olivine" paddingTop={4} size={"extraSmall"}>
        Swim · Bike · Run
      </Text>
      {isDev && <Link to={"/"}>Home</Link>}
      {isDev && <Link to={"/nutrition-calculator"}>Nutrition Calculator</Link>}
      {isDev && <Link to={"/pace-calculator"}>Pace Calculator</Link>}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
  align-content: center;
`;
