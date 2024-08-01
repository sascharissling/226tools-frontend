import styled, { css } from "styled-components";
import { Heading } from "../text";
import { useForm } from "react-hook-form";
import { ReactElement, useState } from "react";

interface BikeNutritionItem {
  minute: number;
  product: string;
  carbohydrates: number;
  fluid: number;
  sodium?: number;
  caffeine?: number;
  comments?: string;
  id: string;
}

interface HeaderItem {
  name: keyof BikeNutritionItem;
  label: string;
  placeHolder: string;
  required?: boolean;
  valueAsNumber: boolean;
  sibling?: ReactElement;
}

const headerForm: HeaderItem[] = [
  {
    name: "minute",
    label: "Food",
    placeHolder: "Food (name)",
    required: true,
    valueAsNumber: false,
  },
  {
    name: "product",
    label: "Calories",
    placeHolder: "Calories (g)",
    valueAsNumber: true,
  },
  {
    name: "carbohydrates",
    label: "Carbohydrates",
    placeHolder: "Carbohydrates (g)",
    valueAsNumber: true,
  },
  {
    name: "fluid",
    label: "Fluid",
    placeHolder: "Fluid (ml)",
    valueAsNumber: true,
  },
  {
    name: "sodium",
    label: "Sodium",
    placeHolder: "Sodium (g)",
    valueAsNumber: true,
  },
  {
    name: "caffeine",
    label: "Caffeine",
    placeHolder: "Caffeine (g)",
    valueAsNumber: true,
  },
  {
    name: "comments",
    label: "Comments",
    placeHolder: "Comment (optional)",
    valueAsNumber: false,
    sibling: (
      <button type="submit" form="breakfast-item-form" style={{ width: "25%" }}>
        Add
      </button>
    ),
  },
];

const BikeNutrition = () => {
  const [bikeNutrition, setBikeNutrition] = useState<BikeNutritionItem[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BikeNutritionItem>();
  return (
    <Section>
      <Heading as="h2" paddingBottom={0}>
        Bike Nutrition
      </Heading>

      <div>Todo: Bike nutrition Pre Select</div>

      {/*<form*/}
      {/*  onSubmit={handleSubmit(())}*/}
      {/*  id="race-nutrition-item-form"*/}
      {/*/>*/}

      <Table>
        <thead>
          <tr>
            {headerForm.map((item) => (
              <TH key={item.name} separateItems={item.sibling !== undefined}>
                {item.label}
                {item.sibling}
              </TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {bikeNutrition.map((item) => (
            <tr key={item.id}>
              {headerForm.map((header) => (
                <TD
                  key={header.name}
                  separateItems={header.sibling !== undefined}
                >
                  {item[header.name]}
                </TD>
              ))}
            </tr>
          ))}
          <tr>
            <TotalTH>Total</TotalTH>
            <TotalTD>1</TotalTD>
            <TotalTD>2</TotalTD>
            <TotalTD>3</TotalTD>
            <TotalTD>4</TotalTD>
            <TotalTD>5</TotalTD>
          </tr>
        </tbody>
      </Table>
    </Section>
  );
};

export default BikeNutrition;

const Table = styled.table``;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const TD = styled.td<{
  backgroundColor?: string;
  separateItems?: boolean;
  textAlign?: string;
}>`
  padding: 0.5rem;
  background-color: ${(props) => props.backgroundColor ?? undefined};
  border: 1px solid ${(props) => props.theme.colors.olivine};
  text-align: ${(props) => props.textAlign ?? "right"};

  ${(props) =>
    props.separateItems &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`;

const TotalTD = styled.td`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.redwood};
  background-color: ${(props) => props.theme.colors.lightGreen};
  font-weight: bold;
  text-align: right;
`;

const TotalTH = styled.th<{ backgroundColor?: string }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.redwood};
  background-color: ${(props) => props.backgroundColor ?? undefined};
  font-weight: bold;
  text-align: left;
`;

const TH = styled.th<{ separateItems?: boolean }>`
  padding: 0.5rem 0.5rem 0.5rem 0;
  text-align: left;

  ${(props) =>
    props.separateItems &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`;

const Section = styled.section`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.whiteLighter};
`;
