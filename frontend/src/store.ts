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

export const editTodoIdState = atom<string>({
  key: 'EditTodoIdState',
  default: '',
});

export const editTodoState = selector<Todo | null>({
  key: 'EditTodoState',
  get: ({get}) => {
    const todoId = get(editTodoIdState);

    if (!todoId) {
      return null;
    }

    const todos = get(todosState);

    return todos.find(el => el.todoId === todoId) ?? null;
  }
});
