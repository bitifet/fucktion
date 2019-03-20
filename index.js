const deasync = require('deasync');
const fucktion = {};

/**
 * Creates an async function wrapper that awaits all arguments
 * @param {function} func
 */
fucktion.promise = func => {
  return async (...args) => {
    return func(...(await Promise.all(args)));
  };
};

/**
 * @callback fucktionCallback
 * @param {Error | null} error
 * @param {any} result
 */
/**
 * A wrapper for `fucktion.promise` that uses a callback you
 * provide as the last argument to your function. The signature
 * for the callback is `(error: Error | null, result: any) => void`
 *
 * @param {function} func
 */
fucktion.callback = func => {
  const promisifiedFunction = fucktion.promise(fn);
  return (...args) => {
    /** @type fucktionCallback */
    const callback = args.pop();
    promisifiedFunction(args)
      .then(result => callback(null, result))
      .catch(err => callback(err));
  };
};

/**
 * Wraps `fucktion.promise` with `deasync` allowing you to pass
 * promises to your function but still use it synchronously.
 * @param {function} func
 */
fucktion.sync = func => deasync(fucktion.promise(func));

module.exports = fucktion;
