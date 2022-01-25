import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { useDeleteTodo, useListTodos, useSetTodoComplete } from '../hooks';
import { editTodoIdState } from '../store';
import { TodoList } from './todo-list';

export interface TodosProps {}

export const Todos: React.FC<TodosProps> = () => {
  const {complete, incomplete} = useListTodos();
  const deleteTodo = useDeleteTodo();
  const setTodoComplete = useSetTodoComplete();
  const setEditTodo = useSetRecoilState(editTodoIdState);

  const handleDelete = (todoId: string) => {
    deleteTodo.execute(todoId);
  };

  const handleSetComplete = (todoId: string, complete: boolean) => {
    setTodoComplete.execute(todoId, {completed: complete});
  };
  
  return (
    <div>
      <TodoList 
        todos={incomplete} 
        onDelete={handleDelete}
        onSetComplete={handleSetComplete}
        onEdit={setEditTodo}
      />
      {complete.length > 0 && (
        <div className="pt-2">
          <h3 className="uppercase text-sm font-medium">Completed</h3>
          <TodoList 
            todos={complete}
            onDelete={handleDelete}
            onSetComplete={handleSetComplete}
          />
        </div>
      )}
    </div>
  )
};