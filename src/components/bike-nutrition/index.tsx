import styled, { css, useTheme } from "styled-components";
import { Heading, Text } from "../text";
import { useForm } from "react-hook-form";
import { ReactElement, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import getTwoDecimals from "../../utils/getTwoDecimals.ts";

export interface BikeNutritionItem {
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
  sibling?: (
    handleClick: () => void,
    text: string,
    addProps?: any,
  ) => ReactElement;
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
    valueAsNumber: false,
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
    sibling: (handleClick, text, addProps?: any) => (
      <button {...addProps} onClick={handleClick}>
        {text}
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

  const theme = useTheme();

  const addBikeNutrition = (data: BikeNutritionItem) => {
    const id = uuidv4();
    console.log(data);
    setBikeNutrition((prevState) => [
      ...prevState,
      { ...data, sodium: data.sodium ?? 0, caffeine: data.caffeine ?? 0, id },
    ]);
  };

  const bikeTotal = useMemo(() => {
    return {
      carbohydrates: bikeNutrition.reduce(
        (acc, item) => getTwoDecimals(acc + item.carbohydrates),
        0,
      ),
      fluid: bikeNutrition.reduce(
        (acc, item) => getTwoDecimals(acc + item.fluid),
        0,
      ),
      sodium: bikeNutrition.reduce(
        (acc, item) => getTwoDecimals(acc + (item.sodium ?? 0)),
        0,
      ),
      caffeine: bikeNutrition.reduce(
        (acc, item) => getTwoDecimals(acc + (item.caffeine ?? 0)),
        0,
      ),
    };
  }, [bikeNutrition]);

  return (
    <Section>
      <Heading as="h2" paddingBottom={0}>
        Bike Nutrition
      </Heading>

      <div>Todo: Bike nutrition Pre Select</div>

      <form
        onSubmit={handleSubmit(addBikeNutrition)}
        id="bike-nutrition-item-form"
      />
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {headerForm.map((item) => (
                <TH key={item.name} separateItems={item.sibling !== undefined}>
                  {item.label}
                  {item.sibling &&
                    item.sibling(() => setBikeNutrition([]), "Reset Bike")}
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
                    {...register(item.name, {
                      required: item.required ?? false,
                      valueAsNumber: item.valueAsNumber,
                    })}
                    placeholder={item.placeHolder}
                    form="bike-nutrition-item-form"
                    style={{
                      textAlign: item.valueAsNumber ? "right" : "left",
                    }}
                  />
                  {item.sibling &&
                    item.sibling(
                      () => console.log("add bike nutrition"),
                      "Add",
                      {
                        form: "bike-nutrition-item-form",
                        type: "submit",
                      },
                    )}
                  {errors[item.name] && <Text>This field is required</Text>}
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
              <TotalTH backgroundColor={theme.colors.lightGreen}>TOTAL</TotalTH>
              <TotalTD>---</TotalTD>

              <TotalTD>{bikeTotal.carbohydrates}</TotalTD>
              <TotalTD>{bikeTotal.fluid}</TotalTD>
              <TotalTD>{bikeTotal.sodium}</TotalTD>
              <TotalTD>{bikeTotal.caffeine}</TotalTD>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
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
