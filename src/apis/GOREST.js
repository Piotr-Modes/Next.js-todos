import { ApiHelper } from "../helperFunctions";

const baseUrl = "https://gorest.co.in/public-api/users/129/todos";

const getTodos = () => {
  return ApiHelper(baseUrl);
};

const createTodo = (todoDetails) => {
  return ApiHelper(baseUrl, "POST", todoDetails);
};

export default {
  getTodos,
  createTodo,
};
