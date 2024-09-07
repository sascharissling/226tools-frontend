import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useFooterContext } from "../../contexts/footer-context";

const Footer = () => {
  const { shouldPlaceAtBottom } = useFooterContext();

  return (
    <FooterComponent shouldPlaceAtBottom={shouldPlaceAtBottom}>
      <Link to={"/imprint"}>Imprint</Link>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer<{ shouldPlaceAtBottom: boolean }>`
  background-color: ${(props) => props.theme.colors.olivine};
  color: ${(props) => props.theme.colors.secondary};
  padding: 1rem;
  text-align: center;
  width: 100%;

  ${(props) =>
    props.shouldPlaceAtBottom
      ? css`
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50px;
        `
      : ""};
`;
