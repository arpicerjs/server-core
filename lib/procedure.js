const procedures = {};

/**
 * Define a procedure
 * @param {string} name - The name of the procedure
 * @param {function} handler - The procedure
*/
const def = (name, handler) => {
  procedures[name] = handler;
};

/**
 * Call a procedure
 * @param {string} name - The name of the procedure
 * @param {object} parameters - The parameters for the procedure
*/
const call = async (name, parameters) => {
  const fn = procedures[name];
  const params = {};
  parameters.forEach((p, i) => {
    params[i] = p;
  });

  if (fn.constructor.name === 'AsyncFunction') {
    return await fn(...Object.values(params));
  }

  return fn(...Object.values(params));
};

/**
 * Call a procedure
 * @param {string} hook - The hook name
 * @param {string} name - The name of the procedure
 * @param {object} parameters - The parameters for the procedure
*/
const callHook = (hook, name, parameters) => {
  const fn = procedures[hook];
  const params = {};
  parameters.forEach((p, i) => {
    params[i] = p;
  });

  fn(name, params);
};

/**
 * Register a procedure that called before all procedures called
 * @param {function} callback - Action
*/
const beforeCall = (callback) => {
  def('beforeCall', callback);
};

/**
 * Check the existence of a procedure
 * @param {string} name - The name of the procedure
 * @return {boolean} existence of a procedure
*/
const exists = (name) => {
  return !!procedures[name] && typeof procedures[name] === 'function';
};

module.exports = {
  def,
  call,
  callHook,
  beforeCall,
  exists,
}
