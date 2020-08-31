import SearchBarFilter from "./SearchBarFilter";
import SelectFilter from "./SelectFilter";
import { Box, Flex } from "rebass";

const TodoListFilters = () => {
  return (
    <Flex mx={-2} mt={4} flexWrap="wrap">
      <Box minWidth="50%" flexGrow="1" px={2}>
        <SearchBarFilter />
      </Box>
      <Box minWidth="50%" flexGrow="1" px={2}>
        <SelectFilter />
      </Box>
    </Flex>
  );
};

export default TodoListFilters;
