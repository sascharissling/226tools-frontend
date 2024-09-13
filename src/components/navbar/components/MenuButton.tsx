import styled, { css } from "styled-components";
import { devices } from "../../../theme/theme.ts";

const MenuButton = ({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) => {
  return (
    <Button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 50 50"
      >
        <g className="bar-group">
          <Bar
            x="0"
            y={isOpen ? 22.5 : 7.5}
            width="50"
            rotate={isOpen ? "45" : "0"}
            height="5"
            $isOpen={isOpen}
            $position="top"
          ></Bar>
          <Bar
            x="0"
            y="22.5"
            width="50"
            height="5"
            $isOpen={isOpen}
            $position="middle"
            opacity={isOpen ? "0" : "1"}
          ></Bar>
          <Bar
            x={"0"}
            y={isOpen ? 22.5 : 37.5}
            rotate={isOpen ? "-45" : "0"}
            width="50"
            height="5"
            $isOpen={isOpen}
            $position="bottom"
          ></Bar>
        </g>
      </svg>
    </Button>
  );
};

export default MenuButton;

const Button = styled.button`
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  width: 1.25rem;
  height: 1.25rem;

  @media ${devices.lg} {
    display: none;
  }
`;

const Bar = styled.rect<{ $position: string; $isOpen: boolean }>`
  fill: black;
  transition: all 0.5s ease;
  transform-origin: center;

  ${({ $position, $isOpen }) => {
    if ($position === "top" && $isOpen) {
      return css`
        transform: rotate(45deg);
      `;
    } else if ($position === "bottom" && $isOpen) {
      return css`
        transform: rotate(-45deg);
      `;
    } else if ($position === "middle" && $isOpen) {
      return css`
        transition: opacity 0.5s ease;
        opacity: 0;
      `;
    }
  }}
`;
