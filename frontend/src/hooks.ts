import * as React from "react";
import { useAsyncCallback } from "react-async-hook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createTodo, deleteTodo, setTodoCompleted, updateTodo } from "./api";
import { todosState } from "./store";

export const useListTodos = () => {
  const todos = useRecoilValue(todosState);

  const data = React.useMemo(() => {
    return {
      complete: todos.filter(todo => todo.completed),
      incomplete: todos.filter(todo => !todo.completed),
    }
  }, [todos]);

  return data;
}

export const useCreateTodo = () => {
  const createTodoCall = useAsyncCallback(createTodo);
  const setTodosState = useSetRecoilState(todosState);

  React.useEffect(() => {
    if (createTodoCall.result) {
      const {todo} = createTodoCall.result;
      if (todo) {
        setTodosState((todos) => [todo, ...todos]);
      }
    }
  }, [createTodoCall.result]);

  return createTodoCall;
}

export const useUpdateTodo = () => {
  const updateTodoCall = useAsyncCallback(updateTodo);
  const setTodosState = useSetRecoilState(todosState);

  React.useEffect(() => {
    if (updateTodoCall.result) {
      const {todo} = updateTodoCall.result;

      if (todo) {
        setTodosState((todos) => todos.map(el => {
          if (el.todoId === todo.todoId) {
            return todo;
          }

          return el;
        }));
      }
    }
  }, [updateTodoCall.result]);

  return updateTodoCall;
}

export const useDeleteTodo = () => {
  const deleteTodoCall = useAsyncCallback(deleteTodo);
  const setTodosState = useSetRecoilState(todosState);

  React.useEffect(() => {
    if (deleteTodoCall.result) {
      const todoId = deleteTodoCall.currentParams?.[0];

      if (todoId) {
        setTodosState((todos) => todos.filter(el => el.todoId !== todoId));
      }
    }
  }, [deleteTodoCall.result]);

  return deleteTodoCall
}

export const useSetTodoComplete = () => {
  const setTodoCompletedCall = useAsyncCallback(setTodoCompleted);
  const setTodosState = useSetRecoilState(todosState);

  React.useEffect(() => {
    if (setTodoCompletedCall.result) {
      const todoId = setTodoCompletedCall.currentParams?.[0];

      if (todoId) {
        setTodosState((todos) => todos.map(el => {
          if (el.todoId === todoId) {
            return {...el, completed: !el.completed};
          }

          return el;
        }));
      }
    }
  }, [setTodoCompletedCall.result]);

  return setTodoCompletedCall
}