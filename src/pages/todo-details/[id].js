import { useRouter } from 'next/router'

import GOREST from '../../apis/GOREST'

import PageHeader from '../../components/PagesSharedComponents/PageHeader'
import PageWrapper from '../../components/PagesSharedComponents/PageWrapper'
import SingleTodoDetails from '../../components/SingleTodoDetails'

const TodoDetails = todo => {
  const router = useRouter()

  return (
    <PageWrapper>
      <PageHeader headerText="ToDo Deatails" />
      <SingleTodoDetails todo={todo} />
    </PageWrapper>
  )
}

export async function getStaticPaths() {
  const response = await GOREST.getTodos()
  const paths = response.data.map(todo => ({
    params: { id: todo.id.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const response = await GOREST.getTodos()
  const details = response.data.filter(e => e.id === parseInt(params.id))[0]

  return { props: details }
}

export default TodoDetails
