import { Link } from "react-router-dom";
import { useEnv } from "../../hooks/useEnv.ts";
import styled from "styled-components";
import Logo from "../logo";

const NavBar = () => {
  const { isDev } = useEnv();

  return (
    <HeaderBar>
      <Inner>
        <Logo />
        <Navigation>
          <UL>
            <LI>
              <Link to={"/"}>Home</Link>
            </LI>
            <LI>
              <Link to={"/pace-calculator"}>Pace Calculator</Link>
            </LI>
            {isDev && (
              <>
                <LI>
                  <Link to={"/nutrition-calculator"}>Nutrition Calculator</Link>
                </LI>
                <LI>
                  <Link to={"/events-map"}>Events Map</Link>
                </LI>
              </>
            )}
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
  padding: 1rem;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 3rem;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const UL = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LI = styled.li`
  list-style: none;
`;
