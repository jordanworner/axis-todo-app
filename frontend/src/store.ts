import { atom, selector } from "recoil";
import { listTodos, Todo } from "./api";

export const todosState = atom<Todo[]>({
  key: 'TodosState',
  default: selector<Todo[]>({
    key: 'TodosState/Default',
    get: async () => {
      const res =  await listTodos();
      return res.todos;
    }
  })
});