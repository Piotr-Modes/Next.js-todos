import React from "react";
import { todoListFilterState } from "../../recoil";
import { useRecoilState } from "recoil";
import { Label, Select } from "@rebass/forms";

const SelectFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <>
      <Label htmlFor="filter">Filter</Label>
      <Select id="filter" name="filter" value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </Select>
    </>
  );
};

export default React.memo(SelectFilter);
