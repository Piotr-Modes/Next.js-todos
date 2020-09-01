import ApiHelper from '../helperFunctions/ApiHelper'

const baseUrl = process.env.NEXT_PUBLIC_GOREST_API_URL

const getTodos = () => {
  return ApiHelper(baseUrl)
}

const createTodo = todoDetails => {
  return ApiHelper(baseUrl, 'POST', todoDetails)
}

export default {
  getTodos,
  createTodo,
}
