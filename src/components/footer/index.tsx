import styled from "styled-components";
import { Link } from "react-router-dom";
import { FOOTER_HEIGHT_REM } from "../../theme/GlobalStyles.tsx";
import { devices } from "../../theme/theme.ts";
import SocialLink from "../social-link";

const Footer = () => {
  return (
    <FooterComponent>
      <MadeWith>Made with ☕️ in Cologne 🇩🇪</MadeWith>
      <LinkWrapper>
        <Link to={"/imprint"}>Imprint</Link>
        <Link to={"/privacy-policy"}>Privacy Policy</Link>
      </LinkWrapper>
      <SocialContainer>
        <SocialLink type="github" />
        <SocialLink type="instagram" />
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
  gap: 0.5rem;
`;

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.darkGray};
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

const MadeWith = styled.div`
  text-align: center;
  grid-area: madeWith;
  color: ${(props) => props.theme.colors.darkGray};

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
