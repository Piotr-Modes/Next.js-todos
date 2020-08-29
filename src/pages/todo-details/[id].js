import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../../recoil";
import GOREST from "../../apis/GOREST";

const SingleTodoDetails = (todoDetails) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [singleTodoDetails, setSingleTodoDetails] = useState({});
  const router = useRouter();
  console.log(router.query.id);
  useEffect(() => {}, []);

  return (
    <div>
      {todoDetails.title}
      {todoDetails.id}
      {todoDetails.completed}

      <h1>details</h1>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await GOREST.getTodos();
  const paths = response.data.data.map((todo) => ({
    params: { id: todo.id.toString() },
  }));
  const allTodos = response.data.data;

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await GOREST.getTodos();
  const details = response.data.data.filter(
    (e) => e.id === parseInt(params.id)
  )[0];

  return { props: details };
}

export default SingleTodoDetails;
