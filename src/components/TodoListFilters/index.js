import SearchBarFilter from "./SearchBarFilter";
import SelectFilter from "./SelectFilter";
import { Box, Flex } from "rebass";

const TodoListFilters = () => {
  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()} py={3}>
      <Flex mx={-2} mb={3}>
        <Box width={1 / 2} px={2}>
          <SearchBarFilter />
        </Box>
        <Box width={1 / 2} px={2}>
          <SelectFilter />
        </Box>
      </Flex>
    </Box>
  );
};

export default TodoListFilters;
