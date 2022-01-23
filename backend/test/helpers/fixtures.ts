import type { TodoDocument } from "../..//src/collection";

export const todoFixtures: TodoDocument[] = [
  {
    todoId: '56a1270f-41d6-4d4f-b51c-68bb494a07a7', 
    name: 'My Todo 1',
    description: 'My Todo 1 description',
    dueDate: 0,
    completed: false,
    createdAt: new Date('2022-01-23T12:00:00.000Z'),
    updatedAt: new Date('2022-01-23T12:00:00.000Z')
  },
  {
    todoId: 'eec1f695-1c94-470a-81af-0052dcffa8d8', 
    name: 'My Todo 2',
    description: 'My Todo 2 description',
    dueDate: 1645574400,
    completed: false,
    createdAt: new Date('2022-01-23T12:00:00.000Z'),
    updatedAt: new Date('2022-01-23T12:00:00.000Z')
  },
  {
    todoId: '9dc162e2-3a7f-420d-bdd0-d807fd985448', 
    name: 'My Todo 3',
    description: 'My Todo 3 description',
    dueDate: 0,
    completed: false,
    createdAt: new Date('2022-01-23T12:00:00.000Z'),
    updatedAt: new Date('2022-01-23T12:00:00.000Z')
  },
  {
    todoId: '607a3c1b-1dd2-4020-8728-14151cdaa387', 
    name: 'My Todo 4',
    description: 'My Todo 4 description',
    dueDate: 0,
    completed: true,
    createdAt: new Date('2022-01-23T12:00:00.000Z'),
    updatedAt: new Date('2022-01-23T12:00:00.000Z')
  },
  {
    todoId: 'ca83e6d2-6c38-4218-a9f3-a80d3cdb3c13', 
    name: 'My Todo 5',
    description: 'My Todo 5 description',
    dueDate: 0,
    completed: true,
    createdAt: new Date('2022-01-23T12:00:00.000Z'),
    updatedAt: new Date('2022-01-23T12:00:00.000Z')
  }
];
