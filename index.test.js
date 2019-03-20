import { promise, callback, sync } from './index';
import test from 'ava';

function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Invalid input');
  }
  return a + b;
}
const async2 = (async () => 2)();

test('promise', async t => {
  const addPromise = promise(add);
  t.is(await addPromise(2, async2), 4);
});

test.cb('callback passes', t => {
  const addCallback = callback(add);
  addCallback(2, async2, t.end);
});

test.cb('callback fails', t => {
  const addCallback = callback(add);
  addCallback(2, 'string', error => {
    t.truthy(error);
    t.end();
  });
});

test('synchronous', t => {
  const addSync = sync(add);
  const result = addSync(2, async2);
  t.is(result, 4);
});
