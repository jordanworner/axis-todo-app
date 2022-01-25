import * as React from 'react';
import { Todo } from '../api';
import { Button } from './button';
import { CheckCircleIcon } from '@heroicons/react/outline';

export interface TodoItemProps {
  todo: Todo;
  onDelete?: () => void;
  onEdit?: () => void;
  onToggleComplete?: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const {todo, onDelete, onEdit, onToggleComplete} = props;
  return (
    <div className="flex py-3 group">
      <div>
        <button 
          type="button" 
          className="rounded p-2 -mt-1.5 text-gray-300 hover:text-gray-800"
          onClick={onToggleComplete}
        >
          <CheckCircleIcon className="w-5 h-5" />
          <span className="sr-only">Toggle complete</span>
        </button>
      </div>
      <div className="flex-1 px-2">
        <h3 className="font-medium">{todo.name}</h3>
        {todo.description !== '' && (
          <p className="text-sm text-gray-600">
            {todo.description}
          </p>
        )}
      </div>
      <div className="space-x-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100">
        {!todo.completed && (
          <Button size="xs" onClick={onEdit}>Edit</Button>
        )}
        <Button size="xs" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};