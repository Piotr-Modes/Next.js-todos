export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export const getOneTodoListFromTwoCompetingOnes = (oldTodoList, newTodoList) => {
  return oldTodoList.map(oldTodo => {
    if (newTodoList.find(newTodo => newTodo.id === oldTodo.id))
      return newTodoList.find(newTodo => newTodo.id === oldTodo.id)
    return oldTodo
  })
}
