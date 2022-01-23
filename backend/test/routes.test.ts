import anyTest, {TestFn} from 'ava';
import { randomUUID } from 'crypto';
import express from 'express';
import request from 'supertest';
import { setupServer } from '../src/server';

const test = anyTest as TestFn<{
  app: express.Express,
}>;

const app = express();
setupServer(app);

test.before(t => {
	t.context = {
    app
  };
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
