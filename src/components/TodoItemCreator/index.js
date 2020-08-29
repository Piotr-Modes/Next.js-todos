import GOREST from "../../apis/GOREST";
import { useRecoilState } from "recoil";
import {
  textState,
  todoListState,
  listOfDeletedTodoIdsState,
} from "../../recoil";

import { Box, Card, Image, Heading, Text, Flex, Button } from "rebass";
import { Checkbox, Label, Input, Radio } from "@rebass/forms";

const TodoItemCreator = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
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
    console.log(todoList);
    localStorage.setItem(
      "todoAppData-TodoList",
      JSON.stringify([...updatedTodoList])
    );
  };
  return (
    <Box>
      <Flex mx={-2} mt={2} mb={3}>
        <Input
          type="text"
          name="todo"
          id="todo"
          placeholder="New Task"
          value={text}
          onChange={onChange}
        />
        <Button ml={3} onClick={addTodo}>
          Add
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoItemCreator;
