import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [shouldPlaceAtBottom, setShouldPlaceAtBottom] = useState(false);

  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) {
      return;
    }
    const handlePositioning = () => {
      setShouldPlaceAtBottom(mainEl.clientHeight < window.innerHeight);
    };

    handlePositioning();
    window.addEventListener("resize", handlePositioning);

    return () => {
      window.removeEventListener("resize", handlePositioning);
    };
  }, [setShouldPlaceAtBottom]);

  return (
    <FooterComponent shouldPlaceAtBottom={shouldPlaceAtBottom}>
      <Link to={"/imprint"}>Imprint</Link>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.footer<{ shouldPlaceAtBottom: boolean }>`
  background-color: ${(props) => props.theme.colors.lightgray};
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
