import { Collection } from "mongodb";
import { getDb } from "./database";

export interface TodoDocument {
  todoId: string;
  name: string;
  description: string;
  dueDate: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoCollection = Collection<TodoDocument>;

let todoCollection: TodoCollection;

export const getTodoCollection = (): TodoCollection => {
  if (todoCollection) {
    return todoCollection;
  }

  todoCollection = getDb().collection('todos');
  return todoCollection;
};

// async function to setup collections, indexes etc
export const setupCollections = async () => {
  const todos = getTodoCollection();
  await todos.createIndex({ todoId: 1 }, { unique: true })
}
