import { atom, selector } from 'recoil'

export const recoilReadyState = atom({
  key: 'recoilReadyState',
  default: false,
})

export const todoListState = atom({
  key: 'todoListState',
  default: [],
})

export const todoListLoadingState = atom({
  key: 'todoListLoadingState',
  default: false,
})

export const searchInputState = atom({
  key: 'searchInputState',
  default: '',
})

export const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
})

export const listOfDeletedTodoIdsState = atom({
  key: 'listOfDeletedTodoIdsState',
  default: [],
})

export const textState = atom({
  key: 'textState',
  default: '',
})

export const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState)

    return text.length
  },
})

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const searchValue = get(searchInputState)
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch (filter) {
      case 'Search':
        return list.filter(item => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
      case 'Show Completed':
        return list.filter(item => item.completed)
      case 'Show Uncompleted':
        return list.filter(item => !item.completed)
      default:
        return list
    }
  },
})

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState)

    return {
      all: todoList.length,
      completed: todoList.filter(item => item.completed).length,
      uncompleted: todoList.filter(item => !item.completed).length,
    }
  },
})
