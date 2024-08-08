import preselectRaceItems from "../../../data/preselect-race-items.json";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Dispatch, SetStateAction, useState } from "react";
import { RaceNutritionItem } from "../index.tsx";

interface Props {
  setRaceNutrition: Dispatch<SetStateAction<RaceNutritionItem[]>>;
}

const RacePreselect = ({ setRaceNutrition }: Props) => {
  const [preselectSelectedItem, setPreselectSelectedItem] =
    useState<string>("Banana");

  const handleAddPreselectBreakfastItems = () => {
    const selected = preselectRaceItems.find(
      (item) => item.product === preselectSelectedItem,
    );
    if (selected) {
      const id = uuidv4();
      setRaceNutrition((prev) => [...prev, { ...selected, id }]);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor="breakfastItemSelect">
        Add one of our preselected race nutrition items, or add your own in the
        table
      </Label>

      <ActionWrapper>
        <select
          name="breakfastItemSelect"
          id="breakfastItemSelect"
          onChange={(e) => setPreselectSelectedItem(e.target.value)}
          defaultValue={preselectSelectedItem}
        >
          {preselectRaceItems.map((item, index) => (
            <option key={index} value={item.product}>
              {item.product}
            </option>
          ))}
        </select>

        <Button onClick={handleAddPreselectBreakfastItems}>Add</Button>
      </ActionWrapper>
    </Wrapper>
  );
};

export default RacePreselect;

const Wrapper = styled.div`
  width: 15rem;
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const Button = styled.button``;

const ActionWrapper = styled.div`
  display: grid;
  grid: auto / 1fr auto;
`;
