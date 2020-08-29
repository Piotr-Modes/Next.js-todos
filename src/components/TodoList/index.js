import TodoItem from "../TodoItem";
import List from "../utilities/List";
import withLoading from "../utilities/withLoading";
import withRecoilStateCheck from "../utilities/withRecoilStateCheck";
import { recoilReadyState, todoListLoadingState } from "../../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box } from "rebass";

const ListWithLoading = withLoading(List);
const ListWithLoadingWithRecoilStateCheck = withRecoilStateCheck(
  ListWithLoading
);

const TodoList = ({ allTodos, filteredTodoList }) => {
  const [recoilReady, setRecoilReady] = useRecoilState(recoilReadyState);
  const todoListLoading = useRecoilValue(todoListLoadingState);
  const renderTodoList = (todo, index) => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        todoText={todo.title}
        completed={todo.completed}
        createdDate={todo.created_at}
      />
    );
  };
  return (
    <Box mt={3} textAlign="center">
      <ListWithLoadingWithRecoilStateCheck
        isRecoilStateReady={recoilReady}
        initialState={allTodos}
        recoilState={filteredTodoList}
        isLoading={todoListLoading}
        listRenderer={renderTodoList}
      />
    </Box>
  );
};

export default TodoList;
