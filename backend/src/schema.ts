import { randomUUID } from 'crypto';
import { z } from 'zod';

export type Todo = z.infer<typeof Todo>;
export const Todo = z.object({
  todoId: z.string().uuid().default(() => randomUUID()),
  name: z.string().nonempty(),
  description: z.string().default(''),
  dueDate: z.number().default(0),
  completed: z.boolean().default(false),
});

export type UpdateTodo = z.infer<typeof UpdateTodo>;
export const UpdateTodo = Todo.pick({
  name: true,
  description: true,
  dueDate: true,
});
