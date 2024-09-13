import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <CustomLink to={"/"}>
      <Name>226tools.com</Name>
    </CustomLink>
  );
};

export default Logo;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
`;

const CustomLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primaryDarker};
  }
`;
