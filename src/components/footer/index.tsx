import styled from "styled-components";
import { Link } from "react-router-dom";
import instagramSvg from "../../assets/instagram.svg";
import githubSvg from "../../assets/github.svg";

const Footer = () => {
  return (
    <FooterComponent>
      <EmptySpace />
      <Link to={"/imprint"}>Imprint</Link>
      <SocialContainer>
        <SocialLink href={"https://instagram.com/430legsup"} target="_blank">
          <SocialImage src={instagramSvg} alt="Instagram" />
        </SocialLink>
        <SocialLink href={"https://github.com/sascharissling"} target="_blank">
          <SocialImage src={githubSvg} alt="Github" />
        </SocialLink>
      </SocialContainer>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.colors.lightgray};
  color: ${(props) => props.theme.colors.secondary};
  padding: 0 1rem;
  text-align: center;
  width: 100%;
  align-items: center;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 60% 1fr;
  grid-template-areas: "empty link social";
`;

const SocialLink = styled.a`
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const SocialImage = styled.img`
  width: 1rem;
  height: 1rem;
`;

const EmptySpace = styled.div`
  grid-area: empty;
`;

const SocialContainer = styled.div`
  grid-area: social;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
