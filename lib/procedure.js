const procedures = {};
const dependencies = {};

const inject = (key, value) => {
  dependencies[key] = value;
};

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
  const params = { dependencies };
  parameters.forEach((p, i) => {
    params[i] = p;
  });

  return await fn(...Object.values(params));
};

/**
 * Call a procedure
 * @param {string} hook - The hook name
 * @param {string} name - The name of the procedure
 * @param {object} parameters - The parameters for the procedure
*/
const callHook = async (hook, name, parameters) => {
  const fn = procedures[hook];
  await fn(name, parameters, dependencies);
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
  inject,
  def,
  call,
  callHook,
  beforeCall,
  exists,
}
