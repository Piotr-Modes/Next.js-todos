import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  todoListState,
  recoilReadyState,
  filteredTodoListState,
  listOfDeletedTodoIdsState,
} from '../recoil'
import {
  isTodoAppDataInLocalStorage,
  localStorageSave,
  localStorageGet,
  getOneTodoListFromTwoCompetingOnes,
} from '../helperFunctions'
import GOREST from '../apis/GOREST'
import PageHeader from '../components/PagesSharedComponents/PageHeader'
import PageWrapper from '../components/PagesSharedComponents/PageWrapper'
import TodoList from '../components/TodoList'
import TodoItemCreator from '../components/TodoItemCreator'
import TodoListFilters from '../components/TodoListFilters'
import TodoListStats from '../components/TodoListStats'
import ReactTooltip from 'react-tooltip'

const Index = ({ allTodos }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const filteredTodoList = useRecoilValue(filteredTodoListState)
  const [recoilReady, setRecoilReady] = useRecoilState(recoilReadyState)
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(listOfDeletedTodoIdsState)

  useEffect(() => {
    const updateAppDataFromLocalStorage = async () => {
      if (await isTodoAppDataInLocalStorage()) {
        const localStorageTodoList = localStorageGet('todoAppData-TodoList')
        const localStorageListOfDeletedTodoIds = localStorageGet('todoAppData-ListOfDeletedTodoIds')
        setListOfDeletedTodoIds(localStorageListOfDeletedTodoIds)
        const receivedTododList = allTodos
        const filteredRecivedTodoList = receivedTododList.filter(
          (e) => !localStorageListOfDeletedTodoIds.includes(e.id),
        )
        const updatedTodoList = getOneTodoListFromTwoCompetingOnes(
          filteredRecivedTodoList,
          localStorageTodoList,
        )
        setTodoList([...updatedTodoList])
      } else {
        setTodoList([...allTodos])
        localStorageSave('todoAppData-TodoList', [...allTodos])
        localStorageSave('todoAppData-ListOfDeletedTodoIds', [])
      }
      setRecoilReady(true)
    }
    updateAppDataFromLocalStorage()
  }, [])
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
      <ReactTooltip backgroundColor="black" textColor="white" />
    </>
  )
}

Index.getInitialProps = async () => {
  const response = await GOREST.getTodos()
  return { allTodos: response.data }
}

export default Index
