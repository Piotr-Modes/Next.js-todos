import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../../recoil";
import { Box } from "rebass";
import PageHeader from "../../components/PageHeader";
import singleTodoDetails from "../../components/SingleTodoDetails";
import GOREST from "../../apis/GOREST";
import SingleTodoDetails from "../../components/SingleTodoDetails";

const TodoDetails = (todo) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [singleTodoDetails, setSingleTodoDetails] = useState({});
  const router = useRouter();
  console.log(router.query.id);
  useEffect(() => {}, []);

  return (
    <Box
      as={"main"}
      sx={{
        p: 4,
        color: "text",
        bg: "background",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "body",
        fontWeight: "body",
        lineHeight: "body",
      }}
      mt={4}
    >
      <PageHeader headerText="ToDo Deatails" />
      <SingleTodoDetails todo={todo} />
    </Box>
  );
};

export async function getStaticPaths() {
  const response = await GOREST.getTodos();
  const paths = response.data.map((todo) => ({
    params: { id: todo.id.toString() },
  }));
  const allTodos = response.data.data;

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await GOREST.getTodos();
  const details = response.data.filter((e) => e.id === parseInt(params.id))[0];

  return { props: details };
}

export default TodoDetails;
