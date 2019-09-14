const procedure = require('./lib/procedure')
const server = require('./lib/server')

module.exports = {
  def: procedure.def,
  listen: server.listen,
};
