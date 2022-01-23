import anyTest, {TestFn} from 'ava';
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