import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEnv } from "../../hooks/useEnv.ts";
import styled from "styled-components";
import Logo from "../logo";
import hamburgerSvg from "../../assets/hamburger.svg";
import { breakpoints, devices } from "../../theme/theme.ts";

const HEADER_HEIGHT = "3rem";

const routes = [
  { name: "Home", path: "/" },
  { name: "Pace Calculator", path: "/pace-calculator" },
  { name: "Nutrition Calculator", path: "/nutrition-calculator", isDev: true },
  { name: "Events Map", path: "/events-map", isDev: true },
];

const NavBar = () => {
  const { isDev } = useEnv();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // if browser is resized larger than breakpoint.md, close the menu
    console.log("running");
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
        <HamburgerButton onClick={toggleMenu}>
          <HamburgerImage src={hamburgerSvg} alt="Menu" />
        </HamburgerButton>
        <Navigation isMenuOpen={isMenuOpen}>
          <UL>
            {routes.map((route) => {
              if (route.isDev && !isDev) {
                return null;
              }
              return (
                <LI>
                  <Link to={route.path} onClick={toggleMenu}>
                    {route.name}
                  </Link>
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
  background: ${({ theme }) => theme.colors.whiteLighter};
  height: 3rem;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 3rem;
  padding: 0 1rem;
  justify-content: space-between;
`;

const HamburgerButton = styled.button`
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;

  @media ${devices.md} {
    display: none;
  }
`;

const Navigation = styled.nav<{ isMenuOpen: boolean }>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? "flex" : "none")};
  height: calc(100vh - 3rem);
  position: absolute;
  left: 0;
  top: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.whiteLighter};

  @media ${devices.md} {
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

  @media ${devices.md} {
    flex-direction: row;
    justify-content: start;
  }
`;

const LI = styled.li`
  list-style: none;
`;

const HamburgerImage = styled.img`
  width: 1rem;
  height: 1.5rem;
`;
