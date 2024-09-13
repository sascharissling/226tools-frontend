import swimExitImg from "../../../assets/swim-exit.jpg";
import HeaderGroup from "../../../components/header-group";
import styled from "styled-components";
import Button from "../../../components/button";

const Hero = () => {
  return (
    <Section>
      <img src={swimExitImg} alt="swim exit"></img>
      <HeaderGroup
        as="h1"
        headline="Improve your next triathlon"
        subHeadline={
          <Button to="/pace-calculator" style="link-button" letterSpacing>
            Calculate your pace
          </Button>
        }
      />
    </Section>
  );
};

export default Hero;

const Section = styled.section`
  height: 36rem;
  width: 100%;
  position: relative;

  hgroup {
    position: absolute;
    background: white;
    bottom: 3rem;
    left: 3rem;
    padding: 1rem 1rem 1.5rem;
    border-radius: 0.5rem;
  }

  h1 {
    text-transform: uppercase;
    padding: 0 0 1rem 0;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: brightness(0.9) contrast(1.2) sepia(0.2) saturate(1.5);
  }
`;
