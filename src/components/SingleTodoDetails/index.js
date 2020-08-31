import { Box, Flex } from 'rebass'
import { timezoneFormatedDate } from '../../helperFunctions'

const SingleTodoDetails = ({ todo }) => {
  return (
    <Box mt={5} variant="card" p={[1, 4]} fontSize={[2, 4, 5]}>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontWeight="bold">
          ID:
        </Box>
        <Box width={1 / 2} as={'span'}>
          {todo.id}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontWeight="bold">
          Created Date:
        </Box>
        <Box width={1 / 2} as={'span'}>
          {timezoneFormatedDate(todo.created_at)}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontWeight="bold">
          Completed:
        </Box>
        <Box width={1 / 2} as={'span'}>
          {todo.completed ? 'Yes' : 'No'}
        </Box>
      </Flex>
      <Flex alignContent="space-between">
        <Box width={1 / 2} fontWeight="bold">
          Task:
        </Box>
        <Box width={1 / 2} as={'span'}>
          {todo.title}
        </Box>
      </Flex>
    </Box>
  )
}

export default SingleTodoDetails
