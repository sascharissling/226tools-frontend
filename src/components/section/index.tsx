import styled from "styled-components";

export const Section = styled.section<{
  $hasBackground?: boolean;
  $hasBorder?: boolean;
}>`
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
`;
