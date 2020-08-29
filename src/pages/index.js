import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";
import GOREST from "../apis/GOREST";

const Index = ({ allTodos }) => {
  useEffect(() => {
    console.log(allTodos);
  }, []);
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
      </main>
    </div>
  );
};

Index.getInitialProps = async () => {
  const response = await GOREST.getTodos();
  return { allTodos: response.data.data };
};

export default Index;
