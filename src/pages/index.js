import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import GOREST from "../apis/GOREST";
import withLoading from "../components/utilities/withLoading";
import List from "../components/utilities/List";
import TodoItem from "../components/TodoItem";

const ListWithLoading = withLoading(List);

const Index = ({ allTodos }) => {
  useEffect(() => {
    console.log(allTodos);
  }, []);
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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        main
        <Link as="todo-details/1234" href="/todo-details/[id]">
          <a>details</a>
        </Link>
        <ListWithLoading
          isLoading={false}
          list={allTodos}
          listRenderer={renderTodoList}
        />
      </main>
    </div>
  );
};

Index.getInitialProps = async () => {
  const response = await GOREST.getTodos();
  return { allTodos: response.data.data };
};

export default Index;
