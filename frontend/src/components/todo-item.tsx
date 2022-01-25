import * as React from 'react';
import { Todo } from '../api';
import { Button } from './button';
import { CalendarIcon, CheckCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export interface TodoItemProps {
  todo: Todo;
  onDelete?: () => void;
  onEdit?: () => void;
  onToggleComplete?: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const {todo, onDelete, onEdit, onToggleComplete} = props;

  const date = React.useMemo(() => {
    if (!todo.dueDate) {
      return null;
    }

    return (new Date(todo.dueDate)).toISOString().split('T')[0];
  }, [todo.dueDate]);

  return (
    <div className="flex py-3 group">
      <div>
        <button 
          type="button" 
          className={clsx(
            'rounded p-2 -mt-1.5',
            todo.completed ? 'text-gray-800' : 'text-gray-300 hover:text-gray-800'
          )}
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

        {date && (
          <p className="text-sm text-gray-600 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" /> Due: {date}
          </p>
        )}
      </div>
      <div className="space-x-3 md:opacity-0 group-hover:opacity-100 focus-within:opacity-100">
        {!todo.completed && (
          <Button size="xs" onClick={onEdit}>Edit</Button>
        )}
        <Button size="xs" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};