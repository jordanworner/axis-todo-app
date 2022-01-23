import anyTest, {TestFn} from 'ava';
import { randomUUID } from 'crypto';
import express from 'express';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { setupServer } from '../src/server';
import { databaseConnect, getClient } from '../src/database';
import { getTodoCollection, setupCollections, TodoCollection } from '../src/collection';

const test = anyTest as TestFn<{
  app: express.Express,
	mongod: MongoMemoryServer,
	collection: TodoCollection,
}>;

test.before(async t => {
	const mongod = await MongoMemoryServer.create();
	const mongoUri = mongod.getUri();

	const app = express();

	// setup db connection
	await databaseConnect(mongoUri, 'test');
	await setupCollections();

	setupServer(app);

	const collection = getTodoCollection();

	t.context = {
    app,
		mongod,
		collection,
  };
});

test.beforeEach(async t => {
	const {collection} = t.context;
	const now = new Date();

	collection.insertMany([
		{
			todoId: '56a1270f-41d6-4d4f-b51c-68bb494a07a7', 
			name: 'My Todo 1',
			description: 'My Todo 1 description',
			dueDate: 0,
			completed: false,
			createdAt: now,
			updateAt: now
		},
		{
			todoId: 'eec1f695-1c94-470a-81af-0052dcffa8d8', 
			name: 'My Todo 2',
			description: 'My Todo 2 description',
			dueDate: 1645574400,
			completed: false,
			createdAt: now,
			updateAt: now
		},
		{
			todoId: '9dc162e2-3a7f-420d-bdd0-d807fd985448', 
			name: 'My Todo 3',
			description: 'My Todo 3 description',
			dueDate: 0,
			completed: false,
			createdAt: now,
			updateAt: now
		},
		{
			todoId: '607a3c1b-1dd2-4020-8728-14151cdaa387', 
			name: 'My Todo 4',
			description: 'My Todo 4 description',
			dueDate: 0,
			completed: true,
			createdAt: now,
			updateAt: now
		},
		{
			todoId: 'ca83e6d2-6c38-4218-a9f3-a80d3cdb3c13', 
			name: 'My Todo 5',
			description: 'My Todo 5 description',
			dueDate: 0,
			completed: true,
			createdAt: now,
			updateAt: now
		}
	])
});

test.afterEach.always(async t => {
	const {collection} = t.context;
 	await collection.deleteMany({});
});

test.serial('healthcheck', async t => {
	const {app} = t.context;
	const res = await request(app).get('/');
	t.is(res.status, 200);
});

test.serial('list todos', async t => {
	const {app} = t.context;
	const res = await request(app).get('/api/todos');

	t.is(res.status, 200);
	t.is(res.body.todos?.length, 5);
});

test.serial('create todos', async t => {
	const {app} = t.context;
	const res = await request(app)
		.post('/api/todos')
		.send({name: 'My new todo'});

	t.is(res.status, 201);
});

test.serial('update todos', async t => {
	const {app} = t.context;
	const res = await request(app)
		.put(`/api/todos/${randomUUID()}`)
		.send({name: 'My new todo'});

	t.is(res.status, 200);
});

test.serial('delete todos', async t => {
	const {app} = t.context;
	const res = await request(app)
		.delete(`/api/todos/${randomUUID()}`);

	t.is(res.status, 204);
});

test.serial('set todo to complete', async t => {
	const {app} = t.context;
	const res = await request(app)
		.post(`/api/todos/${randomUUID()}/complete`)
		.send({ completed: true });

	t.is(res.status, 200);
});

test.serial('set todo to incomplete', async t => {
	const {app} = t.context;
	const res = await request(app)
		.post(`/api/todos/${randomUUID()}/complete`)
		.send({ completed: false });

	t.is(res.status, 200);
});

test.after.always(async t => {
	const client = getClient();
	await client.close();
	await t.context.mongod.stop();
});