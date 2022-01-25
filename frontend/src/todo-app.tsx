import * as React from 'react';
import { Button } from './components/button';
import { Modal } from './components/modal';

export interface TodoAppProps {}

export const TodoApp: React.FC<TodoAppProps> = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const closeCreateModal = () => {
    setShowCreateModal(false)
  }

  const openCreateModel = () => {
    setShowCreateModal(true);
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
    
        </Modal>
      </div>
    </div>
  )
};