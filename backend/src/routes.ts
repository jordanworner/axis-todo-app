import type { Express, RequestHandler, ErrorRequestHandler } from 'express';
import { Todo } from './schema';
import * as todoService from './service';

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
> = async (req, res, next) => {
  try {
    const todos = await todoService.listTodos();

    res.status(200).json({
      success: true,
      todos
    });
  } catch (err) {
    next(err);
  }
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
> = async (req, res, next) => {
  const data = req.body || {};

  // will use id if provided
  const parsed = Todo.safeParse(data);

  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  try {
    await todoService.createTodo(parsed.data);

    res.status(201).json({
      success: true,
      todo: parsed.data
    });
  } catch (err) {
    next(err);
  }
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
> = async (req, res, next) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);
  const data = req.body || {};

  const parsed = Todo.safeParse({todoId, ...data});

  if (!parsed.success) {
    res.json({ success: false });
    return;
  }

  try {
    const todo = await todoService.updateTodo(todoId, parsed.data);

    if (!todo) {
      res.status(200).json({
        success: false
      });
      return;
    }

    res.status(200).json({
      success: true,
      todo
    });
  } catch (err) {
    next(err);
  }
};

// Delete Todo
export interface DeleteTodoRequest {}

export interface DeleteTodoResponse {
  success: boolean;
}

export const deleteTodoHandler: RequestHandler<
  { todoId: string }, DeleteTodoResponse, DeleteTodoRequest
> = async (req, res, next) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);

  try {
    const success = await todoService.deleteTodo(todoId);

    res.status(204).json({
      success,
    });
  } catch (err) {
    next(err);
  }
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
> = async (req, res, next) => {
  const todoId = Todo.shape.todoId.parse(req.params.todoId);
  // parse the completed body field, schema defaults to false if undefined
  const completed = Todo.shape.completed.parse(req.body.completed);

  try {
    await todoService.setTodoCompleted(todoId, completed);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
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
