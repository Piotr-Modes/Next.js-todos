import axios from "axios";

const baseUrl = "https://gorest.co.in/public-api/users/128/todos";

const env = {
  API_TOKEN: "bf8bf0ff8025f3b1b57ee52dba22b17de0614cc30e2df70a36170f76e7e53b5a",
};

const config = {
  headers: { Authorization: `Bearer ${env.API_TOKEN}` },
};

const getTodos = () => {
  return axios.get(baseUrl);
};

const createTodo = (todoDetails) => {
  return axios.post(baseUrl, todoDetails, config);
};

export default {
  getTodos,
  createTodo,
};
