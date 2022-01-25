import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from './components/button';
import { Modal } from './components/modal';
import { TodoForm, TodoFormFields } from './components/todo-form';
import { Todos } from './components/todos';
import { useCreateTodo, useUpdateTodo } from './hooks';
import { editTodoIdState, editTodoState } from './store';

export interface TodoAppProps {}

export const TodoApp: React.FC<TodoAppProps> = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const setEditTodoId = useSetRecoilState(editTodoIdState);
  const editTodo = useRecoilValue(editTodoState);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();

  const closeCreateModal = () => {
    setShowCreateModal(false)
  }

  const openCreateModel = () => {
    setShowCreateModal(true);
  }

  const closeEditModal = () => {
    setEditTodoId('');
  }

  const handleAdd = async (fields: TodoFormFields) => {
    createTodo.execute(fields).then(() => {
      closeCreateModal();
    })
  }

  const handleUpdate = async (todoId: string, fields: TodoFormFields) => {
    updateTodo.execute(todoId, fields).then(() => {
      closeEditModal();
    })
  }

  return (
    <div className="lg:py-32">
      <div className="shadow-md lg:max-w-lg lg:rounded-lg m-auto p-6 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">Todo App</h1>
          <div>
            <Button variant="primary" onClick={openCreateModel}>Add</Button>
          </div>
        </div>
        <React.Suspense fallback={
          <div>Loading...</div>
        }>
          <Todos />
        </React.Suspense>
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
        <Modal 
          title="Edit New Todo"
          open={editTodo !== null} 
          onClose={closeEditModal}
        >
          <TodoForm 
            onCancel={closeEditModal} 
            onSubmit={(fields) => handleUpdate(editTodo!.todoId, fields)}
            disabled={createTodo.loading}
            defaultFields={editTodo ?? {}}
          />
        </Modal>
      </div>
    </div>
  )
};