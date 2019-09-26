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
const call = (name, parameters) => {
  const fn = procedures[name];
  const params = {};
  parameters.forEach((p, i) => {
    params[i] = p;
  });

  return fn(...Object.values(params));
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
  exists,
}
