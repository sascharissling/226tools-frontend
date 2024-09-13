import { HeaderProps, Heading, Text } from "../text";
import styled from "styled-components";
import { ReactNode } from "react";

const HeaderGroup = ({
  as,
  headline,
  subHeadline,
  align = "left",
}: {
  as: HeaderProps["as"];
  headline: string;
  subHeadline: ReactNode;
  align?: "center" | "left" | "right";
}) => {
  return (
    <HGROUP $align={align}>
      <Heading as={as} $paddingTop={1} $paddingBottom={0.5} $color="primary">
        {headline}
      </Heading>
      <Text $color="darkGray" $paddingTop={0}>
        {subHeadline}
      </Text>
    </HGROUP>
  );
};

export default HeaderGroup;

const HGROUP = styled.hgroup<{ $align: string }>`
  padding: 0 1rem;
  text-align: ${(props) => props.$align};
`;
