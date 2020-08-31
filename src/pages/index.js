import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import GOREST from "../apis/GOREST";
// import withLoading from "../components/utilities/withLoading";
// import withRecoilStateCheck from "../components/utilities/withRecoilStateCheck";
// import List from "../components/utilities/List";
import PageHeader from "../components/PagesSharedComponents/PageHeader";
import PageWrapper from "../components/PagesSharedComponents/PageWrapper";
import TodoList from "../components/TodoList";
import TodoItem from "../components/TodoItem";
import TodoItemCreator from "../components/TodoItemCreator";
import TodoListFilters from "../components/TodoListFilters";
import TodoListStats from "../components/TodoListStats";
import {
  todoListState,
  recoilReadyState,
  todoListLoadingState,
  filteredTodoListState,
  listOfDeletedTodoIdsState,
} from "../recoil";
import { Box } from "rebass";

// const ListWithLoading = withLoading(List);
// const ListWithLoadingWithRecoilStateCheck = withRecoilStateCheck(
//   ListWithLoading
// );

const Index = ({ allTodos }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const [recoilReady, setRecoilReady] = useRecoilState(recoilReadyState);
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(
    listOfDeletedTodoIdsState
  );

  useEffect(() => {
    const checkForTododAppDataInLocalStorage = async () => {
      try {
        const response = await JSON.parse(
          localStorage.getItem("todoAppData-TodoList")
        );
        if (response) {
          console.log(response);
          const listOfDeletedTodoIdsFromLocalStorage = await JSON.parse(
            localStorage.getItem("todoAppData-ListOfDeletedTodoIds")
          );
          setListOfDeletedTodoIds(listOfDeletedTodoIdsFromLocalStorage);
          const receivedTododList = allTodos;
          const filteredReceivedTododList = receivedTododList.filter(
            (e) => !listOfDeletedTodoIdsFromLocalStorage.includes(e.id)
          );
          const updatedTodoList = filteredReceivedTododList.map(
            (receivedTodo) => {
              if (response.filter((e) => e.id === receivedTodo.id).length > 0) {
                return response.filter((e) => e.id === receivedTodo.id)[0];
              }
              return receivedTodo;
            }
          );
          setTodoList([...updatedTodoList]);
        }
        if (!response) {
          setTodoList([...allTodos]);
          localStorage.setItem(
            "todoAppData-TodoList",
            JSON.stringify([...allTodos])
          );
          localStorage.setItem(
            "todoAppData-ListOfDeletedTodoIds",
            JSON.stringify([])
          );
          console.log("buuuuuuu");
        }
        setRecoilReady(true);
      } catch (err) {
        console.log(err);
      }
    };
    checkForTododAppDataInLocalStorage();
  }, []);
  return (
    <>
      <Head>
        <title>Todo Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <PageHeader headerText="ToDo List" />
        <TodoItemCreator />
        <TodoListFilters />
        <TodoListStats />
        <TodoList allTodos={allTodos} filteredTodoList={filteredTodoList} />
      </PageWrapper>
    </>
  );
};

Index.getInitialProps = async () => {
  const response = await GOREST.getTodos();
  return { allTodos: response.data };
};

export default Index;
