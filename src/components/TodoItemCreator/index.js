import GOREST from "../../apis/GOREST";
import { useRecoilState } from "recoil";
import {
  textState,
  todoListState,
  todoListLoadingState,
  listOfDeletedTodoIdsState,
} from "../../recoil";
import {
  localStorageSave,
  getOneTodoListFromTwoCompetingOnes,
} from "../../helperFunctions";
import { Box, Flex, Button } from "rebass";
import { Input } from "@rebass/forms";
import CharacterCount from "../CharacterCounter";

const TodoItemCreator = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoListLoading, setTodoListLoading] = useRecoilState(
    todoListLoadingState
  );
  const [text, setText] = useRecoilState(textState);
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(
    listOfDeletedTodoIdsState
  );

  const onChange = (e) => {
    setText(e.target.value);
  };

  const clearInput = () => {
    setText("");
  };

  const addTodo = async () => {
    setTodoListLoading(true);
    const newTodo = { title: text, completed: false };
    await GOREST.createTodo(newTodo);
    const todoListResponse = await GOREST.getTodos();
    const receivedTododList = todoListResponse.data;
    const filteredRecivedTodoList = receivedTododList.filter(
      (todo) => !listOfDeletedTodoIds.includes(todo.id)
    );
    const updatedTodoList = getOneTodoListFromTwoCompetingOnes(
      filteredRecivedTodoList,
      todoList
    );

    setTodoList(updatedTodoList);
    setTodoListLoading(false);
    localStorageSave("todoAppData-TodoList", [...updatedTodoList]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.length < 1) return;
    await addTodo();
    clearInput();
  };
  return (
    <Box
      as={"form"}
      onSubmit={handleSubmit}
      sx={{
        margin: "0 auto",
        position: "relative",
      }}
      maxWidth="84%"
      mt={3}
    >
      <Flex>
        <Box
          textAlign="center"
          bg="primary"
          sx={{
            position: "absolute",
            lineHeight: "19px",
            color: "white",
            fontSize: "13px",
            borderRadius: "100%",
            width: "20px",
            height: "20px",
            top: "-13px",
            left: "-13px",
          }}
        >
          <CharacterCount />
        </Box>
        <Input
          type="text"
          name="todo"
          id="todo"
          placeholder="New Task"
          value={text}
          onChange={onChange}
        />
        <Button ml={2} type="submit" sx={{ cursor: "pointer" }}>
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoItemCreator;
