import { ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css, useTheme } from "styled-components";
import preselectBreakfastItems from "../../data/preselect-breakfast-items.json";
import { v4 as uuidv4 } from "uuid";

const getTwoDecimals = (num: number) => parseFloat(num.toFixed(2));

interface BreakfastItem {
  food: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  fibre: number;
  id: string;
}

const Breakfast = () => {
  const [raceBreakfast, setRaceBreakfast] = useState<BreakfastItem[]>([]);
  const [preselectSelectedItem, setPreselectSelectedItem] =
    useState<string>("Banana");
  const [weight, setWeight] = useState<number>(0);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BreakfastItem>();

  const addBreakfast = (data: BreakfastItem) => {
    const id = uuidv4();
    setRaceBreakfast((prev) => [...prev, { ...data, id }]);
  };

  const handleAddPreselectBreakfastItems = () => {
    const selected = preselectBreakfastItems.find(
      (item) => item.food === preselectSelectedItem,
    );
    if (selected) {
      const id = uuidv4();
      setRaceBreakfast((prev) => [...prev, { ...selected, id }]);
    }
  };

  const breakfastTotal = useMemo(() => {
    return {
      calories: raceBreakfast.reduce(
        (acc, item) => getTwoDecimals(acc + item.calories),
        0,
      ),
      carbohydrates: raceBreakfast.reduce(
        (acc, item) => getTwoDecimals(acc + item.carbohydrates),
        0,
      ),
      protein: raceBreakfast.reduce(
        (acc, item) => getTwoDecimals(acc + item.protein),
        0,
      ),
      fat: raceBreakfast.reduce(
        (acc, item) => getTwoDecimals(acc + item.fat),
        0,
      ),
      fibre: raceBreakfast.reduce(
        (acc, item) => getTwoDecimals(acc + item.fibre),
        0,
      ),
    };
  }, [raceBreakfast]);

  const carbsPerKiloOfBodyweight = useMemo(() => {
    if (weight === 0) return 0;
    return parseFloat((breakfastTotal.carbohydrates / weight).toFixed(2));
  }, [breakfastTotal, weight]);

  const handleSetWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value as unknown as number);
  };

  const handleRemoveBreakfastItem = (id: string) => {
    setRaceBreakfast((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section>
      <h2>Race Breakfast</h2>

      <Label htmlFor="breakfastItemSelect">
        Add one of our preselected breakfast items, or add your own in the table
      </Label>

      <select
        name="breakfastItemSelect"
        id="breakfastItemSelect"
        onChange={(e) => setPreselectSelectedItem(e.target.value)}
        defaultValue={preselectSelectedItem}
      >
        {preselectBreakfastItems.map((item, index) => (
          <option key={index} value={item.food}>
            {item.food}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddPreselectBreakfastItems}
        style={{ width: "25%" }}
      >
        Add
      </button>

      <form onSubmit={handleSubmit(addBreakfast)} id="breakfast-item-form" />

      <table>
        <thead>
          <tr>
            <TH>Food</TH>
            <TH>Calories</TH>
            <TH>Carbohydrate</TH>
            <TH>Protein</TH>
            <TH>Fat</TH>
            <TH separateItems>
              Fibre <button onClick={() => setRaceBreakfast([])}>Reset</button>
            </TH>
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
            <TD backgroundColor={theme.colors.iceBlue} separateItems>
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
              <TD separateItems>
                {item.fibre}
                <button onClick={() => handleRemoveBreakfastItem(item.id)}>
                  Remove
                </button>
              </TD>
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

const TD = styled.td<{ backgroundColor?: string; separateItems?: boolean }>`
  padding: 0.5rem;
  background-color: ${(props) => props.backgroundColor ?? undefined};
  border: 1px solid ${(props) => props.theme.colors.olivine};

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

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;
