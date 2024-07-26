import { Heading } from "../../components/text";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <Heading as={"h1"}>226tools.com</Heading>
      <Link to={"/nutrition-calculator"}>Nutrition Calculator</Link>
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
