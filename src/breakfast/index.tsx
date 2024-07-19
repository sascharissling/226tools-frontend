import { ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components";

interface BreakfastItem {
  food: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  fibre: number;
}

const Breakfast = () => {
  const [raceBreakfast, setRaceBreakfast] = useState<BreakfastItem[]>([]);
  const [weight, setWeight] = useState<number>(0);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BreakfastItem>();

  const addBreakfast = (data: BreakfastItem) => {
    setRaceBreakfast((prev) => [...prev, data]);
  };

  const breakfastTotal = useMemo(() => {
    return {
      calories: raceBreakfast.reduce((acc, item) => acc + item.calories, 0),
      carbohydrates: raceBreakfast.reduce(
        (acc, item) => acc + item.carbohydrates,
        0,
      ),
      protein: raceBreakfast.reduce((acc, item) => acc + item.protein, 0),
      fat: raceBreakfast.reduce((acc, item) => acc + item.fat, 0),
      fibre: raceBreakfast.reduce((acc, item) => acc + item.fibre, 0),
    };
  }, [raceBreakfast]);

  const carbsPerKiloOfBodyweight = useMemo(() => {
    if (weight === 0) return 0;
    return parseFloat((breakfastTotal.carbohydrates / weight).toFixed(2));
  }, [breakfastTotal, weight]);

  const handleSetWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value as unknown as number);
  };

  return (
    <section>
      <h2>Race Breakfast</h2>

      <form onSubmit={handleSubmit(addBreakfast)} id="breakfast-item-form" />

      <table>
        <thead>
          <tr>
            <TH>Food</TH>
            <TH>Calories</TH>
            <TH>Carbohydrate</TH>
            <TH>Protein</TH>
            <TH>Fat</TH>
            <TH>Fibre</TH>
          </tr>

          <tr>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("food", {
                  required: true,
                  valueAsNumber: false,
                })}
                placeholder="Food (name)"
                form="breakfast-item-form"
              />
              {errors.food && <span>This field is required</span>}
            </TD>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("calories", { valueAsNumber: true })}
                placeholder="Calories (g)"
                form="breakfast-item-form"
              />
              {errors.calories && <span>This field is required</span>}
            </TD>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("carbohydrates", {
                  valueAsNumber: true,
                })}
                placeholder="Carbohydrates (g)"
                form="breakfast-item-form"
              />
              {errors.carbohydrates && <span>This field is required</span>}
            </TD>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("protein", { valueAsNumber: true })}
                placeholder="Protein (g)"
                form="breakfast-item-form"
              />
              {errors.protein && <span>This field is required</span>}
            </TD>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("fat", { valueAsNumber: true })}
                placeholder="Fat (g)"
                form="breakfast-item-form"
              />
              {errors.fat && <span>This field is required</span>}
            </TD>
            <TD backgroundColor={theme.colors.iceBlue}>
              <input
                {...register("fibre", { valueAsNumber: true })}
                placeholder="Fibre (g)"
                form="breakfast-item-form"
                style={{ width: "50%" }}
              />
              <button
                type="submit"
                form="breakfast-item-form"
                style={{ width: "25%" }}
              >
                Add
              </button>
              {errors.fibre && <span>This field is required</span>}
            </TD>
          </tr>
        </thead>

        <tbody>
          {raceBreakfast.map((item, index) => (
            <tr key={index}>
              <TD>{item.food}</TD>
              <TD>{item.calories}</TD>
              <TD>{item.carbohydrates}</TD>
              <TD>{item.protein}</TD>
              <TD>{item.fat}</TD>
              <TD>{item.fibre}</TD>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TotalTD>TOTAL</TotalTD>
            <TotalTD>{breakfastTotal.calories}</TotalTD>
            <TotalTD>{breakfastTotal.carbohydrates}</TotalTD>
            <TotalTD>{breakfastTotal.protein}</TotalTD>
            <TotalTD>{breakfastTotal.fat}</TotalTD>
            <TotalTD>{breakfastTotal.fibre}</TotalTD>
          </tr>
          <tr>
            <TD>Weight (kg)</TD>

            <TD>
              <input
                value={weight ?? 0}
                onChange={handleSetWeight}
                placeholder="kg"
              />
            </TD>
          </tr>
          <tr>
            <TD backgroundColor={theme.colors.lightGreen}>Carbs per kg/bw</TD>
            <TD backgroundColor={theme.colors.lightGreen}>
              {carbsPerKiloOfBodyweight}
            </TD>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Breakfast;

const TD = styled.td<{ backgroundColor?: string }>`
  padding: 0.5rem;
  background-color: ${(props) => props.backgroundColor ?? undefined};
  border: 1px solid ${(props) => props.theme.colors.olivine};
`;

const TotalTD = styled.td`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.redwood};
  background-color: ${(props) => props.theme.colors.lightGreen};
`;

const TH = styled.th`
  padding: 0.5rem 0;
  text-align: left;
`;
