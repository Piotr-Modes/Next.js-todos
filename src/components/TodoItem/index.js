import { useRecoilState } from 'recoil'
import { todoListState, listOfDeletedTodoIdsState } from '../../recoil'

import { timezoneFormatedDate } from '../../helperFunctions/timeFormatingHelper'
import { replaceItemAtIndex } from '../../helperFunctions/arrayOperationsHelper'
import { trimedString } from '../../helperFunctions/stringOperationsHelper'

import Link from 'next/link'
import { Box, Text, Flex, Button } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'

const TodoItem = ({ id, todoText, completed, createdDate }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const [listOfDeletedTodoIds, setListOfDeletedTodoIds] = useRecoilState(listOfDeletedTodoIdsState)

  const toggleItemCompletion = id => {
    const todoIndex = todoList.findIndex(todo => todo.id === id)
    const updatedTodo = {
      ...todoList[todoIndex],
      completed: !todoList[todoIndex].completed,
    }
    const updatedList = replaceItemAtIndex(todoList, todoIndex, updatedTodo)
    setTodoList([...updatedList])
  }

  const removeTodo = id => {
    const listWithoutDeletedTodo = todoList.filter(e => e.id !== id)
    setTodoList([...listWithoutDeletedTodo])
    setListOfDeletedTodoIds([...listOfDeletedTodoIds, id])
  }
  return (
    <Box key={id} mb={2} variant="card" Flex>
      <Flex flexWrap="wrap">
        <Label data-tip={completed ? 'Mark as Uncompleted' : 'Mark as Completed'} width={40}>
          <Checkbox
            mt={1}
            checked={completed}
            onChange={() => {
              toggleItemCompletion(id)
            }}
          />
        </Label>
        <Text
          id={id}
          data-tip={todoText.length > 40 ? todoText : ''}
          flexGrow="1"
          textAlign="left"
          lineHeight={'27px'}
          fontWeight="bold"
          fontSize={[0, 1]}
        >
          {trimedString(todoText, 40)}
        </Text>

        <Flex width={1 / 12} minWidth="155px" sx={{ flexGrow: 1 }} justifyContent="flex-end">
          <Box data-tip="Date of creation" width={100} px={2}>
            <Text fontSize={0} lineHeight={'30px'}>
              {timezoneFormatedDate(createdDate)}
            </Text>
          </Box>
          <Link as={`todo-details/${id}`} href="/todo-details/[id]">
            <a>
              <Button
                data-tip="See Details"
                fontSize={11}
                sx={{ cursor: 'pointer' }}
                lineHeight={'11px'}
                variant="outline"
                p={2}
              >
                &#10132;
              </Button>
            </a>
          </Link>
          <Button
            data-tip="Delete"
            mt={1.5}
            lineHeight={'11px'}
            ml={1}
            fontSize={11}
            sx={{
              cursor: 'pointer',
            }}
            height="26.5px"
            variant="outline"
            p={2}
            onClick={() => {
              removeTodo(id)
            }}
          >
            &#10006;
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default TodoItem
