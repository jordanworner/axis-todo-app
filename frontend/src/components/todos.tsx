import * as React from 'react';
import { useDeleteTodo, useListTodos, useSetTodoComplete } from '../hooks';
import { TodoList } from './todo-list';

export interface TodosProps {}

export const Todos: React.FC<TodosProps> = () => {
  const {complete, incomplete} = useListTodos();
  const deleteTodo = useDeleteTodo();
  const setTodoComplete = useSetTodoComplete();

  const handleDelete = (todoId: string) => {
    deleteTodo.execute(todoId);
  };

  const handleSetComplete = (todoId: string, complete: boolean) => {
    console.log(todoId)
    setTodoComplete.execute(todoId, {completed: complete});
  };
  
  return (
    <div>
      <TodoList 
        todos={incomplete} 
        onDelete={handleDelete}
      />
      {complete.length > 0 && (
        <div className="pt-6">
          <h3>Completed</h3>
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