import styled, { css } from "styled-components";

export const Table = styled.table``;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const TD = styled.td<{
  $backgroundColor?: string;
  $separateItems?: boolean;
  $textAlign?: string;
}>`
  padding: 0.5rem;
  background-color: ${(props) => props.$backgroundColor ?? undefined};
  border: 1px solid ${(props) => props.theme.colors.olivine};
  text-align: ${(props) => props.$textAlign ?? "right"};

  ${(props) =>
    props.$separateItems &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`;

export const TotalTD = styled.td`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.redwood};
  background-color: ${(props) => props.theme.colors.lightGreen};
  font-weight: bold;
  text-align: right;
`;

export const TotalTH = styled.th<{ backgroundColor?: string }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.redwood};
  background-color: ${(props) => props.backgroundColor ?? undefined};
  font-weight: bold;
  text-align: left;
`;

export const TH = styled.th<{ separateItems?: boolean }>`
  padding: 0.5rem 0.5rem 0.5rem 0;
  text-align: left;

  ${(props) =>
    props.separateItems &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`;
