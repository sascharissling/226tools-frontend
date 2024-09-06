import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterComponent>
      <Link to={"/imprint"}>Imprint</Link>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.colors.olivine};
  color: ${(props) => props.theme.colors.secondary};
  padding: 1rem;
  text-align: center;
  width: 100%;
`;
