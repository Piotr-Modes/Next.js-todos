import { useRecoilValue } from 'recoil'
import { recoilReadyState, todoListLoadingState } from '../../recoil'

import TodoItem from '../TodoItem'
import List from '../utilities/List'
import { Box } from 'rebass'

import withLoading from '../utilities/withLoading'
import withRecoilStateCheck from '../utilities/withRecoilStateCheck'

const ListWithLoading = withLoading(List)
const ListWithLoadingWithRecoilStateCheck = withRecoilStateCheck(ListWithLoading)

const TodoList = ({ allTodos, filteredTodoList }) => {
  const recoilReady = useRecoilValue(recoilReadyState)
  const todoListLoading = useRecoilValue(todoListLoadingState)
  const renderTodoList = todo => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        todoText={todo.title}
        completed={todo.completed}
        createdDate={todo.created_at}
      />
    )
  }
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
  )
}

export default TodoList
