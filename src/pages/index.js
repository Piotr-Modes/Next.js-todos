import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  todoListState,
  recoilReadyState,
  filteredTodoListState,
  listOfDeletedTodoIdsState,
} from '../recoil'
import { isTodoAppDataInLocalStorage, localStorageGet } from '../helperFunctions/localStorageHelper'
import { getOneTodoListFromTwoCompetingOnes } from '../helperFunctions/arrayOperationsHelper'

import GOREST from '../apis/GOREST'

import Head from 'next/head'
import PageHeader from '../components/PagesSharedComponents/PageHeader'
import PageWrapper from '../components/PagesSharedComponents/PageWrapper'
import TodoList from '../components/TodoList'
import TodoItemCreator from '../components/TodoItemCreator'
import TodoListFilters from '../components/TodoListFilters'
import TodoListStats from '../components/TodoListStats'
import ReactTooltip from 'react-tooltip'

const Index = ({ allTodos }) => {
  const filteredTodoList = useRecoilValue(filteredTodoListState)
  const setTodoList = useSetRecoilState(todoListState)
  const setRecoilReady = useSetRecoilState(recoilReadyState)
  const setListOfDeletedTodoIds = useSetRecoilState(listOfDeletedTodoIdsState)

  useEffect(() => {
    const updateAppDataFromLocalStorage = async () => {
      if (await isTodoAppDataInLocalStorage()) {
        const localStorageTodoList = localStorageGet('todoAppData-TodoList')
        const localStorageListOfDeletedTodoIds = localStorageGet('todoAppData-ListOfDeletedTodoIds')
        setListOfDeletedTodoIds(localStorageListOfDeletedTodoIds)
        const receivedTododList = allTodos
        const filteredRecivedTodoList = receivedTododList.filter(
          e => !localStorageListOfDeletedTodoIds.includes(e.id),
        )
        const updatedTodoList = getOneTodoListFromTwoCompetingOnes(
          filteredRecivedTodoList,
          localStorageTodoList,
        )
        setTodoList([...updatedTodoList])
      } else {
        setTodoList([...allTodos])
        setListOfDeletedTodoIds([])
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

export const getStaticProps = async () => {
  const response = await GOREST.getTodos()
  return { props: { allTodos: response.data } }
}

export default Index
