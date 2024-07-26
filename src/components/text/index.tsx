import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Theme } from "../../theme/theme.ts";

interface TextProps extends PropsWithChildren {
  as?: "span" | "p";
  color?: keyof Theme["colors"];
  size?: keyof Theme["fontSizes"];
  paddingTop?: number;
  paddingBottom?: number;
}
export const Text = (props: TextProps) => {
  return <TextElement {...props}>{props.children}</TextElement>;
};

const TextElement = styled.span<TextProps>`
  font-size: ${(props) =>
    props.size
      ? props.theme.fontSizes[props.size]
      : props.theme.fontSizes.small};
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  padding-top: ${(props) => props.paddingTop}rem;
  padding-bottom: ${(props) => props.paddingBottom}rem;
`;

interface HeaderProps extends PropsWithChildren {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  paddingTop?: number;
  paddingBottom?: number;
}

export const Heading = (props: HeaderProps) => {
  return <HeadlineComponent {...props}>{props.children}</HeadlineComponent>;
};

const HeadlineComponent = styled.h1<HeaderProps>`
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  padding-top: ${(props) => props.paddingTop}rem;
  padding-bottom: ${(props) => props.paddingBottom}rem;
`;
