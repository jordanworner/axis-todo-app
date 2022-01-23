import type { Express, RequestHandler, ErrorRequestHandler } from 'express';
import { Todo } from './schema';

// Simple health check handler to test server
export const healthCheck: RequestHandler = (req, res) => {
  res.sendStatus(200);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  req.log.error(err);
  res.sendStatus(500);
};

export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.sendStatus(404);
};

// List Todos
export interface ListTodosRequest {}

export interface ListTodosResponse {
  success: boolean;
  todos: Todo[];
}

export const listTodosHandler: RequestHandler<
  {}, ListTodosResponse, ListTodosRequest
> = (req, res) => {
  res.status(200).json({
    success: true,
    todos: []
  });
};

// Create Todo
export interface CreateTodoRequest {
  id?: string;
  name: string;
  descriptions?: string;
  dueDate?: number;
}

export interface CreateTodoResponse {
  success: boolean;
  todo?: Todo;
}

export const createTodoHandler: RequestHandler<
  {}, CreateTodoResponse, CreateTodoRequest
> = (req, res) => {
  const data = req.body || {};

  const parsed = Todo.safeParse(data);

  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  res.status(201).json({
    success: true,
    todo: parsed.data
  });
};

// Update Todo
export interface UpdateTodoRequest {
  name: string;
  descriptions?: string;
  dueDate?: number;
}

export interface UpdateTodoResponse {
  success: boolean;
  todo?: Todo;
}

export const updateTodoHandler: RequestHandler<
  { todoId: string }, UpdateTodoResponse, UpdateTodoRequest
> = (req, res) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);
  const data = req.body || {};

  const parsed = Todo.safeParse({todoId, ...data});

  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  res.status(200).json({
    success: true,
    todo: parsed.data
  });
};

// Delete Todo
export interface DeleteTodoRequest {}

export interface DeleteTodoResponse {
  success: boolean;
}

export const deleteTodoHandler: RequestHandler<
  { todoId: string }, DeleteTodoResponse, DeleteTodoRequest
> = (req, res) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);

  res.status(204).json({
    success: true,
  });
}

// Set Completed
export interface SetTodoCompletedRequest {
  completed: boolean;
}

export interface SetTodoCompletedResponse {
  success: boolean;
}

export const setTodoCompletedHandler: RequestHandler<
  { todoId: string }, SetTodoCompletedResponse, SetTodoCompletedRequest
> = (req, res) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);
  // parse the completed body field, schema defaults to false if undefined
  const completed = Todo.shape.completed.parse(req.body.completed);

  res.status(200).json({
    success: true,
  });
}

export const setupRoutes = (app: Express): void => {
  app.get('/', healthCheck);

  // API Todo handlers
  app.get('/api/todos', listTodosHandler);
  app.post('/api/todos', createTodoHandler);
  app.put('/api/todos/:todoId', updateTodoHandler);
  app.delete('/api/todos/:todoId', deleteTodoHandler);
  app.post('/api/todos/:todoId/complete', setTodoCompletedHandler);

  /**
   * Error and 404 Handlers
   */

  app.use(errorHandler);
  app.use(notFoundHandler);
};
