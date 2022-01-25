import { config } from './config';

export type Todo = {
  todoId: string;
  name: string;
  description: string;
  dueDate: number;
  completed: boolean;
}

export interface ListTodosRequest {}

export interface ListTodosResponse {
  success: boolean;
  todos: Todo[];
}

export const listTodos = async (): Promise<ListTodosResponse> => {
  const res = await fetch(`${config.apiUrl}/api/todos`);
  return res.json();
};

export interface CreateTodoRequest {
  todoId?: string;
  name: string;
  descriptions?: string;
  dueDate?: number;
}

export interface CreateTodoResponse {
  success: boolean;
  todo?: Todo;
}

export const createTodo = async (
  req: CreateTodoRequest
): Promise<CreateTodoResponse> => {
  const res = await fetch(`${config.apiUrl}/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  });

  if (res.status !== 201) {
    throw new Error('Status: ' + res.status);
  }

  const data = await res.json() as CreateTodoResponse;

  if (!data.success) {
    throw new Error('Create failed');
  }

  return data;
};

export interface UpdateTodoRequest {
  name: string;
  descriptions?: string;
  dueDate?: number;
}

export interface UpdateTodoResponse {
  success: boolean;
  todo?: Todo;
}

export const updateTodo = async (
  todoId: string,
  req: UpdateTodoRequest
): Promise<UpdateTodoResponse> => {
  const res = await fetch(`${config.apiUrl}/api/todos/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  });
  return res.json();
};

export interface DeleteTodoRequest {}

export interface DeleteTodoResponse {
  success: boolean;
}

export const deleteTodo = async (todoId: string): Promise<DeleteTodoResponse> => {
  const res = await fetch(`${config.apiUrl}/api/todos/${todoId}`, {
    method: 'DELETE'
  });
  return res.json();
};

export interface SetTodoCompletedRequest {
  completed: boolean;
}

export interface SetTodoCompletedResponse {
  success: boolean;
}

export const setTodoCompleted = async (
  todoId: string,
  req: SetTodoCompletedRequest
): Promise<SetTodoCompletedResponse> => {
  const res = await fetch(`${config.apiUrl}/api/todos/${todoId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  });
  return res.json();
};