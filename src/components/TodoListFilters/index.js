import SearchBarFilter from "./SearchBarFilter";
import SelectFilter from "./SelectFilter";
import { Box, Flex } from "rebass";

const TodoListFilters = () => {
  return (
    <Flex mx={-2} mt={4}>
      <Box width={1 / 2} px={2}>
        <SearchBarFilter />
      </Box>
      <Box width={1 / 2} px={2}>
        <SelectFilter />
      </Box>
    </Flex>
  );
};

export default TodoListFilters;
