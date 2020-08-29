import GOREST from "../../apis/GOREST";
import { useRecoilState } from "recoil";
import {
  textState,
  todoListState,
  todoListLoadingState,
  listOfDeletedTodoIdsState,
} from "../../recoil";
import theme from "@rebass/preset";

import { Box, Card, Image, Heading, Text, Flex, Button } from "rebass";
import { Checkbox, Label, Input, Radio } from "@rebass/forms";
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
    if (text.length < 1) return;
    const newTodo = { title: text, completed: false };
    clearInput();
    const response = await GOREST.createTodo(newTodo);
    const todoListResponse = await GOREST.getTodos();
    const receivedTododList = todoListResponse.data.data;
    const filteredRecivedTodoList = receivedTododList.filter(
      (e) => !listOfDeletedTodoIds.includes(e.id)
    );
    const updatedTodoList = filteredRecivedTodoList.map((receivedTodo) => {
      if (todoList.filter((todo) => todo.id === receivedTodo.id).length > 0)
        return todoList.filter((todo) => todo.id === receivedTodo.id)[0]; //use find
      return receivedTodo;
    });

    console.log(updatedTodoList);
    setTodoList(updatedTodoList);
    setTodoListLoading(false);
    console.log(todoList);
    localStorage.setItem(
      "todoAppData-TodoList",
      JSON.stringify([...updatedTodoList])
    );
  };
  return (
    <Box
      as={"form"}
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
          sx={{
            position: "absolute",
            lineHeight: "19px",
            background: theme.colors.primary,
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
        <Button ml={2} onClick={addTodo}>
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoItemCreator;
