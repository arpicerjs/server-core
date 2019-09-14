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
  return procedures[name](parameters);
};

module.exports = {
  def,
  call,
}
