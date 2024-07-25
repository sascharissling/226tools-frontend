import preselectBreakfastItems from "../../../data/preselect-breakfast-items.json";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Dispatch, SetStateAction, useState } from "react";
import { BreakfastItem } from "../index.tsx";

interface Props {
  setRaceBreakfast: Dispatch<SetStateAction<BreakfastItem[]>>;
}

const BreakfastPreSelect = ({ setRaceBreakfast }: Props) => {
  const [preselectSelectedItem, setPreselectSelectedItem] =
    useState<string>("Banana");

  const handleAddPreselectBreakfastItems = () => {
    const selected = preselectBreakfastItems.find(
      (item) => item.food === preselectSelectedItem,
    );
    if (selected) {
      const id = uuidv4();
      setRaceBreakfast((prev) => [...prev, { ...selected, id }]);
    }
  };

  return (
    <Wrapper>
      <Label htmlFor="breakfastItemSelect">
        Add one of our preselected breakfast items, or add your own in the table
      </Label>

      <ActionWrapper>
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

        <Button onClick={handleAddPreselectBreakfastItems}>Add</Button>
      </ActionWrapper>
    </Wrapper>
  );
};

export default BreakfastPreSelect;

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
