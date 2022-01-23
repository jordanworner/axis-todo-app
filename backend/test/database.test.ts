import test from 'ava';
import { databaseConnect } from '../src/database';

test('databaseConnect with falsy URI', async t => {
  const error = await t.throwsAsync(databaseConnect('', ''));
	t.is(error?.message, 'A Valid Mongo URI is required');
});

test('databaseConnect with falsy database', async t => {
  const error = await t.throwsAsync(databaseConnect('mongodb://127.0.0.1:27017/', ''));
	t.is(error?.message, 'A Mongo database name is required');
});
