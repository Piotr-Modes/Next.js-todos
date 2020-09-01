import { useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import {
  textState,
  todoListState,
  todoListLoadingState,
  listOfDeletedTodoIdsState,
} from '../../recoil'

import GOREST from '../../apis/GOREST'

import { localStorageSave } from '../../helperFunctions/localStorageHelper'
import { getOneTodoListFromTwoCompetingOnes } from '../../helperFunctions/arrayOperationsHelper'

import ReactTooltip from 'react-tooltip'
import { Box, Flex, Button, Text } from 'rebass'
import { Input } from '@rebass/forms'
import CharacterCount from '../CharacterCounter'

const TodoItemCreator = () => {
  const [formValidationErrors, setFormValidationErrors] = useState([])
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const [text, setText] = useRecoilState(textState)
  const listOfDeletedTodoIds = useRecoilValue(listOfDeletedTodoIdsState)
  const setTodoListLoading = useSetRecoilState(todoListLoadingState)

  const isTodoFormValid = taskText => {
    let valid = true
    const formErrors = []

    if (taskText === '') {
      formErrors.push('Please fill in the task input')
      valid = false
    }
    if (!taskText.replace(/\s/g, '').length) {
      formErrors.push("This field can't be blank")
      valid = false
    }
    if (taskText.length > 30) {
      formErrors.push('To long, max 30 characters')
      valid = false
    }
    setFormValidationErrors(formErrors)
    return valid
  }

  const onChange = e => {
    setText(e.target.value)
    isTodoFormValid(e.target.value)
  }

  const clearInput = () => {
    setText('')
  }

  const addTodo = async () => {
    setTodoListLoading(true)
    const newTodo = { title: text, completed: false }
    await GOREST.createTodo(newTodo)
    const todoListResponse = await GOREST.getTodos()
    const receivedTododList = todoListResponse.data
    const filteredRecivedTodoList = receivedTododList.filter(
      todo => !listOfDeletedTodoIds.includes(todo.id),
    )
    const updatedTodoList = getOneTodoListFromTwoCompetingOnes(filteredRecivedTodoList, todoList)

    setTodoList(updatedTodoList)
    setTodoListLoading(false)
    localStorageSave('todoAppData-TodoList', [...updatedTodoList])
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isTodoFormValid(text)) return
    await addTodo()
    clearInput()
    ReactTooltip.rebuild()
  }
  return (
    <Box
      as={'form'}
      onSubmit={handleSubmit}
      sx={{
        margin: '0 auto',
        position: 'relative',
        '@media screen and (max-width: 64em)': {
          width: '100%',
        },
      }}
      width="84%"
      mt={3}
    >
      <Flex>
        <Box
          textAlign="center"
          bg={text.length > 30 ? 'red' : 'primary'}
          sx={{
            position: 'absolute',
            lineHeight: '19px',
            color: 'white',
            fontSize: '13px',
            borderRadius: '100%',
            width: '20px',
            height: '20px',
            top: '-13px',
            left: '-13px',
          }}
        >
          <CharacterCount />
        </Box>
        <Input
          type="text"
          name="todo"
          id="todo"
          placeholder="New Task"
          value={text}
          onChange={onChange}
        />
        <Button ml={2} type="submit" sx={{ cursor: 'pointer' }}>
          Add
        </Button>
      </Flex>
      <Text fontSize={0} color="red">
        {formValidationErrors[0]}
      </Text>
    </Box>
  )
}

export default TodoItemCreator
