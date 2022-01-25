import * as React from 'react';
import { Button } from './components/button';
import { Modal } from './components/modal';
import { TodoForm, TodoFormFields } from './components/todo-form';
import { useCreateTodo } from './hooks';

export interface TodoAppProps {}

export const TodoApp: React.FC<TodoAppProps> = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const createTodo = useCreateTodo();

  const closeCreateModal = () => {
    setShowCreateModal(false)
  }

  const openCreateModel = () => {
    setShowCreateModal(true);
  }

  const handleAdd = async (fields: TodoFormFields) => {
    createTodo.execute(fields).then(() => {
      closeCreateModal();
    })
  }

  return (
    <div className="lg:py-32">
      <div className="shadow-md lg:max-w-lg lg:rounded-lg m-auto p-6 bg-white">
        <h1 className="text-xl font-medium mb-3">Todo App</h1>
        <div>
          <Button variant="primary" onClick={openCreateModel}>Add</Button>
        </div>

        <Modal 
          title="Add New Todo"
          open={showCreateModal} 
          onClose={closeCreateModal}
        >
          <TodoForm 
            onCancel={closeCreateModal} 
            onSubmit={handleAdd}
            disabled={createTodo.loading}
          />
        </Modal>
      </div>
    </div>
  )
};