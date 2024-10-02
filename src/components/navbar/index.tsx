import { useCallback, useEffect, useState } from "react";
import { useEnv } from "../../hooks/useEnv.ts";
import styled from "styled-components";
import Logo from "../logo";
import { breakpoints, devices } from "../../theme/theme.ts";
import MenuButton from "./components/MenuButton.tsx";
import { HEADER_HEIGHT_REM } from "../../theme/GlobalStyles.tsx";
import Button from "../button/index.tsx";

const routes = [
  { name: "Home", path: "/" },
  { name: "Pace Calculator", path: "/pace-calculator" },
  { name: "Blog", path: "/blog", isDev: true },
  { name: "Nutrition Calculator", path: "/nutrition-calculator", isDev: true },
  { name: "Events Map", path: "/events-map" },
  { name: "Race Trace", path: "/race-trace", isDev: true, isGold: true },
];

const NavBar = () => {
  const { isDev } = useEnv();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > breakpoints.md) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <HeaderBar>
      <Inner>
        <Logo />
        <MenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
        <Navigation $isMenuOpen={isMenuOpen}>
          <UL>
            {routes.map((route) => {
              if (route.isDev && !isDev) {
                return null;
              }
              return (
                <LI key={route.path}>
                  <Button
                    letterSpacing
                    style={route.isGold ? "primary" : "nav-link"}
                    to={route.path}
                    onClick={toggleMenu}
                  >
                    {route.name}
                  </Button>
                </LI>
              );
            })}
          </UL>
        </Navigation>
      </Inner>
    </HeaderBar>
  );
};

export default NavBar;

const HeaderBar = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT_REM}rem;
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  gap: 3rem;
  padding: 0 1rem;
  justify-content: space-between;
`;

const Navigation = styled.nav<{ $isMenuOpen: boolean }>`
  display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
  height: calc(100vh - 3rem);
  position: absolute;
  left: 0;
  top: ${HEADER_HEIGHT_REM}rem;
  width: 100%;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${devices.lg} {
    position: initial;
    display: block;
    height: 100%;
  }
`;

const UL = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0;

  @media ${devices.lg} {
    flex-direction: row;
    justify-content: end;
  }
`;

const LI = styled.li`
  list-style: none;
`;
