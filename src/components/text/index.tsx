import { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props extends PropsWithChildren {
  as?: "span" | "p";
}
const Text = ({ children, as = "span" }: Props) => {
  return <TextElement as={as}>{children}</TextElement>;
};

export default Text;

const TextElement = styled.span`
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;
