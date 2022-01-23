import { getTodoCollection } from "./collection";
import { Todo } from "./schema";

// list todos from db and order by created date (desc)
export const listTodos = async (): Promise<Todo[]> => {
  const collection = getTodoCollection();

  const docs = await collection.find({}).sort({createdAt: -1}).toArray();

  return docs.map(doc => Todo.parse(doc));
};
