import styled from "styled-components";
import { Link } from "react-router-dom";
import instagramSvg from "../../assets/instagram.svg";
import githubSvg from "../../assets/github.svg";
import { FOOTER_HEIGHT_REM } from "../../theme/GlobalStyles.tsx";
import { devices } from "../../theme/theme.ts";

const Footer = () => {
  return (
    <FooterComponent>
      <MadeWith>Made with ☕️ in Cologne 🇩🇪</MadeWith>
      <LinkWrapper>
        <Link to={"/imprint"}>Imprint</Link>
      </LinkWrapper>
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

const LinkWrapper = styled.div`
  grid-area: link;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.colors.lightgray};
  color: ${(props) => props.theme.colors.secondary};
  padding: 0 1rem;
  text-align: center;
  width: 100%;
  align-items: center;
  height: ${FOOTER_HEIGHT_REM}rem;
  display: grid;
  font-size: 0.8rem;
  grid-template-areas:
    "link link link"
    "madeWith madeWith madeWith"
    "social social social";

  @media ${devices.md} {
    grid-template-columns: 1fr 60% 1fr;
    grid-template-areas: "madeWith link social";
  }
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

const MadeWith = styled.div`
  text-align: center;
  grid-area: madeWith;
  color: ${(props) => props.theme.colors.gray};

  @media ${devices.md} {
    text-align: left;
  }
`;

const SocialContainer = styled.div`
  grid-area: social;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media ${devices.md} {
    justify-content: flex-end;
  }
`;
