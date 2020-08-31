import { Box, Flex, Text } from "rebass";
import { timezoneFormatedDate } from "../../helperFunctions";

const SingleTodoDetails = ({ todo }) => {
  return (
    <Box mt={5}>
      <Flex alignContent="space-between">
        <Box
          width={1 / 2}
          fontSize={[3, 4, 5]}
          fontWeight="bold"
          //   color="primary"
        >
          ID:
        </Box>
        <Box width={1 / 2} as={"span"} fontSize={[3, 4, 5]}>
          {todo.id}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontSize={[3, 4, 5]} fontWeight="bold">
          Created Date:
        </Box>
        <Box width={1 / 2} as={"span"} fontSize={[3, 4, 5]}>
          {timezoneFormatedDate(todo.created_at)}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontSize={[3, 4, 5]} fontWeight="bold">
          Completed:
        </Box>
        <Box width={1 / 2} as={"span"} fontSize={[3, 4, 5]}>
          {todo.completed ? "Yes" : "No"}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontSize={[3, 4, 5]} fontWeight="bold">
          Task:
        </Box>
        <Box width={1 / 2} as={"span"} fontSize={[3, 4, 5]}>
          {todo.title}
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleTodoDetails;
