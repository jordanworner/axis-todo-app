import * as React from 'react';
import { Button } from './button';
import { Input } from './input';

export interface TodoFormFields {
  name: string;
  description: string;
  dueDate: number;
}

export interface TodoFormProps {
  onCancel?: () => void;
  onSubmit?: (fields: TodoFormFields) => void;
  disabled?: boolean;
  defaultFields?: Partial<TodoFormFields>
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {
  const {onCancel, onSubmit, disabled = false, defaultFields = {}} = props;
  const [name, setName] = React.useState(defaultFields.name ?? '');
  const [description, setDescription] = React.useState(defaultFields.description ?? '');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.({
      name,
      description,
      dueDate: 0
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 space-y-4">
          <Input 
            label="Name"
            name="name" 
            required 
            value={name} 
            onChange={e => setName(e.target.value)}
            disabled={disabled}
          />
          <Input 
            label="Description"
            name="description" 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            disabled={disabled}
          />
          {/* <Input 
            label="Due Date"
            name="dueDate" 
            type="date"
            value={dueDate} 
            onChange={e => setDueDate(e.target.value)}
          /> */}
        </div>

        <div className="mt-4 text-right space-x-4">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </div>
  );
};
