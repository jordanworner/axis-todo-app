import test from 'ava';
import { foo } from '../src';

test('foo', t => {
  const result = foo();
  t.is(result, 'bar');
});
