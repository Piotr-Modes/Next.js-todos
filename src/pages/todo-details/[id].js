import { useRouter } from "next/router";
import PageHeader from "../../components/PagesSharedComponents/PageHeader";
import PageWrapper from "../../components/PagesSharedComponents/PageWrapper";
import GOREST from "../../apis/GOREST";
import SingleTodoDetails from "../../components/SingleTodoDetails";

const TodoDetails = (todo) => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <PageWrapper>
      <PageHeader headerText="ToDo Deatails" />
      <SingleTodoDetails todo={todo} />
    </PageWrapper>
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
