import { Collection } from "mongodb";
import { getDb } from "./database";

export interface TodoDocument {
  id: string;
  name: string;
  description: string;
  dueDate: number;
  completed: boolean;
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
  await todos.createIndex({ id: 1 }, { unique: true })
}
