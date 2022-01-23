import anyTest, {TestFn} from 'ava';
import { randomUUID } from 'crypto';
import express from 'express';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { setupServer } from '../src/server';
import { databaseConnect, getClient } from '../src/database';
import { getTodoCollection, setupCollections, TodoCollection } from '../src/collection';
import { todoFixtures } from './helpers/fixtures';

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
	collection.insertMany(todoFixtures)
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

test.serial('create todo', async t => {
	const {app, collection} = t.context;
	const res = await request(app)
		.post('/api/todos')
		.send({
			name: 'My new todo'
		});

	const doc = await collection.findOne({
		todoId: res.body.todo.todoId
	});

	t.is(res.status, 201);
	t.not(doc, null);
});

test.serial('update todos', async t => {
	const {app, collection} = t.context;
	const todo = todoFixtures[0];

	const res = await request(app)
		.put(`/api/todos/${todo.todoId}`)
		.send({name: 'New todo name'});

	const doc = await collection.findOne({
		todoId: todo.todoId
	});

	t.is(res.status, 200);
	t.is(doc?.name, 'New todo name');
});

test.serial('delete todos', async t => {
	const {app, collection} = t.context;
	const todo = todoFixtures[0];

	const res = await request(app)
		.delete(`/api/todos/${todo.todoId}`);

	const doc = await collection.findOne({
		todoId: todo.todoId
	});

	t.is(res.status, 204);
	t.is(doc, null);
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