import { atom, selector } from "recoil";

export const recoilReadyState = atom({
  key: "recoilReadyState",
  default: false,
});

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const searchInputState = atom({
  key: "searchInputState",
  default: "",
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const listOfDeletedTodoIdsState = atom({
  key: "listOfDeletedTodoIdsState",
  default: [],
});

export const textState = atom({
  key: "textState",
  default: "",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const searchValue = get(searchInputState);
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Search":
        return list.filter(
          (item) =>
            item.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
        );
      case "Show Completed":
        return list.filter((item) => item.completed);
      case "Show Uncompleted":
        return list.filter((item) => !item.completed);
      default:
        return list;
    }
  },
});
