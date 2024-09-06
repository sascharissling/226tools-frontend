import logoSvg from "./components/logo.svg";
import styled from "styled-components";

const Logo = () => {
  return <Image src={logoSvg} />;
};

export default Logo;

const Image = styled.img`
  width: 10rem;
  height: 3rem;
`;
