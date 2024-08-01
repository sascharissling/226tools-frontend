import styled, { css, useTheme } from "styled-components";
import { Heading, Text } from "../text";
import { useForm } from "react-hook-form";
import { ReactElement, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    label: "Minute",
    placeHolder: "Minute (number)",
    required: true,
    valueAsNumber: false,
  },
  {
    name: "product",
    label: "Product",
    placeHolder: "Product name",
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
    register: registerBike,
    handleSubmit: handleSubmitBike,
    formState: { errors: bikeErrors },
  } = useForm<BikeNutritionItem>();

  const theme = useTheme();

  const addBikeNutrition = (data: BikeNutritionItem) => {
    const id = uuidv4();
    setBikeNutrition((prevState) => [...prevState, { ...data, id }]);
  };

  console.log(bikeNutrition);

  return (
    <Section>
      <Heading as="h2" paddingBottom={0}>
        Bike Nutrition
      </Heading>

      <div>Todo: Bike nutrition Pre Select</div>

      <form
        onSubmit={handleSubmitBike(addBikeNutrition)}
        id="bike-nutrition-item-form"
      />

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
          <tr>
            {headerForm.map((item) => (
              <TD
                key={item.name}
                backgroundColor={theme.colors.iceBlue}
                separateItems={!!item.sibling}
              >
                <input
                  {...registerBike(item.name, {
                    required: item.required ?? false,
                    valueAsNumber: item.valueAsNumber,
                  })}
                  placeholder={item.placeHolder}
                  form="bike-nutrition-item-form"
                  style={{
                    textAlign: item.valueAsNumber ? "right" : "left",
                  }}
                />
                {item.sibling}
                {bikeErrors[item.name] && <Text>This field is required</Text>}
              </TD>
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
