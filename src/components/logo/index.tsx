import logoSvg from "./components/logo.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <Image src={logoSvg} />
    </Link>
  );
};

export default Logo;

const Image = styled.img`
  width: 10rem;
  height: 3rem;
`;
