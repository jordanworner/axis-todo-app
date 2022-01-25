import * as React from 'react';
import { Todo } from '../api';
import { TodoItem } from './todo-item';

export interface TodoListProps {
  todos?: Todo[];
  onDelete?: (todoId: string) => void;
  onEdit?: (todoId: string) => void;
  onSetComplete?: (todoId: string, complete: boolean) => void;
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const {todos = [], onDelete, onEdit, onSetComplete} = props;
  return (
    <div className=" py-3 divide-y">
      {todos.map(todo => (
        <TodoItem 
          key={todo.todoId} 
          todo={todo} 
          onDelete={() => onDelete?.(todo.todoId)}
          onEdit={() => onEdit?.(todo.todoId)}
          onToggleComplete={() => onSetComplete?.(todo.todoId, !todo.completed)}
        />
      ))}
    </div>
  );
};