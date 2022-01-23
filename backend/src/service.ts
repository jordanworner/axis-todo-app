import { ReturnDocument } from "mongodb";
import { getTodoCollection } from "./collection";
import { Todo, UpdateTodo } from "./schema";

// list todos from db and order by created date (desc)
export const listTodos = async (): Promise<Todo[]> => {
  const collection = getTodoCollection();

  const docs = await collection.find({}).sort({createdAt: -1}).toArray();

  return docs.map(doc => Todo.parse(doc));
};

// create a new todo
export const createTodo = async (todo: Todo): Promise<void> => {
  const collection = getTodoCollection();
  const now = new Date();

  await collection.insertOne({
    ...todo,
    createdAt: now,
    updatedAt: now,
  });

  return;
};

// update todo
export const updateTodo = async (todoId: string, data: UpdateTodo): Promise<Todo | null> => {
  const collection = getTodoCollection();
  const now = new Date();

  const result = await collection.findOneAndUpdate(
    {
      todoId
    }, 
    {
      $set: {
        ...data,
        updatedAt: now
      }
    },
    {
      returnDocument: ReturnDocument.AFTER
    }
  );

  if (!result.value) {
    return null;
  }

  return Todo.parse(result.value);
};

// delete todo, returns true if a todo is delete, false if not found
export const deleteTodo = async (todoId: string): Promise<boolean> => {
  const collection = getTodoCollection();

  const result = await collection.deleteOne({todoId});

  return result.deletedCount ? true : false;
};

export const setTodoCompleted = async (todoId: string, completed: boolean): Promise<Todo | null> => {
  const collection = getTodoCollection();
  const now = new Date();

  const result = await collection.findOneAndUpdate(
    {
      todoId
    }, 
    {
      $set: {
        completed,
        updatedAt: now
      }
    },
    {
      returnDocument: ReturnDocument.AFTER
    }
  );

  if (!result.value) {
    return null;
  }

  return Todo.parse(result.value);
};
