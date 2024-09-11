import { HeaderProps, Heading, Text } from "../text";
import styled from "styled-components";

const HeaderGroup = ({
  as,
  headline,
  subHeadline,
  align = "left",
}: {
  as: HeaderProps["as"];
  headline: string;
  subHeadline: string;
  align?: "center" | "left" | "right";
}) => {
  return (
    <HGROUP $align={align}>
      <Heading as={as} paddingTop={1} paddingBottom={0.5}>
        {headline}
      </Heading>
      <Text color={"gray"} paddingTop={0}>
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
