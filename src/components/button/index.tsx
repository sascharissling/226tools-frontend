import styled, { css } from "styled-components";
import { ComponentProps, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props extends Omit<ComponentProps<"button">, "style"> {
  children: ReactNode;
  style?: "primary" | "secondary" | "link" | "nav-link" | "link-button";
  to?: string;
  href?: string;
  lowercase?: boolean;
  letterSpacing?: boolean;
}

const Button = ({
  style = "primary",
  children,
  to,
  href,
  lowercase,
  letterSpacing,
  ...rest
}: Props) => {
  if (to) {
    return (
      <LinkComponent
        to={to}
        $style={style}
        $lowercase={lowercase}
        $letterSpacing={letterSpacing}
        onClick={
          rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement>
        }
      >
        {children}
      </LinkComponent>
    );
  }

  if (href) {
    return <a href={href}>{children}</a>;
  }

  return (
    <ButtonComponent
      $style={style}
      $lowercase={lowercase}
      $letterSpacing={letterSpacing}
      {...rest}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;

const ButtonComponent = styled.button<{
  $style: "primary" | "secondary" | "link" | "nav-link" | "link-button";
  $lowercase?: boolean;
  $letterSpacing?: boolean;
}>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border: 0;
  border-radius: 0.625rem;
  font-weight: ${(props) => (props.$style === "nav-link" ? 400 : 700)};
  line-height: 1.25rem;
  text-transform: uppercase;

  ${(props) =>
    props.$lowercase &&
    css`
      text-transform: none;
    `};

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDarker};
  }
`;

const LinkComponent = styled(Link)<{
  $style: "primary" | "secondary" | "link" | "nav-link" | "link-button";
  $lowercase?: boolean;
  $letterSpacing?: boolean;
}>`
  color: ${(props) => {
    switch (props.$style) {
      case "primary":
        return props.theme.colors.primary;
      case "secondary":
        return props.theme.colors.white;
      case "link":
        return props.theme.colors.primary;
      case "nav-link":
        return props.theme.colors.darkGray;
    }
  }};
  text-decoration: none;
  font-weight: ${(props) => (props.$style === "nav-link" ? 400 : 700)};
  text-transform: uppercase;
  font-size: 0.875rem;

  ${(props) =>
    props.$letterSpacing &&
    css`
      letter-spacing: 0.05rem;
    `};

  ${(props) =>
    props.$lowercase &&
    css`
      text-transform: none;
    `};

  ${(props) =>
    props.$style === "link-button" &&
    css`
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      border-radius: 0.625rem;
    `}

  &:hover {
    color: ${(props) => props.theme.colors.primaryDarker};
  }
`;
