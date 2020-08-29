import { todoListStatsState } from "../../recoil";
import { useRecoilValue } from "recoil";
import { Box, Card, Image, Heading, Text, Flex, Button } from "rebass";
import { Checkbox, Label, Input, Radio } from "@rebass/forms";

const TodoListStats = () => {
  const todoListStats = useRecoilValue(todoListStatsState);
  const { all, completed, uncompleted } = todoListStats;
  return (
    <Flex mx={-2} mt={3} flexWrap="wrap" justifyContent="space-between">
      <Box variant="badge" width={[1 / 2, 1 / 3]} p={2}>
        All ({all})
      </Box>
      <Box variant="badge" width={[1 / 2, 1 / 3]} p={2}>
        Completed ({completed})
      </Box>
      <Box variant="badge" textAlign="right" width={[1 / 2, 1 / 3]} p={2}>
        Uncompleted ({uncompleted})
      </Box>
    </Flex>
  );
};

export default TodoListStats;
