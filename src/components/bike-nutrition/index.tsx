import styled, { useTheme } from "styled-components";
import { Heading, Text } from "../text";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import getTwoDecimals from "../../utils/getTwoDecimals.ts";
import {
  Table,
  TableWrapper,
  TD,
  TH,
  TotalTD,
  TotalTH,
} from "../table-elements";

export interface BikeNutritionItem {
  minute: number;
  product: string;
  carbohydrates: number;
  fluid: number;
  sodium: number;
  caffeine: number;
  comments?: string;
  id: string;
}

interface HeaderItem {
  name: keyof BikeNutritionItem;
  label: string;
  placeHolder: string;
  required?: boolean;
  valueAsNumber: boolean;
  sibling?: boolean;
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
    required: true,
    valueAsNumber: false,
  },
  {
    name: "carbohydrates",
    label: "Carbohydrates",
    placeHolder: "Carbohydrates (g)",
    required: true,
    valueAsNumber: true,
  },
  {
    name: "fluid",
    label: "Fluid",
    placeHolder: "Fluid (ml)",
    required: true,
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
    sibling: true,
  },
];

const sanitizeData = (data: BikeNutritionItem) => {
  return {
    ...data,
    sodium: isNaN(data.sodium) ? 0 : data.sodium,
    caffeine: isNaN(data.caffeine) ? 0 : data.caffeine,
    comments: data.comments ?? "---",
  };
};

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
    setBikeNutrition((prevState) => [
      ...prevState,
      { ...sanitizeData(data), id },
    ]);
  };

  const handleRemoveBikeNutrition = (id: string) => {
    setBikeNutrition((prevState) => prevState.filter((item) => item.id !== id));
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
                  {item.sibling && (
                    <button onClick={() => setBikeNutrition([])}>
                      Reset Table
                    </button>
                  )}
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
                  {errors[item.name] && <Text>This field is required</Text>}
                  {item.sibling && (
                    <button type="submit" form="bike-nutrition-item-form">
                      Add
                    </button>
                  )}
                </TD>
              ))}
            </tr>
          </thead>
          <tbody>
            {bikeNutrition.map((item) => (
              <tr key={item.id}>
                {headerForm.map((header) => (
                  <TD key={header.name} separateItems={header.sibling}>
                    {item[header.name]}
                    {header.sibling && (
                      <button
                        onClick={() => handleRemoveBikeNutrition(item.id)}
                      >
                        Remove
                      </button>
                    )}
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
              <TotalTD>---</TotalTD>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
    </Section>
  );
};

export default BikeNutrition;

const Section = styled.section`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.whiteLighter};
`;