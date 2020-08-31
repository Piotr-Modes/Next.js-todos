import { todoListStatsState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { Box, Flex } from "rebass";

const TodoListStats = () => {
  const todoListStats = useRecoilValue(todoListStatsState);
  const { all, completed, uncompleted } = todoListStats;
  return (
    <Flex
      sx={{ fontSize: [0, 1] }}
      mx={-2}
      mt={3}
      justifyContent="space-between"
    >
      <Box variant="badge" width={1 / 3} p={2}>
        All ({all})
      </Box>
      <Box variant="badge" width={1 / 3} minWidth="100px" p={2}>
        Completed ({completed})
      </Box>
      <Box
        variant="badge"
        textAlign="right"
        width={1 / 3}
        minWidth="120px"
        p={2}
      >
        Uncompleted ({uncompleted})
      </Box>
    </Flex>
  );
};

export default TodoListStats;
