import Link from "next/link";
import {
  localStorageSave,
  timezoneFormatedDate,
  replaceItemAtIndex,
} from "../../helperFunctions";
import { useRecoilState } from "recoil";
import { todoListState, listOfDeletedTodoIdsState } from "../../recoil";
import { Box, Text, Flex, Button } from "rebass";
import { Checkbox, Label } from "@rebass/forms";

const TodoItem = ({ id, todoText, completed, createdDate }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(
    listOfDeletedTodoIdsState
  );
  const toggleItemCompletion = (id) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === id);
    const updatedTodo = {
      ...todoList[todoIndex],
      completed: !todoList[todoIndex].completed,
    };
    const updatedList = replaceItemAtIndex(todoList, todoIndex, updatedTodo);
    setTodoList([...updatedList]);
    localStorageSave("todoAppData-TodoList", [...updatedList]);
  };
  const removeTodo = (id) => {
    const listWithoutDeletedTodo = todoList.filter((e) => e.id !== id);
    setTodoList([...listWithoutDeletedTodo]);
    localStorageSave("todoAppData-TodoList", [...listWithoutDeletedTodo]);
    setListOfDeletedTodoIds([...listOfDeletedTodoIds, id]);
    localStorageSave("todoAppData-ListOfDeletedTodoIds", [
      ...listOfDeletedTodoIds,
      id,
    ]);
  };
  return (
    <Box key={id} mb={2} variant="card" Flex>
      <Flex>
        <Flex width={9 / 12}>
          <Label width={1 / 12}>
            <Checkbox
              checked={completed}
              onChange={() => {
                toggleItemCompletion(id);
              }}
            />
          </Label>
          <Text fontWeight="bold" fontSize={1}>
            {todoText}
          </Text>
        </Flex>
        <Box width={70} px={2}>
          <Text fontSize={0}>{timezoneFormatedDate(createdDate)}</Text>
        </Box>
        <Flex width={1 / 12} sx={{ flexGrow: 1 }} justifyContent="flex-end">
          <Link as={`todo-details/${id}`} href="/todo-details/[id]">
            <a>
              <Button
                fontSize={11}
                sx={{ cursor: "pointer" }}
                lineHeight={"11px"}
                variant="outline"
                p={2}
              >
                &#10132;
              </Button>
            </a>
          </Link>
          <Button
            ml={1}
            fontSize={11}
            sx={{ cursor: "pointer" }}
            lineHeight={"11px"}
            variant="outline"
            p={2}
            onClick={() => {
              removeTodo(id);
            }}
          >
            &#10006;
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TodoItem;
