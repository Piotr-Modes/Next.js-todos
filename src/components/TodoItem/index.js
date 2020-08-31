import {
  timezoneFormatedDate,
  replaceItemAtIndex,
} from "../../helperFunctions";
import { useRecoilState } from "recoil";
import { todoListState, listOfDeletedTodoIdsState } from "../../recoil";
import Link from "next/link";
import { Box, Card, Image, Heading, Text, Flex, Button } from "rebass";
import { Checkbox, Label, Input, Radio } from "@rebass/forms";

const TodoItem = ({ id, todoText, completed, createdDate }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(
    listOfDeletedTodoIdsState
  );
  const toggleItemCompletion = (id) => {
    console.log("helooooo");
    const bufferList = [...todoList];
    var index2;
    var newObject;
    const newList = bufferList.map((toDo, index) => {
      console.log("hi");

      if (toDo.id === id) {
        console.log("jupiiiii");
        index2 = index;
        newObject = { ...toDo, completed: !toDo.completed };
        console.log(newObject);
      }
      return toDo;
    });
    const newerList = replaceItemAtIndex(bufferList, index2, newObject);

    setTodoList([...newerList]);
    localStorage.setItem(
      "todoAppData-TodoList",
      JSON.stringify([...newerList])
    );
  };
  const removeTodo = (id) => {
    const newerList = todoList.filter((e) => e.id !== id);

    setTodoList([...newerList]);
    localStorage.setItem(
      "todoAppData-TodoList",
      JSON.stringify([...newerList])
    );
    setListOfDeletedTodoIds([...listOfDeletedTodoIds, id]);
    localStorage.setItem(
      "todoAppData-ListOfDeletedTodoIds",
      JSON.stringify([...listOfDeletedTodoIds, id])
    );
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

        {/* <Box width={1 / 2}>
          <Link as={`todo-details/${id}`} href="/todo-details/[id]">
            <a>d</a>
          </Link>
        </Box> */}
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
